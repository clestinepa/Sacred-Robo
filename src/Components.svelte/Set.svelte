<script>
	export let score_team;
    export let color;
</script>


<div class="carre" style="--color: {color};">
    <div class=z1><div class=z2>
    {score_team.set_win}
    </div></div>
</div>

<style>
.carre{
    --border-witdh : min(0.8vw,10px);
    position: absolute;
    height: 100%;
    width: 100%;

    display: flex; /*Pour confiner les bordures à l'interieur du carré défini*/
}


.z1{
    border-top: var(--border-witdh) solid ;
	border-bottom: var(--border-witdh) solid ;
	border-radius: 1.5vw;
    display: flex; /*Pour confiner les bordures à l'interieur du carré défini*/
    width: 100%; /*Pour confiner les bordures à l'interieur du carré défini*/

    border-color: rgb(var(--color), 1);
}

.z2 {
	border-right: var(--border-witdh) solid ;
	border-left: var(--border-witdh) solid ;
	border-radius: 0.8vw;
    width: 100%; /*Pour confiner les bordures à l'interieur du carré défini*/
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: var(--font-family-title);
    font-size: min(6vw, 90px);
    color: rgb(var(--color), 1);
    padding-bottom: 0.5vw;

    border-color: rgb(var(--color), 0.5);
}


</style>