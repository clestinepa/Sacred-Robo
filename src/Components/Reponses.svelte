<script>
    export let com;
    import {dateToString} from '../Functions.svelte'

</script>

{#each com.responses as reponse}
    <div class=reponse>
        <div class=header_com>
            <h2 class=title_subsection>{reponse.auteur}</h2>
            <div class=date>{dateToString(reponse.date)}</div>
        </div>
        <p class=content>
            <span>{reponse.content}</span>
        </p> 
    </div>
{/each}

<style>
    .reponse {
        padding : min(max(5px,1vw),10px) 0 min(max(5px,1vw),10px) min(max(10px,2vw),20px);
        border-left: 1px solid var(--clair);
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


    .content {
        margin: min(max(5px,1vw),10px) 0 0 min(max(10px,2vw),20px);
        font-size : min(max(12.5px,2.5vw),18px);
    }
</style>