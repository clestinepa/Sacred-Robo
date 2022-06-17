<script>
	export let type;
	import Fleche from './Fleche.svelte';

	function up() {
		type.value++;
	}

	function down() {
		type.value--;
	}

	$:	if (type.value == null) {
			console.log("WARNING : valeur nulle dans", type.id);
		} else if (type.value < 1) {
			type.value = 1 ;
		} else if (type.value > 99) {
			type.value = 99 ;
		}
	
	
	


</script>


<div class={type.enable === true ? "enable" : "disable"}>
	<p class=title>{type.title}</p>
	<div class=zone><div class=zone2>
		{#if type.enable}
			<input type=number bind:value={type.value}>
		{/if}
	</div></div>
	<div class=fleches>
		<div class="zone_clique" on:click={up}><Fleche direction=up/></div>
		<div class="zone_clique" on:click={down}><Fleche direction=down/></div>
	</div> 
</div>


<style>
	.title {
		width: 195px;
	}
	
	.zone2 {
		width: 50px;
	}

	.fleches {
		margin-left: 5px;
	}

	.enable .fleches {
		cursor: pointer;
	}

</style>