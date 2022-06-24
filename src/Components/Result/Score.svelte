<script>
	export let number_team;
    import { liveQuery } from "dexie";
    import { db } from "../db.js";

    let read_score_db = liveQuery(
       () => db.score_db.toArray()
    );

    let score_team;
    $: if ($read_score_db) {
        score_team = $read_score_db[number_team];
    }

    import {start_timer, set_has_been_won} from "../stores.js";
    import {afficheMsg, incrementScore} from '../Functions.svelte';
    
    

    function alertWin(a) {
        let confirmMsg = document.createElement('div');
        confirmMsg.className = 'confirmMsg';
        if (a==0) {
            confirmMsg.innerHTML = '<p class=textMsg>' + score_team.name + ' is the winner !</p>';
        } else if (a==1) {
            confirmMsg.innerHTML = '<p class=textMsg>' + score_team.name + ' won the set !</p>';

        }
        confirmMsg.innerHTML += '<button id=buttonClose>OK</button>';

        (a==0 ? afficheMsg(confirmMsg, "alert", "confetti") : afficheMsg(confirmMsg, "alert"));
    }

    $: if(score_team) {
        if (score_team.winner==1) {
            alertWin(0);
        } else if ($set_has_been_won) {
            alertWin(1);
            $set_has_been_won = false;
        }
    }

    let pointer = false;
    $: if ($read_score_db) {
        pointer = $start_timer || ($read_score_db[0].winner==0 ? false : true) || ($read_score_db[1].winner==0 ? false : true) ;
    }
</script>

{#if $read_score_db}
<div class=carre_{pointer} style="--color: {score_team.color[1]};" on:click={incrementScore(number_team)}>
    <div class=z1_score><div class=z2_score>
        {score_team.point}
    </div></div>
</div>
{/if}

<style>
.carre_false, .carre_true {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
}

.carre_false {
    cursor:pointer;
}

.z1_score {
    border-top: var(--border-witdh) solid ;
	border-bottom: var(--border-witdh) solid ;
    display: flex;
    width: 100%;

	border-color: rgb(var(--color), 1);
}

.z2_score {
	border-right: var(--border-witdh) solid ;
	border-left: var(--border-witdh) solid ;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: var(--font-family-title);
    color: rgb(var(--color), 1);

    border-color: rgb(var(--color), 0.5);

    position: relative;
}


</style>