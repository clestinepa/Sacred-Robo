<script>

	/** TODO
	 * Synchronisation !
	 *
	 * Deplacmeent Comments : 	gerer quand result est deja en taille min
	 * 							drag s'arrete parfois en zone1
	 *							calcul x et y responsive
	 *							 
	 * boutons enregistré preset (?) + bouton réinisganilsé settings
	 * rajouter settings choix score temps mort technique
	 * Contrainte temps mort technique
	 * 
	 * carton rouge pour enlever un point !
	 *
	 * confetti saut "naturel"
	 * 
	 * Erreur : bundle ne se construot pas jusqu'au bout : Uncaught SyntaxError: Unexpected end of input (at bundle.js:3595:24)
	 * ERROR : VM11:6772 crbug/1173575, non-JS module files deprecated. (anonyme) @ VM11:6772
	 *		   [Violation] Forced reflow while executing JavaScript took 56ms
	 *				=> stack overflow a la sulotion : Network - Aucune Limitation et pas Hor ligne
	 * Violation :Forced reflow while executing JavaScript took 70ms
	 *
	 * Responsive : Commentaires
	 * 				taille result adaptable place commentaire
	 * 				Check dans check_to
	 *				boite de dialogue
	 *				see.svelte seeMore => minHeight
	 *
	 * Hover see colore toutes les fleches
	 * Scroll main ne va pas jusqu'au padding du bas
	 *
	 * Hover :	clear confetti
	 * 			navigation
	 * 			timemout
	 * 			timer
	 * 			switch
	 *
	 * scroll commentaire : https://codepen.io/seahorsepip/pen/vYXzWgW?editors=1100			
	 * easteregg : https://svelte.dev/repl/9eb4551167b94acfa0fc033662db209e?version=3.48.0
	*/

	import { liveQuery } 	from "dexie";
	import { db } 			from "./db.js";
	import {settings, switchOn, page} from './stores.js';
	import {animScoreIncrement, startGame, handleKeyboardUp, handleKeyboardDown, dragoverComments, dropComments, dragstartResize} from './Functions.svelte';
	import Contraintes 		from './Contraintes.svelte';
	
	import Select_Preset 	from './Components/Settings/Select_Preset.svelte';
	import Text 			from './Components/Settings/Text.svelte';
	import Select_Color 	from './Components/Settings/Select_Color.svelte';
	import Select_Number 	from './Components/Settings/Select_Number.svelte';
	
	import Check 			from './Components/Check.svelte';
	import Confetti 		from './Components/Confetti.svelte';
	
	import Score 			from './Components/Result/Score.svelte';
	import Set 				from './Components/Result/Set.svelte';
	import Detail_set 		from './Components/Result/Detail_set.svelte';
	import Check_to 		from './Components/Result/Check_to.svelte';
	import Timer_to 		from './Components/Result/Timer_to.svelte';
	import Fleche_switch 	from './Components/Result/Fleche_switch.svelte';
	
	import Comments 		from './Components/Comments/Comments.svelte';
	import See 				from './Components/Comments/See.svelte';
	
	import Header_Game 		from './Components/Header/Header_Game.svelte';
	import Settings_Button 	from './Components/Header/Settings_Button.svelte';

    let read_sets_score_db = liveQuery(() => db.sets_score_db.toArray());
    let read_score_db = liveQuery(() => db.score_db.toArray());
	let read_comments_db = liveQuery(() => db.comments_db.toArray());

</script>

<Contraintes/>



