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


// export const comments= writable([
//     {   id:0,
//         auteur : "Guillaume",
//         date : "13/06/22 8:33",
//         content : " Ducimus sit tempore porro quis. Laudantium voluptas recusandae dolor sint eum quibusdam enim. Saepe dolores deserunt sint alias recusandae reprehenderit ut et. Fugiat atque et magnam ut dolor eum. Doloremque et eos. \nEos optio corrupti iusto ea ea aspernatur nisi aut quia. Qui quia sint nobis rerum odio. Nisi nihil sint reprehenderit. Id doloribus soluta accusamus fugit numquam eos.\nDolor autem quo fugit corporis asperiores placeat est aperiam. Sint velit aliquam quia quaerat iure ut fugiat officiis. Qui quo officiis corrupti veritatis. Facilis quia quisquam quis ut et. Totam voluptas omnis doloribus qui vero autem repellendus nostrum.",
//         nb_applaus : 25,
//         nb_sad : 12,
//         reponse : [{auteur : "Jean",
//                     content : "Ducimus sit tempore porro quis."},
//                     {auteur : "Laure",
//                     content : "Laudantium voluptas recusandae dolor sint eum quibusdam enim."},
//                     {auteur : "Marie",
//                     content : "Fugiat atque et magnam ut dolor eum. "},
//                     {auteur : "Phillipe",
//                     content : "Qui quo officiis corrupti veritatis."},
//                     {auteur : "Nico",
//                     content : "Facilis quia quisquam quis ut et."}
//                 ]
//     },
//     {   id:1,
//         auteur : "Jean-Charles",
//         date : "13/06/22 10:33",
//         content : " Ducimus sit tempore porro quis. Laudantium  voluptas recusandae dolor sint eum quibusbvbvbvbv vbv vb vbdam enim.",
//         nb_applaus : 2,
//         nb_sad : 185,
//         reponse : [{auteur : "Laurie",
//                     content : "Fugiat ut ratione dolores eum ut vel rerum quidem. Dolore deserunt voluptate sunt debitis reprehenderit. At voluptatem iusto tempore. Sapiente sapiente fuga sed natus. Sunt voluptatem et. \nNihil non esse culpa mollitia nesciunt fugiat necessitatibus id. Maxime praesentium quasi sapiente. Consequatur dolorum unde veritatis officia sed dolore quam ducimus. Omnis animi et voluptate perferendis ut et odio enim.\nEst aspernatur ex. Dolorem quo quos dolores aperiam. Voluptatem sapiente perspiciatis corporis magni. Voluptates et omnis sequi quo aut voluptate."},
//                     {auteur : "Oscar",
//                     content : "Laudantium voluptas recusandae dolor sint eum quibusdam enim."}
//                 ]}
// ]);