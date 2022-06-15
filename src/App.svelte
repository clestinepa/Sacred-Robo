<script>

	/** A FAIRE
	 * undoAction switch ? + pendant timer
	 * bouton rejoindre partie
	 * bouton partagé partie
	 * commentaire => déplacable bas ou cotés
	 * faire check_ON design
	 * boutons enregistré preset (?)
	 * affichage score : font minimum
	 * bouton réinisganilsé settings
	 * gerer scroll beau : voir méthode essai read more
	 * rajouter settings choix score temps mort technique
	 * Contrainte temps mort technique
	 * confetti saut "naturel"
	 * boutons dans score pour édit directment
	 * taille fleche switch responsive
	 * store variable score pb reactive
	 * hover joli dans toutes les pages
	 * Erreur : bundle ne se construot pas jusqu'au bout : Uncaught SyntaxError: Unexpected end of input (at bundle.js:3595:24)
	 * ERROR : VM11:6772 crbug/1173575, non-JS module files deprecated. (anonyme) @ VM11:6772
			   [Violation] Forced reflow while executing JavaScript took 56ms
	 *				=> stack overflow a la sulotion : Network - Aucune Limitation et pas Hor ligne
	 *Violation :Forced reflow while executing JavaScript took 70ms
	 * 
	*/

	import {settings, score, sets, switchOn, page, comments} from './stores.js';
	import {animScoreIncrement, startGame, undoAction} from './Functions.svelte';
	import Select_Preset from './Components.svelte/Select_Preset.svelte';
	import Text from './Components.svelte/Text.svelte';
	import Select_Color from './Components.svelte/Select_Color.svelte';
	import Select_Number from './Components.svelte/Select_Number.svelte';
	import Check from './Components.svelte/Check.svelte';
	import Contraintes from './Contraintes.svelte';
	import Score from './Components.svelte/Score.svelte';
	import Set from './Components.svelte/Set.svelte';
	import Detail_set from './Components.svelte/Detail_set.svelte';
	import Check_to from './Components.svelte/Check_to.svelte';
	import Timer_to from './Components.svelte/Timer_to.svelte';
	import Confetti from './Components.svelte/Confetti.svelte';
	import Fleche_switch from './Components.svelte/Fleche_switch.svelte';
	import Settings_Button from './Components.svelte/Settings_Button.svelte';
	import Back from './Components.svelte/Back.svelte';
	import Comments from './Components.svelte/Comments.svelte';
	import See from './Components.svelte/See.svelte';

</script>

<Contraintes/>

<header>
	<h1 id=bigTitle>Sacred Robo</h1>
	<Settings_Button/>
</header>

