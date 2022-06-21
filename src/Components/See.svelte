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
            details_element[details-1].style.display = (visible ? 'flex' :  'none');
            autre_element[details-1].style.borderBottom = (visible ? 'none' :  '1px solid var(--clair)')
            transition = (visible ? "-0.25em" :  "0.25em") ;
        }
    }

    let color_fleche = "var(--normal)";

    onMount( () => {
        let sees = document.getElementsByClassName('see');
        for (const see of sees) {
            see.addEventListener("mouseover", function() {color_fleche="var(--highlight)";});
            see.addEventListener("mouseout", function() {color_fleche="var(--normal)";});
        }
    });
    
</script>

<div class=see on:click={seeMore} style="--transition:{transition};">
    <Fleche direction={visible & details == -1 ? "down2" : !visible & details == -1 ? "up2": visible ? "up2" : "down2"} color={color_fleche}/>
    <div class=text>{text}</div>
</div>

<style>
.see {
	display: flex;
	align-items: center;
	gap:  min(max(5px,1vw), 10px);
	color : var(--normal);
    cursor: pointer;
}

.see:hover {
	color: var(--highlight);
    transform: translateY(var(--transition));	
}

.text {
    font-size : min(max(12.5px,2.5vw),18px);
}
</style>