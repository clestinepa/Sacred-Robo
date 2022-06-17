<script>
	export let type ;

	$:	if (type.value == null | type.value == "" ) {
			console.log("WARNING : valeur nulle dans", type.id);
		} else if ((type.value).length > 20) {
			type.value = type.value.slice(0, 20);;			
		}
	
</script>

<div class={type.enable === true ? "enable" : "disable"}>
	<p class=title>{type.title}</p>
	<div class=zone><div class=zone2>
		<input bind:value={type.value}>
	</div></div>
</div>

<style>
	.title {
		width: 150px;
	}

	.zone2 {
		width: 110px;
	}

	input {
		margin-left: 8px;
		margin-right: 8px;
		text-align: left;
	}
</style>