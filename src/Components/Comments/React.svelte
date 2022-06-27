<script>
    import { db } from "../../db";


    export let com;
    let select_applause = false;
    let select_sad = false;

    function applause() {
        if (select_applause) {
            com.nb_applaus--;
        } else {
            com.nb_applaus++;
            if (select_sad) {
                com.nb_sad--;
                db.comments_db.update(com.id, {nb_sad: com.nb_sad});
                select_sad = false;
            }
            
        }
        db.comments_db.update(com.id, {nb_applaus: com.nb_applaus});
        select_applause = !select_applause;
    }

    function sad() {
        if (select_sad) {
            com.nb_sad--;
        } else {
            com.nb_sad++;
            if (select_applause) {
                com.nb_applaus--;
                db.comments_db.update(com.id, {nb_applaus: com.nb_applaus});
                select_applause = false;
            }
            
        }
        db.comments_db.update(com.id, {nb_sad: com.nb_sad});
        select_sad = !select_sad;
    }

</script>

<div class=react>
    <div class=detail_react_{select_applause} on:click={applause}>
        <div class=icon_react>👏</div>
        <div class=nb>{com.nb_applaus}</div>
    </div>
    <div class=detail_react_{select_sad} on:click={sad}>
        <div class=icon_react>😢</div>
        <div class=nb>{com.nb_sad}</div>                   
    </div>
</div>

<style>
    .react {
        display: flex;
    }

    .detail_react_true, .detail_react_false {
        display: flex;
        align-items: center;
        cursor: pointer;
        font-family: var(--font-family-title);
    }

    .detail_react_true {
        color: var(--highlight);
    }
</style>