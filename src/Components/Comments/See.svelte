<script>
    import { onMount } from 'svelte';
    import Fleche from '../Fleche.svelte';
    import {dragstartComments} from '../../Functions.svelte';
    export let text;
    export let type_details;

    let visible = false;
    let transition = (type_details == -1 ? "-0.25em" : "0.25em") ;
    let color_fleche = "var(--normal)";    

    let details, container, resize_com_zone ;
    onMount( () => {
        if (type_details == -1) {
            details = document.getElementById('comment_details');
            container = document.getElementById('comments');
            resize_com_zone = document.getElementById('resize_com_zone');
        } else {
            details = document.getElementsByClassName('reponse_details');
            container = document.getElementsByClassName('com');
        }

        let sees = document.getElementsByClassName('see');
        for (const see of sees) {
            see.addEventListener("mouseover", function() {color_fleche="var(--highlight)";});
            see.addEventListener("mouseout", function() {color_fleche="var(--normal)";});
        }
    });


    function seeMore() {
        visible = !visible;
        if (type_details == -1) {
            container.style.display = (visible ? 'flex' :  'table');
            details.style.display = (visible ? 'flex' :  'none');
            container.style.minHeight = (visible ? '200px' :  '0px');
            resize_com_zone.style.cursor = (visible ? 'row-resize' : 'default');
            transition = (visible ? "0.25em" :  "-0.25em") ;
        } else {
            text = (visible ? text.replace("Show", "Hide") : text.replace("Hide", "Show"));
            details[type_details-1].style.display = (visible ? 'flex' :  'none');
            container[type_details-1].style.borderBottom = (visible ? 'none' :  '1px solid var(--clair)')
            transition = (visible ? "-0.25em" :  "0.25em") ;
        }
    }

</script>

<!-- <div class=container><div draggable={type_details == -1 ? true : false} class=see on:click={seeMore} on:dragstart={e => dragstartComments(e)} style="--transition:{transition};"> -->
<div class=container><div class=see on:click={seeMore} on:dragstart={e => dragstartComments(e)} style="--transition:{transition};">
    <Fleche direction={visible & type_details == -1 ? "down2" : !visible & type_details == -1 ? "up2": visible ? "up2" : "down2"} color={color_fleche}/>
    <p class=text_see>{text}</p>
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