<script>
    import {settings, last_action} from './stores';
    import {switch_score, afficheMsg, patchAction} from './Functions.svelte';
    import { db } from "./db.js";
    import { liveQuery } from "dexie";
    import {onMount} from "svelte";

    let read_score_db = liveQuery(
       () => db.score_db.toArray()
    );

    let boucle = true;
    $: if ($read_score_db) {
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
        if ($read_score_db[0].set_win + $read_score_db[1].set_win == ($settings.set.value-1)*2 & $settings.check_tb.value ) { 
            //switch automatique enable + reached by one of team
            if ($settings.check_score_tb.value & ($settings.score_tb.value == $read_score_db[0].point | $settings.score_tb.value == $read_score_db[1].point)) {
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

        afficheMsg(confirmMsg, "alert");
    }


    let body;
    let result, com_zone1, com_zone2, com_zone3, padding_body, com_zone1_gap, com_zone2_gap;
    let main, info_comments, comments;

    onMount(() => {
        body = document.querySelector('body');
        setTimeout( () => {
            main = document.getElementById('game');
            result = document.getElementById('result');
            com_zone1 = document.getElementById('com_zone1'); 
            com_zone2 = document.getElementById('com_zone2');
            com_zone3 = document.getElementById('com_zone3');
            com_zone1_gap = document.getElementById('com_zone1_gap');
            com_zone2_gap = document.getElementById('com_zone2_gap');
            info_comments = document.getElementById('info_comments');
            comments = document.getElementById('comments');

            // setInterval( () => {
            //     padding_body = body.offsetWidth - com_zone1.offsetWidth - com_zone1_gap.offsetWidth - com_zone2.offsetWidth - com_zone2_gap.offsetWidth - com_zone3.offsetWidth;
            //     let val_result = (padding_body + result.offsetWidth) * 0.01;
            //     document.documentElement.style.setProperty('--vw-result', val_result + 'px');
            //     let val_comments = val_result;
            //     document.documentElement.style.setProperty('--vw-comments', val_comments + 'px');
            // }, 0);

            setInterval( () => {
                if (main.offsetHeight < main.scrollHeight) {
                    if ((main.scrollHeight-main.offsetHeight) < (comments.offsetHeight/2)) {
                        console.log("moitié visible");
                        info_comments.style.color="transparent";
                    } else {
                        if (main.scrollTop >= (comments.offsetHeight/4)) {
                            console.log("visible au scroll");
                            info_comments.style.color="transparent";
                        } else {
                            console.log("pas visible");
                            info_comments.style.color="var(--font-clair)";
                        }
                    }
                } else {
                    console.log("visible");
                    info_comments.style.color="transparent";

                }

            }, 1000);
        }, 1000);
    });

</script>
