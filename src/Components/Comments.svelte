<script>
    import { onMount } from "svelte";
	import { liveQuery } from "dexie";
	import { db } from "../db.js";

    import See from './See.svelte';
    import React from './React.svelte';
    import Reponses from './Reponses.svelte';
    import {dateToString} from '../Functions.svelte'

    let read_comments_db = liveQuery(() => db.comments_db.toArray());

    let content;
    setInterval(() => {
        content = document.getElementsByClassName('content');
        for (const c of content) {
            if (c.offsetHeight < c.scrollHeight) {
                if (c.getElementsByTagName('div')[0]) {
                    c.style.background = "-webkit-radial-gradient(calc(100% - 65px) 85%, ellipse farthest-side, transparent 10%, var(--font) 30%)";
                    c.style.backgroundClip = "text";
                    c.style.webkitBackgroundClip = "text";
                    c.style.color = "transparent";
                    c.getElementsByTagName('div')[0].style.display = "block";
                }
            } else {
                if (c.getElementsByTagName('div')[0]) {   
                    c.style.background = " ";
                    c.style.backgroundClip = " ";
                    c.style.webkitBackgroundClip = " ";
                    c.style.color = " ";
                    c.getElementsByTagName('div')[0].style.display = "none";
                }
            }  
        }
    }, 0);
    
    function readMore() {
        
    }

</script>

{#if $read_comments_db}
{#each $read_comments_db as com}
    <div class=com>
        <div class=header_com>
            <h2 class=title_subsection>{com.auteur}</h2>
            <div class=date>{dateToString(com.date)}</div>
        </div>
        <div class=zone_com>
            <div class=content>
                <span>{com.content}</span>
                <div id=read on:click={readMore}>Read more</div>
            </div> 
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
        padding-bottom: 10px;
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
        font-size : min(max(10px,2vw),15px)
    }

    .zone_com {
        margin: 20px 0 0 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .content {
        font-size : min(max(12.5px,2.5vw),18px);

        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;

        position: relative;
    }

    #read {
        color: var(--font-clair);
        position: absolute;
        bottom: 0;
        right: 0;
        background: var(--bg);
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
        gap: 15px;
    }




</style>
