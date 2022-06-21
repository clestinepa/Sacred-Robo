import { writable, get } from 'svelte/store';

export let settings = writable({
    preset_name : { title : "Name",
                    value : "Indoor",
                    enable : true                   },

    team0_name : {  title : "Name",
                    value : "Home",
                    enable : true                   },

    team0_color : { title : "Color",
                    value : ["#0019FF", "0,26,255"],
                    enable : true                   },

    team1_name : {  title : "Name",
                    value : "Guest",
                    enable : true                   },

    team1_color : { title : "Color",
                    value : ["#FF0027", "255,0,39"],
                    enable : true                   },

    set : {         title : "Sets to win the game",
                    value : 3,
                    enable : true                   },

    point : {       title : "Points to win one set",
                    value : 25,
                    enable : true                   },

    check_tb : {    title : "Last set will be a tie Break",
                    value : true,
                    enable : true                   },

    point_tb : {    title : "Points to win the tie Break",
                    value : 15,
                    enable : true                   },

    check_switch : {    title : "At the end of each set",
                        value : true,
                        enable : true               },

    check_sum_regular : {   title : "Every sum of points",
                            value : false,
                            enable : true           },

    sum_regular : { title : "Sum of points for the switch",
                    value : 7,
                    enable : false                  },

    check_score_tb : {  title : "When winning team reaches a certain score",
                        value : true,
                        enable : true               },

    score_tb : {    title : "Sets to win the game",
                    value : 8,
                    enable : true                   },

    check_sum_tb : {    title : "Every sum of points",
                        value : false,
                        enable : true               },

    sum_tb : {      title : "Sum of points for the switch",
                    value : 5,
                    enable : false                  },

    check_to_tech : {   title : "Technical timeout",
                        value : true,
                        enable : true               },

    time_to_tech : {    title : "Number of technical timeout",
                        value : 2,
                        enable : true               },
        
    nb_to_tech : {  title : "Duration of technical timeout",
                    value : 60,
                    enable : true                   },

    check_to_coach : {  title : "Coach timeout",
                        value : true,
                        enable : true               },

    nb_to_coach : { title : "Number of coach timeout",
                    value : 2,
                    enable : true                   },

    time_to_coach : {   title : "Duration of coach timeout",
                        value : 30,
                        enable : true               }
});

export const colors = writable([
    {hexa : "#0019FF", rgb : "0,26,255"},
    {hexa : "#FF0027", rgb : "255,0,39"},
    {hexa : "#FFFFFF", rgb : "255,255,255"},
    {hexa : "#000000", rgb : "0,0,0"},
    {hexa : "#FF00E6", rgb : "255,0,230"},
    {hexa : "#FF7A00", rgb : "255,122,0"},
    {hexa : "#FFE600", rgb : "255,230,0"},
    {hexa : "#00FF7F", rgb : "0,255,127"},
    {hexa : "#00CFFF", rgb : "0,207,255"}
]);

export const start_timer = writable(false);

export const switchOn = writable(false);

export const set_has_been_won = writable(false);

export const page = writable("game");

export const last_action = writable({
    type : "none",
    target : null,
    value : null
});

export const last_actions = writable([{
    type : "none",
    target : null,
    value : null
}]);

let list = new Array(10).fill() //mémoire de 10actions
		.map(i => {
			return {
                type : "none",
                target : null,
                value : null
			};
		});
last_actions.set(list);