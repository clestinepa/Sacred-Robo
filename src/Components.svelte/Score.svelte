<script>
	export let score_team;

    import {settings, score, sets, start_timer, switchOn} from "../stores.js";
    import {afficheMsg, addAction, switch_score} from '../Functions.svelte';
    let win_set = false;
    
    function incrementScore() {
        //Pas d'incrément quand timeout ou déjà 1 vainqueur
        if (!$start_timer & !$score[0].winner & !$score[1].winner) { 
            score_team.point++;

            //Tie Break ?
            let type_set = 'point';
            if ($score[0].set_win + $score[1].set_win == ($settings.set.value-1)*2 & $settings.check_tb.value ) {
                type_set = 'point_tb';
            } 

            //Set gagné ?
            if (score_team.point >= $settings[type_set].value & ($score[0].point + $score[1].point) < (score_team.point*2 - 1)) { 
                score_team.set_win++;

                //Vicroire ?
                if (score_team.set_win == $settings.set.value) {
                    score_team.winner = true;

                    //save action
                    addAction("incScoreGame", score_team.id, null);
                } else {
                    win_set = true;
                    //switch en fin de set ?
                    if ($settings.check_switch.value) {
                        switch_score();
                    }

                    //enregistrement score
                    let list = $sets;
                    if ($switchOn) {
                        list.push([$score[1].point, $score[0].point]);
                    } else {
                        list.push([$score[0].point, $score[1].point]);
                    }
                    sets.set(list);
                    
                    //remise à 0 des points
                    $score[0].point = $score[1].point = 0;

                    //save action
                    addAction("incScoreSet", score_team.id, null);
                }                    
            } else {
                //save action
                addAction("incScore", score_team.id, null);
            }
        }
    }

    function alertWin(a) {
        let confirmMsg = document.createElement('div');
        confirmMsg.className = 'confirmMsg';
        if (a==0) {
            confirmMsg.innerHTML = '<p class=textMsg>' + score_team.name + ' is the winner !</p>';
        } else if (a==1) {
            confirmMsg.innerHTML = '<p class=textMsg>' + score_team.name + ' won the set !</p>';

        }
        confirmMsg.innerHTML += '<button id=buttonClose>OK</button>';

        afficheMsg(confirmMsg, "confirm");
    }

    $:  if (score_team.winner) {
        alertWin(0);
    } else if (win_set) {
        alertWin(1);
        win_set = false;
    }
    
    $: pointer = $start_timer || $score[0].winner || $score[1].winner ;
</script>


<div class=carre_{pointer} style="--color: {score_team.color[1]};" on:click={incrementScore}>
    <div class=z1><div class=z2>
        {score_team.point}
    </div></div>
</div>

<style>

.carre_false, .carre_true {
    --border-witdh: min(max(9px,1.8vw),20px);
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
}

.carre_false {
    cursor:pointer;
}

.z1{
    border-top: var(--border-witdh) solid ;
	border-bottom: var(--border-witdh) solid ;
	border-radius:  min(max(15px,3vw), 44px);
    display: flex;
    width: 100%;

	border-color: rgb(var(--color), 1);
}

.z2 {
	border-right: var(--border-witdh) solid ;
	border-left: var(--border-witdh) solid ;
	border-radius:  min(max(7.5px,1.5vw), 22px);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: var(--font-family-title);
    font-size: min(max(125px,25vw),350px);
    color: rgb(var(--color), 1);
    padding-bottom: min(max(1.5vw,7.5px),22px);

    border-color: rgb(var(--color), 0.5);

    position: relative;
}


</style>