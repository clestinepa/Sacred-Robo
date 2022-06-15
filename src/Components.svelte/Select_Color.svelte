<script>
	import { colors } from "../stores.js";
	export let type;

	function changeColor() {
		for (let i = 0; i < $colors.length; i++) {
			if ($colors[i].hexa == type.value[0]) {
				if (i==$colors.length-1) {
					i=0;	
				} else {
					i++;
				}
				type.value[0] = $colors[i].hexa;
				type.value[1] = $colors[i].rgb;
				break;
			}
		}
	}
	
</script>


<div class={type.enable === true ? "enable" : "disable"}>
	<p class=title>{type.title}</p>
	<div class=zone2 style:background-color={type.value[0]} on:click={changeColor}></div>
</div>


<style>
	.title {
		width: 230px;
	}

	.zone2 {
		border : 2px solid var(--bg);
		width: 30px;
		height: 30px ;
		cursor : pointer;
	}


</style>