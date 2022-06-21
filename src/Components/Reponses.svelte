<script>
    export let com;
</script>

{#each com.responses as reponse}
    <div class=reponse>
        <h2 class=title_subsection>{reponse.auteur}</h2>
        <p class=content>
            <span>{reponse.content}</span>
        </p> 
    </div>
{/each}

<style>
    .reponse {
        padding : 5px 0 5px 10px;
        border-left: 1px solid var(--clair);
    }

    .title_subsection {
        font-size: 18px;
        font-weight: semibold;
    }

    .content {
        margin: 10px 0 0 20px;
    }

    .content {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>