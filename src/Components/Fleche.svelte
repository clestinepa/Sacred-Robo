<script>
	export let direction ;
	export let color;
</script>
	
<div class={direction === "down" ? "down" : direction === "up" ? "up" : direction === "down2" ? "down2" : direction === "up2" ? "up2" : "unknown"}>
	<svg width="100%" height="81%" viewBox="0 0 164 133" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path fill-rule="evenodd" clip-rule="evenodd" d="M18.4264 132.492C6.71065 120.777 16.2081 92.2841 39.6396 68.8526L74.9949 33.4973C78.9002 29.592 85.2318 29.592 89.1371 33.4973L124.492 68.8526C147.924 92.2841 157.421 120.777 145.706 132.492C169.137 109.061 169.137 71.0709 145.706 47.6394L110.35 12.2841C94.7293 -3.33688 69.4027 -3.33688 53.7817 12.2841L18.4264 47.6394C-5.00508 71.0709 -5.00508 109.061 18.4264 132.492Z" fill={color}/>
	</svg>
</div>

<style>
	.down, .up {
        height: 10px;;
        width: 10px;
        display: flex;
        align-items: center;
	}

	.down2, .up2 {
        display: flex;
        align-items: center;
	}

	.down, .down2 {
		transform: rotate(180deg);
		margin-bottom: 2px;
	}

	/* .up {
		transform: rotate(-135deg);
		margin-top: 2px;
	} */

	.unknown {
		border-style: none;
		background-color: red;
	}


</style>