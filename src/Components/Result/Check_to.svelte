<script>
	export let number_team;
    import { liveQuery } from "dexie";
    import { db } from "../../../db.js";

    let read_score_db = liveQuery(
       () => db.score_db.toArray()
    );

    let score_team;
    $: if ($read_score_db) {
        score_team = $read_score_db[number_team];
    }

    import Check_ON from '.../Check_ON.svelte';
    import {settings, start_timer} from '../../../stores.js';

    let states = [];
    for (let i = 0 ; i < $settings.nb_to_coach.value; i++) {
        states.push({name_class : "check_disable", check : "nocheck"});
    }

    $:  if ($read_score_db) { 
        if (score_team.nb_to == 0) {
            for (let i = 0 ; i < $settings.nb_to_coach.value; i++) {
                states[i].name_class = "check_disable"
                states[i].check = "nocheck"
            }
            states[0].name_class = "check_enable"
        }
        
        if (score_team.nb_to > 0 & score_team.nb_to < $settings.nb_to_coach.value) {
            for (let i = 0 ; i < $settings.nb_to_coach.value; i++) {
                states[i].name_class = "check_disable"
                states[i].check = "nocheck"
            }
            for (let i = 0 ; i < score_team.nb_to; i++) {
                states[i].check = "check"
            }
            states[score_team.nb_to-1].name_class = states[score_team.nb_to].name_class = "check_enable"
        }
        
        if (score_team.nb_to == $settings.nb_to_coach.value) {
            for (let i = 0 ; i < $settings.nb_to_coach.value; i++) {
                states[i].name_class = "check_disable"
                states[i].check = "check"
            }
            states[$settings.nb_to_coach.value-1].name_class = "check_enable"
        }
    }

    function clickHandler(c) {
        if (!$start_timer && !($read_score_db[0].winner==0 ? false : true) & !($read_score_db[1].winner==0 ? false : true)) { 
            if (c == "nocheck") {
            score_team.nb_to++;
            $start_timer = true;
            } else {
                score_team.nb_to--;
                $start_timer = false;
            }
            db.score_db.update(((number_team==1) ? 1 : 0), {nb_to: score_team.nb_to});
        }
    }

    let pointer = false;
    $: if ($read_score_db) {
        pointer = $start_timer || ($read_score_db[0].winner==0 ? false : true) || ($read_score_db[1].winner==0 ? false : true) ;
    }
</script>

{#if $read_score_db}
<div class=checks_to  style="--color: {score_team.color[1]};">
    {#each states as state}
    <div class={state.name_class}>
        <div class={pointer}>
            <div class={state.check}>
                <div class=zone1_to><div class=zone2_to on:click={state.name_class == "check_enable" ? clickHandler(state.check) : ""}>
                {#if state.check == "check"}
                    <Check_ON color={score_team.color[0]}/>
                {/if}
                </div></div>
            </div>
        </div>
    </div>
    {/each}
</div>
{/if}

<style>
.checks_to {
    display: flex;
}

.zone1_to {
    border-top: var(--border-witdh) solid ;
	border-bottom: var(--border-witdh) solid ;
}
.zone2_to {
    border-right: var(--border-witdh) solid ;
	border-left: var(--border-witdh) solid ;
}

.nocheck .zone1_to {
	border-color: var(--normal);
}

.nocheck .zone2_to {
	border-color: var(--normal-transparent);
}

.check .zone1_to {
	border-color: rgba(var(--color),1);
}

.check .zone2_to {
	border-color: rgba(var(--color), 0.5);
}

.check_enable {
	cursor : pointer;
}

.true {
    cursor : default;
}

</style>