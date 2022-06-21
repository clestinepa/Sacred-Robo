<script>
    export let com

    let more = false;

    function readMore(event) {
        more = !more;
        if (more) {
            event.currentTarget.parentElement.style.display = "block";
            event.currentTarget.innerHTML = 'Hide';
        } else {
            event.currentTarget.parentElement.style.display = "-webkit-box";
            event.currentTarget.innerHTML = 'Read more';
        }
        
    }
</script>

<div class="content_com {more}" >
    <span>{com.content}</span>
    <div id=read on:click={e => readMore(e)}>Read more</div>
</div> 

<style>
.content_com {
    font-size : min(max(12.5px,2.5vw),18px);

    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;

    position: relative;
}

#read {
    font-size : min(max(10px,2vw),15px);
    /* font-family: var(--font-family-title); */
    color: var(--font-clair);
    position: absolute;
    bottom:  min(max(2px,0.4vw),3px);
    right: 0;
    background: var(--bg);
}
</style>