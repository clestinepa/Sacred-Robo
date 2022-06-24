<script>
	export let set;
    import {switchOn} from '../stores.js'
    import { liveQuery } from "dexie";
    import { db } from "../db.js";

    let winner, color1,  color2;
    $:  if ((set.team0 > set.team1 & !$switchOn) || (set.team0 < set.team1 & $switchOn)) {
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

<div class=Set_container style="--color1: {color1}; --color2: {color2};">
    <div class={winner == "left" ? "left" : "right"}>
        <div class=z11><div class=z21>
            <p>
                {($switchOn ? set.team1 : set.team0)}
            </p>
        </div></div>
        <div class=z12><div class=z22>
            <p>
                {($switchOn ? set.team0 : set.team1)}
            </p>
        </div></div>
    </div>
</div>

<style>
.Set_container {
	position: relative;
	width: 100%;
}

.Set_container::after {
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
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-family-title);
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