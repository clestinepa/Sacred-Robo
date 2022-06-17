<script>
	export let set;
    import {switchOn} from '../stores.js'
    import { liveQuery } from "dexie";
    import { db } from "../db.js";

    let winner, color1,  color2;
    $:  if ((set.team1 > set.team2 & !$switchOn) || (set.team1 < set.team2 & $switchOn)) {
            winner = "left";
        } else {
            winner = "right";
        }

    let read_score_db = liveQuery(
       () => db.score_db.toArray()
    );

    $:  if ($read_score_db) {
        if ($switchOn) {
            color1= $read_score_db[1].color[1];
            color2= $read_score_db[0].color[1];
        } else {
            color1= $read_score_db[0].color[1];
            color2= $read_score_db[1].color[1];
        }
    } 
    

</script>

<div class="container" style="--color1: {color1}; --color2: {color2};">
    <div class={winner == "left" ? "left" : "right"}>
        <div class=z11><div class=z21>
            <p>
                {($switchOn ? set.team2 : set.team1)}
            </p>
        </div></div>
        <div class=z12><div class=z22>
            <p>
                {($switchOn ? set.team1 : set.team2)}
            </p>
        </div></div>
    </div>
</div>

<style>
.container {
    --border-witdh : min(max(3px,0.6vw), 8px);
    --radius: min(max(7.5px,1.5vw), 22px);
	position: relative;
	width: 100%;
}

.container::after {
	content: '';
	display: block;
	padding-bottom: 50%;
}

.left, .right {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
}

.z11, .z12 {
	border-top: var(--border-witdh) solid ;
	border-bottom: var(--border-witdh) solid ;
    display: flex;
    width: 100%;
    border-color: var(--normal);
}

.z11 {
	border-radius: var(--radius) 0px 0px var(--radius);
}

.z12 {
	border-radius: 0px var(--radius) var(--radius) 0px;
}

.z21, .z22 {
    border-radius: min(max(4px,0.8vw),12px);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: var(--font-family-title);
    font-size: min(max(17.5px,3.5vw),51px);
    padding-bottom: min(max(0.3vw,1.5px), 4.5px);
}

.z21 {
	border-left: var(--border-witdh) solid ;
}

.z22 {
	border-right: var(--border-witdh) solid ;
}

.z21, .z22 {
	border-color: var(--normal-transparent);
    color: var(--normal);
}

.left .z11 {
    border-color: rgb(var(--color1), 1);
}

.left .z21 {
    border-color: rgb(var(--color1), 0.5);
    color: rgb(var(--color1), 1);
}

.right .z12 {
    border-color: rgb(var(--color2), 1);
}

.right .z22 {
    border-color: rgb(var(--color2), 0.5);
    color: rgb(var(--color2), 1);
}

p {
    width: 100%;
    margin:0;
    text-align: center;
}


</style>