{#if $page == "settings"}
<main class="settingss">
	<div id=settings>
		<div class=column>
			<div class=section>
				<h1  class=title_section>Preset</h1>
				<Select_Preset type={$settings.preset_name}/>
			</div>
	
			<div class=section>
				<h1 class=title_section>Teams</h1>
				<div>
					<h2 class=title_subsection>First Team</h2>
					<Text bind:type={$settings.team1_name}/>
					<Select_Color bind:type={$settings.team1_color}/>
				</div>
				<div>
					<h2 class=title_subsection>Second Team</h2>
					<Text bind:type={$settings.team2_name}/> 
					<Select_Color bind:type={$settings.team2_color}/>
				</div> 
			</div>
		</div>
		
		<div class=column>
			<div class=section>
				<h1 class=title_section>Points</h1>
				<Select_Number bind:type={$settings.set}/>
				<Select_Number bind:type={$settings.point}/>
			</div>
	
			<div class=section>
				<h1 class=title_section>Tie Break</h1>
				<Check bind:type={$settings.check_tb}/>
				<Select_Number bind:type={$settings.point_tb}/>
			</div>
		</div>
		
		<div class=section>
			<h1 class=title_section>Automatic Side Switch</h1>
			<div>
				<h2 class=title_subsection>Regular Set</h2>
				<Check bind:type={$settings.check_switch} />
				<Check bind:type={$settings.check_sum_regular}/>
				<Select_Number bind:type={$settings.sum_regular}/>
			</div>
			<div>
				<h2 class=title_subsection>Tie Break</h2>
				<Check bind:type={$settings.check_score_tb} />
				<Select_Number bind:type={$settings.score_tb}/>
				<Check bind:type={$settings.check_sum_tb} />
				<Select_Number bind:type={$settings.sum_tb}/>
			</div> 
		</div>

		<div class=section>
			<h1 class=title_section>Time Out</h1>
			<div>
				<h2 class=title_subsection>Technical</h2>
				<Check bind:type={$settings.check_to_tech} />
				<Select_Number bind:type={$settings.nb_to_tech}/>
				<Select_Number bind:type={$settings.time_to_tech}/>
			</div>
			<div>
				<h2 class=title_subsection>Coach</h2>
				<Check bind:type={$settings.check_to_coach} />
				<Select_Number bind:type={$settings.nb_to_coach}/>
				<Select_Number bind:type={$settings.time_to_coach}/>
			</div>
		</div>

	</div>

	<div class=boutons>
			<div id=button_start on:click={startGame}><p>Start the game !</p></div>
	</div>
</main>
{:else if $page == "game"}
<main class="game">
	<div id=result>
		<div id=settings_game>
			<div id=pos_back><Back/></div>
		</div>
		<div id=names_{$switchOn}>
			<p id=name1 style:color={$settings.team1_color.value[0]}>{$settings.team1_name.value}</p>
			<div class=gap> <Fleche_switch/></div>
			<p id=name2 style:color={$settings.team2_color.value[0]}>{$settings.team2_name.value}</p>
		</div>
		<div id=points_{$switchOn}>
			<div class=score on:click={e => animScoreIncrement(e, 0)}>
				<Score bind:score_team={$score[0]} color={$settings.team1_color.value[1]}/>
			</div>
			<div class=set>
				<div class=score_set>
					<div class=point_set>
						<Set score_team={$score[0]} color={$settings.team1_color.value[1]}/>
					</div>
					<div class=point_set>
						<Set score_team={$score[1]} color={$settings.team2_color.value[1]}/>
					</div>
				</div>
				<div class=detail_set>
					{#each $sets as set}
						<Detail_set set={set}/>
					{/each}
				</div>
			</div>
			<div class=score on:click={e => animScoreIncrement(e, 1)}>
				<Score bind:score_team={$score[1]} color={$settings.team2_color.value[1]}/>
			</div> 
		</div>
		<div id=temps_mort>
			<div id=tm1>
				<h2 class=title_subsection>Timeout:</h2>
				{#if !$switchOn}
					<Check_to bind:score_team={$score[0]} color={$settings.team1_color.value[1]}/>
				{:else}
					<Check_to bind:score_team={$score[1]} color={$settings.team2_color.value[1]}/>
				{/if}
			</div>
			<div class=gap>
				<Timer_to/>
			</div>
			<div id=tm2>
				{#if !$switchOn}
					<Check_to bind:score_team={$score[1]} color={$settings.team2_color.value[1]}/>
				{:else}
					<Check_to bind:score_team={$score[0]} color={$settings.team1_color.value[1]}/>
				{/if}
				<h2 class=title_subsection>:Timeout</h2>
			</div>
		</div>
	</div>
	<div id=comments>
		<See text="Comments" details={-1}/>
		<div id=comment_details>
			{#if $comments.length == 0}
				<div><span>There is no comments, for the moment</div>
			{:else}
				<Comments/>
			{/if}
		</div>	
	</div>
	
</main>
	{#if ($score[0].winner | $score[1].winner)}
	<Confetti/>
	{/if}
{/if}

<svelte:window on:keyup={e => {if (e.code=='KeyW' && e.ctrlKey) {undoAction();}} } />

<style>
/* Header */
header {
	border-bottom: 4px solid var(--details);
	border-radius: 30px;

	padding: 25px min(10%,50px);

	display: flex;
	justify-content: space-between;
	align-items: center;

	background: var(--bg);
}

#bigTitle {
	margin: 0px;

	font-family: var(--font-family-title);
	font-size: 40px;
	color: var(--normal);
}
/* ****** */

main {
	flex: 1 0;
	overflow : auto auto;
}

/* Settings */
.settingss {
	overflow-y: auto;
}

#settings {
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	gap: 75px 10%;
	margin : 100px max(50px,7%);
}

.column , .section {
	width: 280px;
}

.column {
	display: flex;
	flex-direction: column;
	gap: 75px 0px;
} 

.title_section {
	margin-top: 0px;
	margin-bottom: 15px;

	font-family:  var(--font-family-title);
	font-size: 30px;
	font-weight: normal;
}

.title_subsection {
	margin-top: 0px;
	margin-bottom: 15px;
	padding-top: 15px;

	font-size: 18px;
	font-weight: semibold;
}
/* ******** */

/* Boutons */
.boutons {
	display:flex;
	align-items: center;
	justify-content: center;
	
}

#button_start {
	background-color: var(--normal);
	border-radius: 45px;
	margin: 10px;
	margin-bottom: 100px;
	height: 85px;
	width: 450px;
	display:flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}

#button_start p {
	margin: 0px;
	font-family:  var(--font-family-title);
	font-size: 30px;
	font-weight: normal;
}
/* ******* */

/* GAME */

/* Global */
.game{
	padding: max(2%, 5px) max(7%, 20px) max(7%, 20px) max(5%, 20px);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

#pos_back {
	max-width: calc(1000px + 2vw + 250px);
}

#names_false, #names_true, #points_false, #points_true, #temps_mort {
	display: flex;
	justify-content: center;
	gap: 1vw;
}

#name1, #name2, .score, #tm1, #tm2 {
	position: relative;
	width: 100%;
	max-width: 500px;
}

