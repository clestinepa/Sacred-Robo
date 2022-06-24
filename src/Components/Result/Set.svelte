<script>
	export let number_team;
    import { liveQuery } from "dexie";
    import { db } from "../db.js";

    let read_score_db = liveQuery(
       () => db.score_db.toArray()
    );
</script>

{#if $read_score_db}
<div class=carre style="--color: {$read_score_db[number_team].color[1]};">
    <div class=z1_set><div class=z2_set>
    {$read_score_db[number_team].set_win}
    </div></div>
</div>
{/if}

<style>
.carre{
    position: absolute;
    height: 100%;
    width: 100%;

    display: flex; /*Pour confiner les bordures à l'interieur du carré défini*/
}


.z1_set {
    border-top: var(--border-witdh) solid ;
	border-bottom: var(--border-witdh) solid ;
    display: flex; /*Pour confiner les bordures à l'interieur du carré défini*/
    width: 100%; /*Pour confiner les bordures à l'interieur du carré défini*/

    border-color: rgb(var(--color), 1);
}

.z2_set {
	border-right: var(--border-witdh) solid ;
	border-left: var(--border-witdh) solid ;
    width: 100%; /*Pour confiner les bordures à l'interieur du carré défini*/
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: var(--font-family-title);
    color: rgb(var(--color), 1);

    border-color: rgb(var(--color), 0.5);
}


</style>