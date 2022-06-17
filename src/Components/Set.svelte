<script>
	export let number_team;
    import { liveQuery } from "dexie";
    import { db } from "../db.js";

    let read_score_db = liveQuery(
       () => db.score_db.toArray()
    );
</script>

{#if $read_score_db}
<div class="carre" style="--color: {$read_score_db[number_team].color[1]};">
    <div class=z1><div class=z2>
    {$read_score_db[number_team].set_win}
    </div></div>
</div>
{/if}

<style>
.carre{
    --border-witdh : min(max(4px,0.8vw),10px);
    position: absolute;
    height: 100%;
    width: 100%;

    display: flex; /*Pour confiner les bordures à l'interieur du carré défini*/
}


.z1{
    border-top: var(--border-witdh) solid ;
	border-bottom: var(--border-witdh) solid ;
	border-radius:  min(max(7.5px,1.5vw), 22px);
    display: flex; /*Pour confiner les bordures à l'interieur du carré défini*/
    width: 100%; /*Pour confiner les bordures à l'interieur du carré défini*/

    border-color: rgb(var(--color), 1);
}

.z2 {
	border-right: var(--border-witdh) solid ;
	border-left: var(--border-witdh) solid ;
	border-radius: min(max(4px,0.8vw),12px);
    width: 100%; /*Pour confiner les bordures à l'interieur du carré défini*/
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: var(--font-family-title);
    font-size: min(max(30px,6vw), 90px);
    color: rgb(var(--color), 1);
    padding-bottom: min(max(0.5vw,2.5px),7px);

    border-color: rgb(var(--color), 0.5);
}


</style>