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
    position: absolute;
    height: 100%;
    width: 100%;

    display: flex; /*Pour confiner les bordures à l'interieur du carré défini*/
}


.z1{
    border-top: 5px solid ;
	border-bottom: 5px solid ;
	border-radius: 10px;
    display: flex; /*Pour confiner les bordures à l'interieur du carré défini*/
    width: 100%; /*Pour confiner les bordures à l'interieur du carré défini*/

    border-color: rgb(var(--color), 1);
}

.z2 {
	border-right: 5px solid ;
	border-left: 5px solid ;
	border-radius: 5px;
    width: 100%; /*Pour confiner les bordures à l'interieur du carré défini*/
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: var(--font-family-title);
    font-size: 40px;
    color: rgb(var(--color), 1);
    padding-bottom: 5px;

    border-color: rgb(var(--color), 0.5);
}


</style>