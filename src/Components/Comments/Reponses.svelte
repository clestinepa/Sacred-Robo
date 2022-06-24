<script>
    export let com;
    import {dateToString} from '../Functions.svelte'

</script>

{#each com.responses as reponse}
    <div class=reponse>
        <div class=header_com>
            <h2 class="title_subsection title_subsection_com">{reponse.auteur}</h2>
            <div class=date>{dateToString(reponse.date)}</div>
        </div>
        <p class=content_responses>
            <span>{reponse.content}</span>
        </p> 
    </div>
{/each}

<style>
    .reponse {
        border-left: 1px solid var(--clair);
    }

    .header_com {
        display: flex;
        justify-content: space-between;
        align-items: end;
    }

    .title_subsection_com {
        font-weight: semibold;
    }

    .date {
        color: var(--font-clair);
    }
</style>