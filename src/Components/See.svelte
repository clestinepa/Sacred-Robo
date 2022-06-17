<script>
    import { onMount } from 'svelte';
    import Fleche from './Fleche.svelte';

    export let text;
    export let details;

    let visible = false;
    let transition = (details == -1 ? "-0.25em" : "0.25em") ;
    let details_element, autre_element ;

    onMount( () => {
        if (details == -1) {
            details_element = document.getElementById('comment_details');
            autre_element = document.getElementById('comments');
        } else {
            details_element = document.getElementsByClassName('reponse_details');
            autre_element = document.getElementsByClassName('com');
        }
    
    });


    function seeMore() {
        visible = !visible;
        if (details == -1) {
            details_element.style.display = (visible ? 'flex' :  'none');
            autre_element.style.minHeight = (visible ? '200px' :  '67px');
            transition = (visible ? "0.25em" :  "-0.25em") ;
        } else {
            text = (visible ? text.replace("Show", "Hide") : text.replace("Hide", "Show"));
            details_element[details].style.display = (visible ? 'flex' :  'none');
            autre_element[details].style.borderBottom = (visible ? 'none' :  '1px solid var(--clair)')
            transition = (visible ? "-0.25em" :  "0.25em") ;
        }
    }
</script>

<div class=see on:click={seeMore} style="--transition:{transition};">
    <Fleche direction={visible & details == -1 ? "down2" : !visible & details == -1 ? "up2": visible ? "up2" : "down2"} />
    <div class=text>{text}</div>
</div>

<style>
.see {
	display: flex;
	align-items: center;
	gap: 10px;
	color : var(--normal);
    cursor: pointer;
}

.see:hover {
	color: var(--highlight);
    transform: translateY(var(--transition));	
}
</style>