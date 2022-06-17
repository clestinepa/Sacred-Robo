<script context="module">
    import {score, start_timer, settings, page, switchOn, sets, last_actions, last_action} from './stores.js';
    import { get } from 'svelte/store';
    import { db } from "./db.js";

    export function animScoreIncrement(event, i) {
        if (!get(start_timer) & !get(score)[0].winner & !get(score)[1].winner) { 
            let x = event.clientX - event.currentTarget.offsetLeft;
            let y = event.clientY - event.currentTarget.offsetTop;

            let ripples = document.createElement('span');
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            let team;
            if (i==0) {
                team="team1_color";
            } else if (i==1) {
                team="team2_color";
            }
            ripples.style.background = get(settings)[team].value[0];
            event.currentTarget.appendChild(ripples);

            setTimeout(() => {ripples.remove();},1000);
        }
    }
    

    export function startGame() {
        page.set("game");

        db.score_db.update(1, {name: get(settings).team1_name.value, color: get(settings).team1_color.value}).then(function (updated) {
        if (updated)
            console.log ("Team1 updated");
        else
            console.log ("Nothing was updated");
        });
        db.score_db.update(2, {name: get(settings).team2_name.value, color: get(settings).team2_color.value}).then(function (updated) {
        if (updated)
            console.log ("Team1 updated");
        else
            console.log ("Nothing was updated");
        });

    }

    export function gotoSettings() {
        page.set("settings");
    }

    export function switch_score() {
        if (!get(score)[0].winner & !get(score)[1].winner) {
            let value = get(switchOn);
            switchOn.set(!value);

            let list = get(sets);
            for (let i = 0; i<list.length; i++) {
                list[i] = list[i].reverse();
            }
            sets.set(list);
        }
    }

    let bgMsg = document.createElement('div');
    bgMsg.setAttribute('id', 'bgMsg');

    function closeMsg() {
        while (bgMsg.hasChildNodes()) {
            bgMsg.removeChild(bgMsg.firstChild);
        }
        document.body.removeChild(bgMsg);
    }

    export function afficheMsg(element, type, functionClose) {
        bgMsg.appendChild(element);
        document.body.appendChild(bgMsg);

        document.getElementById('buttonClose').addEventListener('click', function() {
            closeMsg()
        });

        if (type == "confirm") {
            document.getElementById('buttonConfirm').addEventListener('click', function() {
                functionClose();
                closeMsg();
             });  
        } 
    }

    export function stopTime() {
        let confirmMsg = document.createElement('div');
        confirmMsg.className = 'confirmMsg';
        confirmMsg.innerHTML = '<p class=textMsg>Do you really want to stop the timer ?</p>';
        confirmMsg.innerHTML += '<button id=buttonConfirm>Yes</button>';
        confirmMsg.innerHTML += '<button id=buttonClose>No</button>';

        afficheMsg(confirmMsg, "confirm", closeTimer);
    }

    function closeTimer() {
        let value = get(start_timer);
        start_timer.set(!value);
    }

    export function addAction(type, target, value) {
        let list = get(last_actions);
        list = list.slice(1);
        // switch (type) {
        //     case "incScore":
                list.push({
                    type : type,
                    target : target,
                    value : value
                });
        //         break;
        //     default:
        // }
        last_actions.set(list);
    }

    export function undoAction() {

        if (!get(start_timer)) {
            let list = get(last_actions);
            let s, value;
            switch (list[list.length - 1].type) {
                case "incScore":
                    s = get(score);
                    s[list[list.length - 1].target].point--;
                    score.set(s);
                    break;
                case "incScoreSwitch":
                    s = get(score);
                    s[list[list.length - 1].target].point--;
                    score.set(s);
                    switch_score();
                    break;
                case "incScoreSet":
                    value = get(sets);
                    let id = list[list.length - 1].target;
                    let pas_id = 1 - id;  //0 donne 1 et 1 donne 0
                    let index_sets_id,index_sets_pas_id;
                    if (get(switchOn)) {
                        index_sets_id = pas_id;
                        index_sets_pas_id = id;
                    } else {
                        index_sets_id = id;
                        index_sets_pas_id = pas_id;
                    }
                    s = get(score);
                    s[id].point = --value[value.length - 1][index_sets_id];
                    s[pas_id].point = value[value.length - 1][index_sets_pas_id];
                    s[id].set_win--;
                    score.set(s);
                    
                    value.pop();
                    sets.set(value);
                    if (get(settings).check_switch.value) {
                        switch_score();
                    }
                    break;
                case "incScoreGame":
                    s = get(score);
                    s[list[list.length - 1].target].point--;
                    s[list[list.length - 1].target].set_win--;
                    s[list[list.length - 1].target].winner = false;
                    score.set(s);

                    break;
                default:
            }

            last_action.set(list.pop());
            list.unshift({type : "none", target : null, value : null});
            last_actions.set(list);
        } else {
            stopTime();
        }
                
    }

    
/**
 * ACTION A UNDO
 *
 * temps mort
 * switch
 */

    export function patchAction() {
        let list = get(last_actions);
        list[list.length - 1].type = "incScoreSwitch";
        last_actions.set(list); 
    }




</script>

