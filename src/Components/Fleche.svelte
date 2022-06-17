<script>
	export let direction ;
</script>
	
<div class={direction === "down" ? "down" : direction === "up" ? "up" : direction === "down2" ? "down2" : direction === "up2" ? "up2" : "unknown"}>
</div>

<style>
	.down, .up {
		width: 10px;
		height: 10px;
		border : 2px solid;
		border-radius: 2px 5px;
		border-top: none;
		border-left: none;
	}

	.down2, .up2 {
		width: 15px;
		height: 15px;
		border : 3px solid;
		border-radius: 4px 6px;
		border-top: none;
		border-left: none;
	}

	.down, .down2 {
		transform: rotate(45deg);
		margin-bottom: 2px;
	}

	.up, .up2 {
		transform: rotate(-135deg);
		margin-top: 2px;
	}

	.unknown {
		border-style: none;
		background-color: red;
	}


</style>