{#if $page == "settings"}
	<header>
		<h1 id=bigTitle_settings>Sacred Robo</h1>
		<Settings_Button type="settings"/>
	</header>
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
						<Text bind:type={$settings.team0_name}/>
						<Select_Color bind:type={$settings.team0_color}/>
					</div>
					<div>
						<h2 class=title_subsection>Second Team</h2>
						<Text bind:type={$settings.team1_name}/> 
						<Select_Color bind:type={$settings.team1_color}/>
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
	<Header_Game/>
	{#if $read_score_db && $read_sets_score_db}
	<main id=game on:dragover={e => dragoverComments(e)} on:drop={e => dropComments(e)}>
		<div class=container_com_zone>
			<div id=com_zone1></div>
			<!-- <span draggable="true" class=resize_com_zone style='min-width : var(--1vw);' on:dragstart={dragstartResize}></span> -->
		</div>
		<!-- <div id=com_zone1_gap style='min-width : max(7%, 20px);'></div> -->
		<div id=com_zone1_gap></div>
		<div id=com_zone3>
			<div id=result>
				<div id=names_{$switchOn}>
					<p id=name1 style:color={$read_score_db[0].color[0]}>{$read_score_db[0].name}</p>
					<div class=gap> <Fleche_switch/></div>
					<p id=name2 style:color={$read_score_db[1].color[0]}>{$read_score_db[1].name}</p>
				</div>
				<div id=points_{$switchOn}>
					<div class=score on:click={e => animScoreIncrement(e, 0)}>
						<Score number_team=0/>
					</div>
					<div class=set>
						<div class=score_set>
							<div class=point_set>
								<Set number_team=0/>
							</div>
							<div class=point_set>
								<Set number_team=1/>
							</div>
						</div>
						<div class=detail_set>
							{#each $read_sets_score_db as set}
								<Detail_set set={set}/>
							{/each}
						</div>
					</div>
					<div class=score on:click={e => animScoreIncrement(e, 1)}>
						<Score number_team=1/>
					</div> 
				</div>
				<div id=temps_mort>
					<div id=tm1>
						<h2 class=title_subsection>Timeout:</h2>
						{#if !$switchOn}
							<Check_to number_team=0/>
						{:else}
							<Check_to number_team=1/>
						{/if}
					</div>
					<div class=gap>
						<Timer_to/>
					</div>
					<div id=tm2>
						{#if !$switchOn}
							<Check_to number_team=1/>
						{:else}
							<Check_to number_team=0/>
						{/if}
						<h2 class=title_subsection>:Timeout</h2>
					</div>
				</div>
				<p id=info_comments>Comments ↓</p>
			</div>	
			{#if $read_comments_db}
			<div id=comments on:dragstart={e => dragstartResize(e)}>
				<span draggable=true id=resize_com_zone on:dragstart={dragstartResize}></span>
				<div id=comments_scroll>
					<See text="Comments" type_details={-1}/>
					<div id=comment_details>
						{#if $read_comments_db.length == 0}
							<div><span>There is no comments, for the moment</div>
						{:else}
							<Comments/>
						{/if}
					</div>	
				</div>
			</div>
			{/if}
		</div>
		<div id=com_zone2_gap></div>
		<div class=container_com_zone>
			<!-- <span draggable=true class=resize_com_zone></span> -->
			<div id=com_zone2></div>
		</div>
	</main>
	{#if ($read_score_db[0].winner==1? true : false) || ($read_score_db[1].winner==1? true : false)}
		<Confetti/>
	{/if}
	{/if}
{/if}

<svelte:window on:keydown={e => {handleKeyboardDown(e)} } on:keyup={e => {handleKeyboardUp(e)}} />

<style>
/* Header */
header {
	border-bottom: 4px solid var(--details);
	border-radius: 30px;

	padding: min(max(20px,4vw),30px) min(max(22.5px,4.5vw),50px);

	display: flex;
	justify-content: space-between;
	align-items: center;

	background: var(--bg);
}

#bigTitle_settings {
	margin: 0px;

	font-family: var(--font-family-title);
	font-size: 40px;
	color: var(--normal);
}
/* ****** */

main {
	flex: 1 0;
	overflow : overlay overlay;
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
#game{
	display: flex;
}

#result {
	display: flex;
	flex-direction: column;
	min-width: 430px;
}

#names_false, #names_true, #points_false, #points_true, #temps_mort {
	display: flex;
	justify-content: center;
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
/* ****** */

/* RESULT */

/* Name */
#name1, #name2 {
	font-family: var(--font-family-title);
	margin: 0;
}
/* **** */

/* Settings */
#settings_game {
	display: flex;
    justify-content: center;
}

#pos_back {
	flex:1;
	display: flex;
	justify-content: right;
}
/* ******** */

/* Points */
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
#temps_mort .title_subsection {
	margin: 0px;
	padding: 0px;
}

#tm1, #tm2 {
	display: flex;
	align-items: center;
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
#info_comments {
	color: transparent;
	text-align: center;
	transition: 1s;
}

.container_com_zone {
	display: flex;
}

#com_zone3 {
	flex:1 0;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

#com_zone1, #com_zone2 {
	display: flex;
	flex-direction: column;
}


#comments {
	background: var(--bg-transparent);
	border-left : none;
	border-right : none;
	position : relative;
	top:0px;
	left:0px;
}

#resize_com_zone {
	position : absolute;
	width : 100%;
	background: transparent;
}


#comments_scroll {
	overflow-y : overlay;

	display: flex;
	flex-direction: column;
}

#comment_details {
	display: none;
	flex-direction: column;
}
/* ******** */

</style>