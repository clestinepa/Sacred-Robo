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
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    position: relative;
}

#read {
    color: var(--font-clair);
    position: absolute;
    right: 0;
    background: var(--bg);
}
</style>