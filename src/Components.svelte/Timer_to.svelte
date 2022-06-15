<script>
    import {settings, start_timer} from '../stores.js';
    let time = $settings.time_to_coach.value;
    let pause = false;
    let stop = false;

    let bgMsg = document.createElement('div');
    bgMsg.setAttribute('id', 'bgMsg');

    function countdown(){ 
        const x = setInterval(() => {   time--;
                                        if (pause) { 
                                            time++;
                                        }
                                        if (time == 0 | !$start_timer) {
                                            $start_timer = false;
                                            time = $settings.time_to_coach.value;
                                            if (document.getElementById('bgMsg')) {
                                                closeMsg();
                                            }
                                            pause=false;
                                            clearInterval(x);
                                        }
                                    }, 1000);
    }

    $: if ($start_timer) {
        time = $settings.time_to_coach.value; 
        countdown();
    } 

    function pauseTime() {
        pause=!pause;
    }
    
    function closeMsg() {
        while (bgMsg.hasChildNodes()) {
            bgMsg.removeChild(bgMsg.firstChild);
        }
        document.body.removeChild(bgMsg);
    }

    function stopTime() {
        // pause=true;

        let confirmMsg = document.createElement('div');
        confirmMsg.className = 'confirmMsg';
        confirmMsg.innerHTML = '<p class=textMsg>Do you really want to stop the timer ?</p>';
        confirmMsg.innerHTML += '<button id=buttonConfirm>Yes</button>';
        confirmMsg.innerHTML += '<button id=buttonClose>No</button>';

        bgMsg.appendChild(confirmMsg);
        document.body.appendChild(bgMsg);

        document.getElementById('buttonClose').addEventListener('click', function() {
            closeMsg()
        });

    
        document.getElementById('buttonConfirm').addEventListener('click', function () {
            $start_timer = !$start_timer;
            closeMsg()
        });        
    }


</script>

<div class={$start_timer}>
    <div class=pause_{pause} on:click={pauseTime}><div class=time_detail></div><div class=time_detail></div></div>
    <div class=time>{time}</div>
    <div class=stop_{stop} on:click={stopTime}><div class=time_detail></div></div>
</div>

<style>

.true {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
}
.false {
  display: none;
}
.time {
	font-family: var(--font-family-body);
    font-size: 40px;
}

.pause_false, .stop_false, .pause_true, .stop_true {
    width: 25px;
    height: 25px;
    display : flex;
    align-items: center;
    justify-content: center;
    gap: 3px;

    border: 1px solid var(--clair);
    border-radius: 50%;

    cursor : pointer;
}
.pause_false .time_detail, .pause_true .time_detail {
    width: 3px;
    height: 9px;
    border-radius: 20%;
}
.stop_false .time_detail, .stop_true .time_detail {
    width: 9px;
    height: 9px;
    border-radius: 20%;
}

.pause_true, .stop_true {
    border-color: var(--highlight);
	background: var(--highlight);
}
.pause_true .time_detail, .stop_true .time_detail {
	background: var(--bg);
}

.pause_false, .stop_false {
	background: var(--bg);
}
.pause_false .time_detail, .stop_false .time_detail{
	background: var(--clair);
}





</style>

