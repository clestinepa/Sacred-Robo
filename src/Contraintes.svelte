<script>
    import { onMount } from 'svelte';
    import {settings, score, last_action} from './stores';
    import {switch_score, afficheMsg, patchAction} from './Functions.svelte';
    
    let boucle = true;
    $: {
        //Check bind
        $settings.point_tb.enable = $settings.check_tb.value;
        $settings.sum_regular.enable = $settings.check_sum_regular.value;
        $settings.score_tb.enable = $settings.check_score_tb.value;
        $settings.sum_tb.enable = $settings.check_sum_tb.value;
        $settings.time_to_tech.enable = $settings.nb_to_tech.enable = $settings.check_to_tech.value;
        $settings.time_to_coach.enable = $settings.nb_to_coach.enable = $settings.check_to_coach.value;

        //score tb switch disable si point tb = 1
        if ($settings.point_tb.value <= 1) {
            $settings.check_score_tb.enable = $settings.score_tb.enable = false;
        	console.log('You can\'t have a automatic side switch if the number of points is 1');
        } else {
            $settings.check_score_tb.enable = true;
        }

        //score tb switch toujours inférieur au nb point du tb
        if ($settings.point_tb.value <= $settings.score_tb.value) {
            $settings.score_tb.value = $settings.point_tb.value - 1;
        }

        //Tie Break ?
        if ($score[0].set_win + $score[1].set_win == ($settings.set.value-1)*2 & $settings.check_tb.value ) { 
            //switch automatique enable + reached by one of team
            if ($settings.check_score_tb.value & ($settings.score_tb.value == $score[0].point | $settings.score_tb.value == $score[1].point)) {
                if (boucle) {
                    switch_score();
                    alertSwitch();
                    patchAction();
                    boucle = false; //switch seulement 1 fois
                }   
            }
        }

        if ($last_action.type == "incScoreSwitch") {
            boucle = true; //réautorise le switch
        }
    }

    function alertSwitch() {
        let confirmMsg = document.createElement('div');
        confirmMsg.className = 'confirmMsg';
        confirmMsg.innerHTML = '<p class=textMsg>Automatic Switch Tie Break !</p>';
        confirmMsg.innerHTML += '<button id=buttonClose>OK</button>';

        afficheMsg(confirmMsg, "confirm");
    }


    let result, main, body;
    onMount( () => {
        main = document.querySelector('main');
        result = document.getElementById('result');
        body = document.querySelector('body');
    });

    setInterval( () => {
            if (main.offsetHeight <= result.offsetHeight) {
                console.log("trunk");
                body.style.overflow="scroll";
            } else {
                console.log("full");
            }
        


    },3000);

</script>
