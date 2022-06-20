import Dexie from 'dexie';
import { get } from 'svelte/store';
import { settings } from './stores.js';

export const db = new Dexie('myDatabase');
db.version(1).stores({
  score_db: 'id, name, color, set_win, point, nb_to, winner', // Primary key and indexed props
  sets_score_db: 'id++, team0, team1'
});

// await db.score_db.add({
//   name: get(settings).team0_name.value,
//   color : get(settings).team0_color.value,
//   set_win : 0,
//   point : 0,
//   nb_to : 0,
//   winner : false
// });

// await db.score_db.add({
//   name: get(settings).team1_name.value,
//   color : get(settings).team1_color.value,
//   set_win : 0,
//   point : 0,
//   nb_to : 0,
//   winner : false
// });

db.on('populate', () => {
  db.score_db.add({
    id : 0,
    name : get(settings).team0_name.value,
    color : get(settings).team0_color.value,
    set_win : 2,
    point : 23,
    nb_to : 0,
    winner : 0
  });
  db.score_db.add({
    id : 1,
    name : get(settings).team1_name.value,
    color : get(settings).team1_color.value,
    set_win : 1,
    point : 23,
    nb_to : 1,
    winner : 0
  });

  db.sets_score_db.add({
    team0 : 24,
    team1 : 26
  });
  db.sets_score_db.add({
    team0 : 25,
    team1 : 16
  });
  db.sets_score_db.add({
    team0 : 25,
    team1 : 21
  });
});

db.open();

/*
export const score = writable([
    {   id : 0,
        name : get(settings).team0_name.value,
        color : get(settings).team0_color.value,
        set_win : 2,
        point : 0,
        nb_to : 0,
        winner : false      },
    {   id : 1,
        name : get(settings).team1_name.value,
        color : get(settings).team1_color.value,
        set_win : 2,
        point : 0,
        nb_to : 0,
        winner : false      }
]);

*/