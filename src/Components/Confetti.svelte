<script>
	import { onMount } from 'svelte';

	let characters = ['🥳', '🎉', '✨', '🏆'];

	let confetti = new Array(70).fill() //70 confettis
		.map((_,i) => {
			return {
				id: i,
				character: characters[i % characters.length],
				x: Math.random() * 100, //position horizontale
				y: -20 - Math.random() * 100, //position verticale (commence hors zone)
				r: 0.1 + Math.random() * 1, //taille
				
				drag: false
			};
		})
		.sort((a, b) => a.r - b.r); //trie taille croissante
	
	for (let i = 0; i < confetti.length; i++) {confetti[i].id = i;} //id = index

	onMount(() => {
		let frame;

		function loop() {
			frame = requestAnimationFrame(loop);

			confetti = confetti.map(emoji => {
				if (!emoji.drag) {
					emoji.y += 0.3 * emoji.r; //descente 		
					if (emoji.y > 120) emoji.y = -20; //boucle la descente infinie
				} else {
			
				}
				return emoji;
			});
		}

		loop();

		return () => cancelAnimationFrame(frame);
	});

	let id;

	function dragstartHandler(event, c) {
		c.drag = true;
		id = c.id
		event.dataTransfer.setDragImage(new Image(), 0, 0);
	}

	function dropHandler(event) {
		event.preventDefault();
		confetti[id].drag=false;
	}

	function dragoverHandler(event) {
		event.preventDefault();
		confetti[id].x = ((event.clientX-30)*100)/event.currentTarget.offsetWidth;
		confetti[id].y = ((event.clientY-30)*100)/event.currentTarget.offsetHeight;
	}

	function closeConfetti() {
		confetti = [];
		document.getElementById('bg_confetti').style.display = 'none';
	}

</script>

<div id=bg_confetti on:drop={e => dropHandler(e)} on:dragover={e => dragoverHandler(e)}>
	{#each confetti as c}
		<span id={c.id} draggable=true style="left: {c.x}%; top: {c.y}%; transform: scale({c.r})" on:dragstart={e => dragstartHandler(e, c)} >{c.character}</span>
	{/each}
	<div id=stopConfetti on:click={closeConfetti}>
		Clear
	</div>
</div>


<style>
	:global(body) {
		overflow: hidden;
	}

	span {
		position: absolute;
		font-size: 5vh;
		cursor : pointer;
	}

	#bg_confetti {
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		width: 100%;
		height: 100%;
	}

	#stopConfetti {
		display: none;
		background : var(--bg);
		padding : min(max(7.5px,1.5vw), 15px);
		font-size: min(max(10px,2vw), 30px);
		color: var(--normal);
		border-radius: min(max(10px, 2vw), 25px);
		border-top: min(max(2.5px, 0.5vw), 5px) solid var(--normal);
   		border-bottom: min(max(2.5px, 0.5vw), 5px) solid var(--normal);
		margin: auto;
		margin-bottom: min(max(10px, 2vw), 25px);
	
		cursor: pointer;
	}


</style>