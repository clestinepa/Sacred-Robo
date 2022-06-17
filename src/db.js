import Dexie from 'dexie';
import { get } from 'svelte/store';
import { settings } from './stores.js';

export const db = new Dexie('myDatabase');
db.version(1).stores({
  score_db: 'id, name, color, set_win, point, nb_to, winner', // Primary key and indexed props
  sets_score_db: 'id++, team1, team2'
});

// await db.score_db.add({
//   name: get(settings).team1_name.value,
//   color : get(settings).team1_color.value,
//   set_win : 0,
//   point : 0,
//   nb_to : 0,
//   winner : false
// });

// await db.score_db.add({
//   name: get(settings).team2_name.value,
//   color : get(settings).team2_color.value,
//   set_win : 0,
//   point : 0,
//   nb_to : 0,
//   winner : false
// });

db.on('populate', () => {
  db.score_db.add({
    id:0,
    name: get(settings).team1_name.value,
    color : get(settings).team1_color.value,
    set_win : 0,
    point : 0,
    nb_to : 0,
    winner : 0
  });
  db.score_db.add({
    id: 1,
    name: get(settings).team2_name.value,
    color : get(settings).team2_color.value,
    set_win : 0,
    point : 0,
    nb_to : 0,
    winner : 0
  });
});

db.open();

/*
export const score = writable([
    {   id : 0,
        name : get(settings).team1_name.value,
        color : get(settings).team1_color.value,
        set_win : 2,
        point : 0,
        nb_to : 0,
        winner : false      },
    {   id : 1,
        name : get(settings).team2_name.value,
        color : get(settings).team2_color.value,
        set_win : 2,
        point : 0,
        nb_to : 0,
        winner : false      }
]);

*/