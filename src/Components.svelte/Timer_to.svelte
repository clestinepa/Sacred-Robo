<script>
    import {settings, start_timer} from '../stores.js';
    import {stopTime} from '../Functions.svelte';
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
  height: min(max(20px,4vw),50px);
}
.false {
  display: none;
}
.time {
	font-family: var(--font-family-body);
    font-size: min(max(20px,4vw),50px);
}

.pause_false, .stop_false, .pause_true, .stop_true {
    width: min(max(15px,3vw),44px);
    height: min(max(15px,3vw),44px);
    display : flex;
    align-items: center;
    justify-content: center;
    gap: min(max(1.5px,0.3vw),4.5px);

    border: min(max(0.5px,0.1vw),1.5px) solid var(--clair);
    border-radius: 50%;

    cursor : pointer;
}
.pause_false .time_detail, .pause_true .time_detail {
    width: min(max(2px,0.4vw),6px);
    height: min(max(5.5px,1.1vw), 16px);
    border-radius: 20%;
}
.stop_false .time_detail, .stop_true .time_detail {
    width: min(max(5.5px,1.1vw), 16px);
    height: min(max(5.5px,1.1vw), 16px);
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

