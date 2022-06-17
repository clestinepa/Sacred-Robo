<script>
    import {gotoSettings} from '../Functions.svelte';
</script>

<div class=container on:click={gotoSettings}>
    <div class=barre></div>
    <div class=barre></div>
    <div class=barre></div>
</div>


<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 2.5px;
    }

    .barre {
        height:5px;
        width: 25px;
        background: var(--normal);
        border-radius: 5px;
    }

</style>