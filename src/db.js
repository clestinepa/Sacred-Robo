import Dexie from 'dexie';
import { get } from 'svelte/store';
import { settings } from './stores.js';

export const db = new Dexie('myDatabase');
db.version(1).stores({
  score_db: 'id, name, color, set_win, point, nb_to, winner', // Primary key and indexed props
  sets_score_db: 'id++, team0, team1',
  comments_db:'id++, auteur, date, content, nb_applaus, nb_sad, responses'
});

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

  db.comments_db.add({
    auteur : "Guillaume",
    date : new Date('June 20, 2022 09:24:00'),
    content : " Ducimus sit tempore porro quis. Laudantium voluptas recusandae dolor sint eum quibusdam enim. Saepe dolores deserunt sint alias recusandae reprehenderit ut et. Fugiat atque et magnam ut dolor eum. Doloremque et eos. \nEos optio corrupti iusto ea ea aspernatur nisi aut quia. Qui quia sint nobis rerum odio. Nisi nihil sint reprehenderit. Id doloribus soluta accusamus fugit numquam eos.\nDolor autem quo fugit corporis asperiores placeat est aperiam. Sint velit aliquam quia quaerat iure ut fugiat officiis. Qui quo officiis corrupti veritatis. Facilis quia quisquam quis ut et. Totam voluptas omnis doloribus qui vero autem repellendus.",
    nb_applaus : 25,
    nb_sad : 12,
    responses : [{auteur : "Jean",
                content : "Ducimus sit tempore porro quis."},
                {auteur : "Laure",
                content : "Laudantium voluptas recusandae dolor sint eum quibusdam enim."},
                {auteur : "Marie",
                content : "Fugiat atque et magnam ut dolor eum. "},
                {auteur : "Phillipe",
                content : "Qui quo officiis corrupti veritatis."},
                {auteur : "Nico",
                content : "Facilis quia quisquam quis ut et."}]
  });
  db.comments_db.add({
    auteur : "Jean-Charles",
    date : new Date('December 17, 2021 18:24:00'),
    content : " Ducimus sit tempore porro quis. Laudantium  voluptas recusandae dolor sint eum quibusbvbvbvbv vbv vb vbdam enim.",
    nb_applaus : 2,
    nb_sad : 185,
    responses : [{auteur : "Laurie",
                content : "Fugiat ut ratione dolores eum ut vel rerum quidem. Dolore deserunt voluptate sunt debitis reprehenderit. At voluptatem iusto tempore. Sapiente sapiente fuga sed natus. Sunt voluptatem et. \nNihil non esse culpa mollitia nesciunt fugiat necessitatibus id. Maxime praesentium quasi sapiente. Consequatur dolorum unde veritatis officia sed dolore quam ducimus. Omnis animi et voluptate perferendis ut et odio enim.\nEst aspernatur ex. Dolorem quo quos dolores aperiam. Voluptatem sapiente perspiciatis corporis magni. Voluptates et omnis sequi quo aut voluptate."},
                {auteur : "Oscar",
                content : "Laudantium voluptas recusandae dolor sint eum quibusdam enim."}]
    });

});

db.open();