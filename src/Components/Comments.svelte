<script>
    import { onMount } from 'svelte';
    import { comments } from '../stores.js';

    import See from './See.svelte';
    import React from './React.svelte';
    import Reponses from './Reponses.svelte';


    let text;
    onMount( () => {
        text = document.getElementsByClassName('content');
        for (const t of text) {
            if (t.offsetHeight < t.scrollHeight) {
                // your element has overflow and truncated
                // show read more / read less button
                // console.log('trunk', t);
            } else {
                // your element doesn't overflow (not truncated)
                // console.log('full',t);
            }  
        }


    }); 

</script>

{#each $comments as com}
    <div class=com>
        <h2 class=title_subsection>{com.auteur}</h2>
        <div class=zone_com>
            <p class=content>
                <span>{com.content}</span>
                <span>Read more</span>
            </p> 
            <div class=footer>
                {#if com.reponse.length==0}
                    <div></div>
                {:else if com.reponse.length==1}
                   <See text={"Show the " + com.reponse.length + " reponse"} details={com.id}/>
                {:else}
                    <See text={"Show the " + com.reponse.length + " reponses"} details={com.id}/>
                {/if}
                <React bind:com={com}/>
            </div>
            <div class=reponse_details>
                <Reponses com={com}/>
            </div>
        </div>
    </div>
{/each}


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
