<script>
    export let score_team;
    export let color;
    import Check_ON from './Check_ON.svelte';
    import {settings, start_timer, score} from '../stores.js';

    let states = [];
    for (let i = 0 ; i < $settings.nb_to_coach.value; i++) {
        states.push({name_class : "check_disable", check : "nocheck"});
    }

    $:{ if (score_team.nb_to == 0) {
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
        if (!$start_timer & !$score[0].winner & !$score[1].winner) {
            if (c == "nocheck") {
            score_team.nb_to++;
            $start_timer = true;
            } else {
                score_team.nb_to--;
                $start_timer = false;
            }
        }
    }

    $: pointer = $start_timer || $score[0].winner || $score[1].winner ;
</script>

<div class=checks  style="--color: {color};">
    {#each states as state}
    <div class={state.name_class}>
        <div class={pointer}>
            <div class={state.check}>
                <div class=zone1_to><div class=zone2_to on:click={state.name_class == "check_enable" ? clickHandler(state.check) : ""}>
                {#if state.check == "check"}
                    <Check_ON/>
                {/if}
                </div></div>
            </div>
        </div>
    </div>
    {/each}
</div>

<style>
.checks {
    display: flex;
    gap: 10px; 
}

.zone1_to {
    border-top: 5px solid ;
	border-bottom: 5px solid ;
	border-radius: 10px;

    width:40px;
    height:40px;
}
.zone2_to {
    border-right: 5px solid ;
	border-left: 5px solid ;
	border-radius: 5px;

    width:40px;
    height:30px;
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