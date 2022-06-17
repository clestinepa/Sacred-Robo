FriendAdder.svelte
<script>
    import { db } from "../db.js";
  
    let status = "";
  
    let teamName = "";
    let nbPoints = 0;
  
    async function addTeam() {
    //   try {
        // Add the new friend!
        db.score_db.update(1, {name: teamName}).then(function (updated) {
        if (updated)
            console.log ("Team 1 was renamed");
        else
            console.log ("Nothing was updated - there were no team with primary key: 1");
        });
  
    //     status = `Friend ${teamName} successfully added. Got id ${id}`;
        
    //     // Reset form:
    //     teamName = "";
    //     nbPoints = 0;
    //   } catch (error) {
    //     status = `Failed to add ${teamName}: ${error}`;
    //   }
    }
  </script>
  <div>
    <p>{status}</p>
    <fieldset>
      <legend>Add new team</legend>
      <label>
        Name:
        <input
            type="text"
            bind:value={teamName} />
      </label>
      <!-- <br/>
      <label>
        Point:
        <input
          type="number"
          bind:value={nbPoints} />
      </label>
      <br /> -->
      <button on:click={addTeam}>Modify team 1</button>
    </fieldset>
  </div>