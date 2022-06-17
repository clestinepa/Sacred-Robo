<script>
	export let type ;
	import Check_ON from './Check_ON.svelte';
	import Check_OFF from './Check_OFF.svelte';

	let name_class;
	$: 	if (type.value) {
			name_class = "check"
		} else {
			name_class = "nocheck"
		}

	function clickHandler() {
		type.value = !type.value;
	}
</script>

<div class={type.enable === true ? "enable" : "disable"}>
	<p class=title>{type.title}</p>
	<div class={name_class}>
		<div class=zone><div class=zone2 on:click={clickHandler}>
			{#if type.value}
				<Check_ON color="var(--highlight)"/>
			{:else}
				<Check_OFF/>
			{/if}
			
		</div></div>
	</div>
</div>


<style>
	.title {
		width: 230px;
	}

	.enable .nocheck .zone {
		border-color: var(--clair);
		color : var(--clair);
	}
	.enable .nocheck .zone2 {
		border-color: var(--clair-transparent);
	}

	.zone {
		border-radius: 5px;
	}
	.zone2 {
		border-radius: 3px;
		width: 30px;

		display: flex;
		justify-content: center;
	}

	.enable .zone2 {
		cursor: pointer;
	}		


</style>