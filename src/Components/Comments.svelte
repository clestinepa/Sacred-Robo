<script>
	import { liveQuery } from "dexie";
	import { db } from "../db.js";

    import See from './See.svelte';
    import React from './React.svelte';
    import Reponses from './Reponses.svelte';
    import Content_Com from './Content_Com.svelte';
    import {dateToString} from '../Functions.svelte'

    let read_comments_db = liveQuery(() => db.comments_db.toArray());

    let content;
    setInterval(() => {
        content = document.getElementsByClassName('content_com');
        for (const c of content) {
            if (c.offsetHeight < c.scrollHeight) {
                c.style.background = "-webkit-radial-gradient(calc(100% - 50px) 85%, ellipse farthest-side, transparent 10%, var(--font) 30%)";
                c.style.backgroundClip = "text";
                c.style.webkitBackgroundClip = "text";
                c.style.color = "transparent";
                c.getElementsByTagName('div')[0].innerHTML = 'Read more';
            } else {
                c.style.background = "transparent";
                c.style.backgroundClip = "border-box";
                c.style.webkitBackgroundClip = "border-box";
                c.style.color = "var(--font)";
                if (c.className.slice(0,17) == "content_com false") {
                    c.getElementsByTagName('div')[0].innerHTML = '';
                }
            }  
        }
    }, 0);
</script>

{#if $read_comments_db}
{#each $read_comments_db as com}
    <div class=com>
        <div class=header_com>
            <h2 class=title_subsection>{com.auteur}</h2>
            <div class=date>{dateToString(com.date)}</div>
        </div>
        <div class=zone_com>
            <Content_Com com={com}/>
            <div class=footer_com>
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
        padding-bottom: min(max(10px,2vw),20px);
        border-bottom: 1px solid var(--clair);
    }

    .header_com {
        display: flex;
        justify-content: space-between;
        align-items: end;
    }

    .title_subsection {
        font-size : min(max(15px,3vw),20px);
        font-weight: semibold;
    }

    .date {
        color: var(--font-clair);
        font-size : min(max(10px,2vw),15px);
    }

    .zone_com {
        margin: min(max(10px,2vw),20px) 0 0 min(max(10px,2vw),20px);
        display: flex;
        flex-direction: column;
        gap:  min(max(10px,2vw),20px);
    }

    .footer_com {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        color : var(--normal);
        border-color : var(--clair);
    }

    .reponse_details {
        display: none;
        flex-direction: column;
        gap: min(max(15px,3vw),20px);
    }




</style>
