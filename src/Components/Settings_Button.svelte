<script>
    import {gotoSettings} from '../Functions.svelte';
    export let type;

    function openSettingsGame() {
        gotoSettings();
    }
</script>

<div class=button_{type} on:click={(type=="settings" ? gotoSettings : openSettingsGame)}>
    <div class=barre></div>
    <div class=barre></div>
    <div class=barre></div>
</div>


<style>
    .button_settings, .button_game {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: min(max(15px,3vw), 26px);

    }
    
    .barre {
        width: var(--width);
        background: var(--normal);
        height: min(max(3px,0.7vw), 6px);

    }

    .button_settings .barre {
        border-radius: 5px;
        width: min(max(15px,3vw), 28px);
    }

    .button_game .barre {
        width: min(max(3px,0.7vw), 6px);
        border-radius: 100%;
    }

</style>