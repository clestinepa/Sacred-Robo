<script>
	import { onMount } from 'svelte';

	let characters = ['🥳', '🎉', '✨', '🏆'];

	let confetti = new Array(70).fill() //70 confettis
		.map((_,i) => {
			return {
				character: characters[i % characters.length],
				x: Math.random() * 100, //position horizontale
				y: -20 - Math.random() * 100, //position verticale (commence hors zone)
				r: 0.1 + Math.random() * 1, //taille
				
				jump: false,
				newY: 0, 
				newX: 0,
				jump_height:0,
				jump_width:0
			};
		})
		.sort((a, b) => a.r - b.r); //trie taille croissante



	onMount(() => {
		let frame;

		function loop() {
			frame = requestAnimationFrame(loop);

			confetti = confetti.map(emoji => {
				if (!emoji.jump) {
					emoji.y += 0.3 * emoji.r; //descente 		
					if (emoji.y > 120) emoji.y = -20; //boucle la descente infinie
				} else {

					let direction;
					if (emoji.jump_width < 0) { direction = -1; }
					else { direction = 1; }
					
					emoji.x += (0.2 * direction) * emoji.r; //saut horizontal
					emoji.y -= 0.2 * emoji.r; //saut vertical

					if (emoji.y < emoji.newY) {
						emoji.jump = false; //arret du saut quand 1 emoji a atteint la hauteur
					}
				

				}
				return emoji;
			});
		}

		loop();

		return () => cancelAnimationFrame(frame);
	});


	//A(xA; yA); B(xB; yB) et C(xC; yC).
	//A(x; y); B(newX*0.6; newY) et C(newX; newY*0.7).
	// a = (yC − yA) / [(xC − xA)(xC − xB)] − (yB − yA) / [(xB − xA)(xC − xB)]
	//c = yA − ax2A − bxA
	//b = b = (yB − yA)/(xB − xA) − a(xB + xA) 

	function click(c) {
		c.jump_height = Math.random() * 30 * c.r;
		c.newY = c.y - c.jump_height;
		c.jump_width = (Math.random()-0.5) * 60 * c.r;
		c.newX = c.x - c.jump_width;
		c.jump = true;
	}

</script>

{#each confetti as c}
	<span style="left: {c.x}%; top: {c.y}%; transform: scale({c.r})" on:click={click(c)} >{c.character}</span>
{/each} 

<style>
	:global(body) {
		overflow: hidden;
	}

	span {
		position: absolute;
		font-size: 5vh;
		cursor : pointer;
	}


</style>