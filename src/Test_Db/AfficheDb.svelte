<!-- FriendList.svelte -->
<script>
    import { liveQuery } from "dexie";
    import { db } from "../db.js";
  
    let test = liveQuery(
      () => db.score_db.toArray()
    );
  
  </script>
  <ul>
    {#if $test}
      {#each $test as s (s.id)}
        <li>{s.name}, {s.point}</li>
      {/each}
    {:else}
    <p>C'est vide</p>
    {/if}
  </ul>