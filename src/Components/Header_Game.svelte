<script>
    import Fleche from './Fleche.svelte';
	import Back from './Back.svelte';
	import Sync from './Sync.svelte';
	import Settings_Button from './Settings_Button.svelte';
    let visible = true;

    function visibleHeader() {
        visible = !visible;
    }

</script>

<header class={visible}>
    <div class=details_header>
        <h1 id=bigTitle_game>Sacred Robo</h1>
        <div id=pos_settings_game>
            <Back/>
            <Sync/>
            <Settings_Button type="game"/>
        </div>
    </div>

    <div class=pos_fleche on:click={visibleHeader}>
        <!-- <Fleche direction={visible ? "up2" : "down2"} color="var(--normal)"/> -->
    </div>
</header>

<style>
header {
	border-bottom: 4px solid var(--details);
	border-radius: 30px;
	padding: min(max(10px,2%),20px) min(max(22.5px,4.5%),50px);
	background: var(--bg);
    position: relative;
}

.details_header {
    display: flex;
	justify-content: space-between;
	align-items: center;
}

#bigTitle_game {
	font-family: var(--font-family-title);
	font-size: min(max(20px,4vw),35px);
	color: var(--normal);
}

#pos_settings_game {
	display: flex;
	align-items: center;
	gap: min(max(7.5px,1.5vw), 22px);
}

.pos_fleche{
    width: calc(100% - min(max(22.5px, 4.5%),50px) - min(max(22.5px, 4.5%),50px));
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: min(max(2px,0.4vw),5px);
    cursor: pointer;
    color: var(--clair);
}

.false .pos_fleche{
    bottom: min(max(4px,0.8vw),10px);
}

.false {
    padding: min(max(10px,2%), 30px) min(max(22.5px,4.5%),50px);
}
.false .details_header {
    display: none;
}
</style>