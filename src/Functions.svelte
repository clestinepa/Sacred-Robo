<script context="module">
    import {start_timer, settings, page, switchOn, last_actions, last_action} from './stores.js';
    import { get } from 'svelte/store';
    import { liveQuery } from "dexie";
    import { db } from "./db.js";

    let score_db = liveQuery(
        () => db.score_db.toArray()
    );
    let read_score_db;
    score_db.subscribe(val => {read_score_db=val});

    let sets_score_db = liveQuery(
        () => db.sets_score_db.toArray()
    );
    let read_sets_score_db;
    sets_score_db.subscribe(val => {read_sets_score_db=val});

    export function animScoreIncrement(event, i) {
        if (!get(start_timer) & !read_score_db[0].winner & !read_score_db[1].winner) { 
            let x = event.clientX - event.currentTarget.offsetLeft;
            let y = event.clientY - event.currentTarget.offsetTop;

            let ripples = document.createElement('span');
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            let team;
            if (i==0) {
                team="team0_color";
            } else if (i==1) {
                team="team1_color";
            }
            ripples.style.background = get(settings)[team].value[0];
            event.currentTarget.appendChild(ripples);

            setTimeout(() => {ripples.remove();},1000);
        }
    }
    

    export function startGame() {
        page.set("game");
        //Clear db
        //Intialize db
    }
    export function gotoSettings() {
        page.set("settings");
    }

    export function switch_score() {
        if (!read_score_db[0].winner & !read_score_db[1].winner) {
            let value = get(switchOn);
            switchOn.set(!value);
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
        list.push({
            type : type,
            target : target,
            value : value
        });
        last_actions.set(list);
    }

    export function undoAction() {

        if (!get(start_timer)) {
            let list = get(last_actions);
            let s;
            let id = list[list.length - 1].target;
            switch (list[list.length - 1].type) {
                case "incScore":
                    s = read_score_db;
                    s[id].point--;
                    db.score_db.update(id, {point: s[id].point});
                    break;
                case "incScoreSwitch":
                    s = read_score_db;
                    s[id].point--;
                    db.score_db.update(id, {point: s[id].point});
                    switch_score();
                    break;
                case "incScoreSet":                    
                    let not_id = 1 - id;  //0 donne 1 et 1 donne 0
                    let new_points_id, new_points_not_id;
                    if (id == 0) {
                        new_points_id = read_sets_score_db[read_sets_score_db.length-1].team0;
                        new_points_not_id = read_sets_score_db[read_sets_score_db.length-1].team1;
                    } else {
                        new_points_id = read_sets_score_db[read_sets_score_db.length-1].team1;
                        new_points_not_id = read_sets_score_db[read_sets_score_db.length-1].team0;
                    }

                    s = read_score_db;
                    s[id].point = new_points_id - 1;
                    s[not_id].point = new_points_not_id;
                    s[id].set_win--;
                    db.score_db.update(id, {point: s[id].point, set_win: s[id].set_win});
                    db.score_db.update(not_id, {point: s[not_id].point});
                   
                    db.sets_score_db.delete(read_sets_score_db[read_sets_score_db.length-1].id);
                    if (get(settings).check_switch.value) {
                        switch_score();
                    }
                    break;
                case "incScoreGame":
                    s = read_score_db;
                    s[id].point--;
                    s[id].set_win--;
                    db.score_db.update(id, {point: s[id].point, set_win: s[id].set_win, winner: 0});
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

    export function patchAction() {
        let list = get(last_actions);
        list[list.length - 1].type = "incScoreSwitch";
        last_actions.set(list); 
    }

</script>

