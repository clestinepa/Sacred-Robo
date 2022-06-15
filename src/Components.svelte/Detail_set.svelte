<script>
	export let set;
    import {settings, switchOn} from '../stores.js'

    let winner, color1,  color2;
    $:  if (set[0] > set[1]) {
            winner = "left";
        } else {
            winner = "right";
        }
    $:  if ($switchOn) {
            color1= $settings.team2_color.value[1];
            color2= $settings.team1_color.value[1];
        } else {
            color1= $settings.team1_color.value[1];
            color2= $settings.team2_color.value[1];
        }
    

</script>

<div class="container" style="--color1: {color1}; --color2: {color2};">
    <div class={winner == "left" ? "left" : "right"}>
        <div class=z11><div class=z21>
            <p>
                {set[0]}
            </p>
        </div></div>
        <div class=z12><div class=z22>
            <p>
                {set[1]}
            </p>
        </div></div>
    </div>
</div>

<style>
.container {
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
	border-top: 5px solid ;
	border-bottom: 5px solid ;
    display: flex;
    width: 100%;
    border-color: var(--normal);
}

.z11 {
	border-radius: 10px 0px 0px 10px;
}

.z12 {
	border-radius: 0px 10px 10px 0px;
}

.z21, .z22 {
    border-radius: 5px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: var(--font-family-title);
    font-size: 3vw;
    padding-bottom: 0.3vw;
}

.z21 {
	border-left: 5px solid ;
}

.z22 {
	border-right: 5px solid ;
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