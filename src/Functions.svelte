<script context="module">
    import {start_timer, settings, page, switchOn, last_actions, last_action, set_has_been_won} from './stores.js';
    import { get } from 'svelte/store';
    import { liveQuery } from "dexie";
    import { db } from "./db.js";

    let score_db = liveQuery(() => db.score_db.toArray());
    let read_score_db;
    score_db.subscribe(val => {read_score_db=val});

    let sets_score_db = liveQuery(() => db.sets_score_db.toArray());
    let read_sets_score_db;
    sets_score_db.subscribe(val => {read_sets_score_db=val});

    export function incrementScore(number_team) {
        let score_team =read_score_db[number_team];

        //Pas d'incrément quand timeout ou déjà 1 vainqueur
        if (!get(start_timer) && !(read_score_db[0].winner==0 ? false : true) & !(read_score_db[1].winner==0 ? false : true)) { 
            score_team.point++;
            db.score_db.update(((number_team==1) ? 1 : 0), {point: score_team.point});

            //Tie Break ?
            let type_set = 'point';
            if (read_score_db[0].set_win + read_score_db[1].set_win == (get(settings).set.value-1)*2 & get(settings).check_tb.value ) {
                type_set = 'point_tb';
            } 

            //Set gagné ?
            if (score_team.point >= get(settings)[type_set].value & (read_score_db[0].point + read_score_db[1].point) < (score_team.point*2 - 1)) { 
                score_team.set_win++;
                db.score_db.update(((number_team==1) ? 1 : 0), {set_win: score_team.set_win});

                //Vicroire ?
                if (score_team.set_win == get(settings).set.value) {
                    db.score_db.update(((number_team==1) ? 1 : 0), {winner: 1});

                    //save action
                    addAction("incScoreGame", score_team.id, null);
                } else {
                    set_has_been_won.set(true);
                    //switch en fin de set ?
                    if (get(settings).check_switch.value) {
                        switch_score();
                    }

                    //enregistrement score
                    db.sets_score_db.add({team0: read_score_db[0].point, team1: read_score_db[1].point });
                    
                    //remise à 0 des points
                    db.score_db.update(0, {point: 0});
                    db.score_db.update(1, {point: 0});

                    //save action
                    addAction("incScoreSet", score_team.id, null);
                }                    
            } else {
                //save action
                addAction("incScore", score_team.id, null);
            }
        }
    }

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

    let see, com, comments_scroll, comment_details, com_zone;
    let open = false;
    let target_action;
    export function dragstartComments(event) {
        target_action = "com";

        com = document.getElementById('comments');
        comment_details = document.getElementById('comment_details');
        see = event.currentTarget;

        event.dataTransfer.setDragImage(new Image(), 0, 0);

        see.style.opacity ='0.5';
        
        let x = event.clientX - 94;
        let y = event.clientY - 33.5;
        com.style.left = x + 'px';
        com.style.top = y + 'px';
        com.style.position = 'absolute';
        com.style.margin='0';
        com.style.maxWidth = '10000px';

        
        document.getElementById("com_zone1_gap").style.width = '0';
        document.getElementById("com_zone2_gap").style.width = '0';

        if (comment_details.offsetHeight > 0) {
            open = true;
            comment_details.style.display = 'none';
            com.style.minHeight = '0px';
        }
    }

    export function dragstartResize() {
        target_action = "resize";

        com = document.getElementById('comments');
        comments_scroll = document.getElementById('comments_scroll');
        console.log("resive");
    }


    export function dragoverComments(event) {
        event.preventDefault();
        if (target_action == "com") {
            let x = event.clientX - 94;
            let y = event.clientY - 33.5;
            com.style.left = x + 'px';
            com.style.top = y + 'px';
            console.log(event.clientY - com.offsetTop);
        } else if (target_action == "resize") {
            let height = Math.max(Math.min(((com.offsetTop - event.clientY) + com.offsetHeight), 1000), 200);
            if (comments_scroll.offsetHeight == comments_scroll.scrollHeight && height>com.offsetHeight) {}
            else {com.style.minHeight= height + 'px';}
        }

    }

    export function dropComments(event) {
        event.preventDefault();

        if (target_action == "com") {
            if (event.clientX < event.currentTarget.offsetWidth*0.07) {
                console.log("zone1");
                com_zone = document.getElementById("com_zone1");
                document.getElementById("com_zone1_gap").style.minWidth = 'max(7%, 20px)';
                document.getElementById("com_zone2_gap").style.minWidth = '0';
                com.style.maxWidth = '250px'; 
            } else if (event.clientX > event.currentTarget.offsetWidth*0.93) {
                console.log("zone2");
                com_zone = document.getElementById("com_zone2");
                document.getElementById("com_zone1_gap").style.minWidth = '0';
                document.getElementById("com_zone2_gap").style.minWidth = 'max(7%, 20px)';
                com.style.maxWidth = '250px'; 
            } else if (event.clientY > event.currentTarget.offsetHeight*0.93) {
                console.log("zone3");
                com_zone = document.getElementById("com_zone3");
                document.getElementById("com_zone1_gap").style.minWidth = '0';
                document.getElementById("com_zone2_gap").style.minWidth = '0';
                com.style.marginTop = 'min(max(25px,5vw),73px)';
            }
            
            if (com_zone) {
                com_zone.appendChild(com);
            }
            
            see.style.opacity ='1';
            com.style.position = 'relative';
            com.style.left = '0px';
            com.style.top = '0px';

            if (open) {
                comment_details.style.display = 'flex';
                com.style.minHeight = '200px';
            }
        } else if (target_action == "resize") {
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
            if (functionClose == "confetti") {
                document.getElementById('stopConfetti').style.display = 'block';
            }
            closeMsg();
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


    export function handleKeyboardUp(e) {
        if (e.code=='KeyW' && e.ctrlKey) {
            undoAction();
        } else if (e.code=='ArrowLeft') {
            if (get(switchOn)) {
                incrementScore(1);
            } else {
                incrementScore(0);
            }
        } else if (e.code=='ArrowRight') {
            if (get(switchOn)) {
                incrementScore(0);
            } else {
                incrementScore(1);
            }
        } else if (e.code=='Enter' && document.getElementById('buttonConfirm')) {
            document.getElementById('buttonConfirm').click();
        } else if (e.code=='Enter' && document.getElementById('buttonClose')) {
            document.getElementById('buttonClose').click();
        } else {
            console.log(e.code);
        }

    }

    export function handleKeyboardDown(e) {
        if (e.code=='Enter' && document.getElementById('buttonConfirm')) {
            document.getElementById('buttonConfirm').style.transform = 'translateY(-0.25em)';
            document.getElementById('buttonConfirm').style.borderColor = 'var(--highlight)';
            document.getElementById('buttonConfirm').style.backgroundColor = 'var(--highlight)';
        } else if (e.code=='Enter' && document.getElementById('buttonClose')) {
            document.getElementById('buttonClose').style.transform = 'translateY(-0.25em)';
            document.getElementById('buttonClose').style.borderColor = 'var(--highlight)';
            document.getElementById('buttonClose').style.color = 'var(--highlight)';
        }
    }


    export function dateToString(date) {
        let now = new Date();
        let date_string = monthString(date.getMonth()) + " " + date.getDate() + " " + date.getFullYear() + ", " + date.getHours() + ":" + minuteString(date.getMinutes());
        
        if ((now - date) < 604800000) {
            if (date.getDate() == now.getDate()) { //meme jour
                date_string = date.getHours() + ":" + minuteString(date.getMinutes());
            } else if (date.getDate() + 1 == now.getDate()) { //veille
                date_string = "Yesterday, " + date.getHours() + ":" + minuteString(date.getMinutes());
            } else { //meme semaine
                date_string = dayString(date.getDay()) + ", " + date.getHours() + ":" + minuteString(date.getMinutes());
            }
        }

        return date_string;
    }

    function minuteString(min) {
        switch (min) {
            case 0 : return "00";
            case 1 : return "01";
            case 2 : return "02";
            case 3 : return "03";
            case 4 : return "04";
            case 5 : return "05";
            case 6 : return "06";
            case 7 : return "07";
            case 8 : return "08";
            case 9 : return "09";
            default :  return min;
        }
    }

    function monthString(month) {
        switch (month) {
            case 0 : return "Jan";
            case 1 : return "Feb";
            case 2 : return "Mar";
            case 3 : return "Apr";
            case 4 : return "May";
            case 5 : return "Jun";
            case 6 : return "Jul";
            case 7 : return "Aug";
            case 8 : return "Sep";
            case 9 : return "Oct";
            case 10 : return "Nov";
            case 11 : return "Dec";
            default :  return "???";
        }
    }

    function dayString(day) {
        switch (day) {
            case 0 : return "Lun";
            case 1 : return "Tue";
            case 2 : return "Wed";
            case 3 : return "Thu";
            case 4 : return "Fri";
            case 5 : return "Sat";
            case 6 : return "Sun";
            default : return "???";
        }
    }

</script>