.gap, .set   {
	width: 50%;
	max-width: 250px;
}

.set, .detail_set {
	gap: 1vw;
}

.score_set  {
	gap: 2vw;
}

.detail_set {
	padding: 0 3vw 0 3vw;
}
/* ****** */

/* RESULT */

/* Name */
#name1, #name2 {
	font-family: var(--font-family-title);
	font-size: min(4vw,50px);
	margin: 0;
}
/* **** */

/* Settings */
#settings_game {
	display: flex;
    justify-content: center;
	margin-bottom: max(2%, 5px);
}

#pos_back {
	flex:1;
	display: flex;
	justify-content: right;
}
/* ******** */

/* Points */
#points_false, #points_true {
	margin: 10px 0 10px 0;
}

.score::after {
	content: '';
	display: block;
	padding-bottom: 100%;
}

.set {
	display: flex;
	flex-direction: column;
}

.score_set  {
	display: flex;
	justify-content: center;
}

.point_set {
	position: relative;
	width: 100%;
}

.point_set::after {
	content: '';
	display: block;
	padding-bottom: 100%;
}

.detail_set {
	height: 100%;
	display: flex;
	flex-direction: column;
}
/* ****** */

/* Time Out */
#temps_mort {
	height: 50px;
}

#temps_mort .title_subsection {
	margin: 0px;
	padding: 0px;
}

#tm1, #tm2 {
	display: flex;
	align-items: center;
	gap: 15px;
}

#tm2 {
	justify-content: right;
}
/* **** *** */

/* Switch */
#names_true .gap, #names_false .gap {
	display: flex;
	justify-content: center;
	align-items: flex-end;
}

#names_true, #points_true {
	flex-direction: row-reverse;
}

#names_false #name2 {
	text-align: right;
}

#names_true #name1 {
	text-align: right;
}

#points_true .score_set  {
	flex-direction: row-reverse;
}
/* ****** */

/* ****** */

/* COMMENTS */
#comments {
	background: var(--bg-transparent);
	border-radius: 30px;
	border : 5px solid var(--clair);
	border-left : none;
	border-right : none;
	margin: 40px 0 0 0px;
	padding : 15px 30px 15px 30px;

	min-height : 67px;

	overflow-y : auto;

	display: flex;
	flex-direction: column;
	gap: 15px;
}

#comment_details {
	display: none;
	flex-direction: column;
	gap: 30px;
}


/* ******** */

</style>