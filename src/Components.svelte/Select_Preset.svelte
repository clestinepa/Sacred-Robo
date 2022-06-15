<script>
	export let type ;
	import Fleche from './Fleche.svelte';

	function changePreset() {
		console.log('ChangePreset');
	}
</script>

<div class={type.enable === true ? "enable" : "disable"}>
	<p class=title>{type.title}</p>
	<div class=zone><div class=zone2>
		<p>{type.value}</p> 
		<div class="fleche" on:click={changePreset}><Fleche direction=down/></div> 
	</div></div>
</div>


<style>
	.title {
		width: 150px;
	}

	.zone2 {
		width: 110px;
	}

	.zone2 p {
		margin: 0px;
		margin-left: 8px;
		margin-right: 4px;
		width: 81px;
	}

	.fleche {
		height: 100%;
		cursor: pointer;
		display:flex;
		align-items: center;
	}

</style>