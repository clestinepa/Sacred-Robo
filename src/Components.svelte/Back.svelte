<script>
        import {undoAction} from '../Functions.svelte';

</script>

<div class=container on:click={undoAction}>
    <div class=fleche></div>
    <div class=barre></div>
</div>

<style>
    .container {
        position: relative;
        height: 20px;
        width: 25px;
        cursor: pointer;
    }

    .fleche {
		width: 15px;
		height: 15px;
		border-left : 4px solid;
        border-top : 4px solid;
		border-radius: 3px 6px;
		transform: rotate(-45deg);

        position: absolute;
        top : 1px;
        left: 3px;
        border-color: var(--normal);
	}

    .barre {
        border: 5px solid var(--normal-transparent);
        border-left:none;
        border-bottom:none;
        border-radius: 0% 10px 10px 0%;

        width: 20px;
        height: 13.5px;

        position: absolute;
        top : 6.3px;
        left: 5px;
    }
</style>