<script>
	import { liveQuery } from "dexie";
	import { db } from "../db.js";

    import See from './See.svelte';
    import React from './React.svelte';
    import Reponses from './Reponses.svelte';

    let read_comments_db = liveQuery(() => db.comments_db.toArray());

</script>

{#if $read_comments_db}
{#each $read_comments_db as com}
    <div class=com>
        <h2 class=title_subsection>{com.auteur}</h2>
        <div class=zone_com>
            <p class=content>
                <span>{com.content}</span>
                <!-- <span>Read more</span> -->
            </p> 
            <div class=footer>
                {#if com.responses.length==0}
                    <div>{com.responses}</div>
                {:else if com.responses.length==1}
                   <See text={"Show the " + com.responses.length + " response"} details={com.id}/>
                {:else}
                    <See text={"Show the " + com.responses.length + " responses"} details={com.id}/>
                {/if}
                <React com={com}/>
            </div>
            <div class=reponse_details>
                <Reponses com={com}/>
            </div>
        </div>
    </div>
{/each}
{/if}

<style>
    .com {
        padding-bottom: 10px;
        border-bottom: 1px solid var(--clair);
    }

    .title_subsection {
        font-size: 18px;
        font-weight: semibold;
    }

    .zone_com {
        margin: 20px 0 0 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .content {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        color : var(--normal);
        border-color : var(--clair);
    }

    .reponse_details {
        display: none;
        flex-direction: column;
        gap: 15px;
    }




</style>
