import Dexie from 'dexie';

export const db = new Dexie('myDatabase');
db.version(1).stores({
  friends: '++id, name, age', // Primary key and indexed props
});

/*
export const score = writable([
    {   name : "Home",
        color : ["#0019FF", "0,26,255"],
        set_win : 2,
        point : 6,
        nb_to : 0,
        winner : false      },
    {   name : "Guest",
        color : ["#FF0027", "255,0,39"],
        set_win : 2,
        point : 14,
        nb_to : 1,
        winner : false      }
]);

*/