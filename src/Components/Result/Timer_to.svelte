<script>
    import {settings, start_timer} from '../../stores.js';
    import {stopTime} from '../../Functions.svelte';
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

</script>

<div class=timer_{$start_timer}>
    <div class=pause_{pause} on:click={pauseTime}><div class=time_detail></div><div class=time_detail></div></div>
    <div class=time>{time}</div>
    <div class=stop_{stop} on:click={stopTime}><div class=time_detail></div></div>
</div>

<style>

.timer_true {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.timer_false {
  display: none;
}
.time {
	font-family: var(--font-family-body);
}

.pause_false, .stop_false, .pause_true, .stop_true {
    display : flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    cursor : pointer;
}
.pause_false .time_detail, .pause_true .time_detail {
    border-radius: 20%;
}
.stop_false .time_detail, .stop_true .time_detail {
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

