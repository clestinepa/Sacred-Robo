<script>
    import { onMount } from 'svelte';
    import Fleche from '../Fleche.svelte';
    import {dragstartComments} from '../../Functions.svelte';
    export let text;
    export let details;

    let visible = false;
    let transition = (details == -1 ? "-0.25em" : "0.25em") ;
    let details_element, autre_element ;
    let color_fleche = "var(--normal)";    

    onMount( () => {
        if (details == -1) {
            details_element = document.getElementById('comment_details');
            autre_element = document.getElementById('comments');
        } else {
            details_element = document.getElementsByClassName('reponse_details');
            autre_element = document.getElementsByClassName('com');
        }

        let sees = document.getElementsByClassName('see');
        for (const see of sees) {
            see.addEventListener("mouseover", function() {color_fleche="var(--highlight)";});
            see.addEventListener("mouseout", function() {color_fleche="var(--normal)";});
        }
    });


    function seeMore() {
        visible = !visible;
        if (details == -1) {
            details_element.style.display = (visible ? 'flex' :  'none');
            autre_element.style.minHeight = (visible ? '200px' :  '0px');
            autre_element.style.minWidth = (visible ? '250px' :  '0px');
            autre_element.style.maxWidth = (visible ? '1000px' :  '0px');

            transition = (visible ? "0.25em" :  "-0.25em") ;
        } else {
            text = (visible ? text.replace("Show", "Hide") : text.replace("Hide", "Show"));
            details_element[details-1].style.display = (visible ? 'flex' :  'none');
            autre_element[details-1].style.borderBottom = (visible ? 'none' :  '1px solid var(--clair)')
            transition = (visible ? "-0.25em" :  "0.25em") ;
        }
    }

</script>

<div class=container><div draggable="true" class=see on:click={seeMore} on:dragstart={e => dragstartComments(e)} style="--transition:{transition};">
    <Fleche direction={visible & details == -1 ? "down2" : !visible & details == -1 ? "up2": visible ? "up2" : "down2"} color={color_fleche}/>
    <div class=text_see>{text}</div>
</div></div>

<style>

.container {
    display: flex;
}
.see {
	display: flex;
	align-items: center;
	color : var(--normal);
    cursor: pointer;
}

.see:hover {
	color: var(--highlight);
    transform: translateY(var(--transition));	
}
</style>