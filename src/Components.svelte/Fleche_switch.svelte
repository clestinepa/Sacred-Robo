<script>
    import {settings, switchOn} from '../stores.js';
    import {switch_score} from '../Functions.svelte';

    let  color1,  color2;
    $:  if ($switchOn) {
            color1= $settings.team2_color.value[1];
            color2= $settings.team1_color.value[1];
        } else {
            color1= $settings.team1_color.value[1];
            color2= $settings.team2_color.value[1];
        }
</script>
<div class=global on:click={switch_score}>
    <div class=container style="--color: {color1};">
        <div class=barre></div>
        <div class=fleche></div>
    </div>
    
    <div class=container style="--color: {color2};">
        <div class=barre></div>
        <div class=fleche></div>
    </div>
</div>



<style>
    .global {
	    cursor: pointer;
    }
    .container {
        position: relative;
        width: 25px;
		height: 11.3px;
        border-radius: 3px;
        overflow: hidden;
    }

	.fleche {
		width: 15px;
		height: 15px;
		border-right : 5px solid;
		border-radius: 3px 6px;
		transform: rotate(-45deg);

        position: absolute;
        top : 1px;
        left: 8.2px;
        border-color: rgba(var(--color), 1);
	}

    .barre {
		width: 25px;
		height: 5px;
		border-radius: 3px;

        position: absolute;
        top : 6.3px;
        background: rgba(var(--color),0.5);

    }

    .container:nth-child(2) {
        margin-top: 3px;
        transform: rotate(180deg);
    }

</style>