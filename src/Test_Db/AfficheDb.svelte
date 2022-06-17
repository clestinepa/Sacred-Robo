<!-- FriendList.svelte -->
<script>
    import { liveQuery } from "dexie";
    import { db } from "../db.js";

    let read_score_db = liveQuery(
      () => db.score_db.toArray()
    );

    console.log($read_score_db);
    setTimeout(() => {
        console.log($read_score_db);
        // score_team = $read_score_db;
    },1);
  
  </script>
  <ul>
    {#if $read_score_db}
      {#each $read_score_db as s (s.id)}
        <li>{s.name}, {s.point}</li>
      {/each}
    {:else}
    <p>C'est vide</p>
    {/if}
  </ul>