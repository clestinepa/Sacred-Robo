<script>
    import {settings, switchOn} from '../../stores.js';
    import {switch_score} from '../../Functions.svelte';

    let  color1,  color2;
    $:  if ($switchOn) {
            color1= $settings.team1_color.value[1];
            color2= $settings.team0_color.value[1];
        } else {
            color1= $settings.team0_color.value[1];
            color2= $settings.team1_color.value[1];
        }
</script>
<div class=Felche_Switch_container style='--color1:{color1}; --color2:{color2};' on:click={switch_score}>
    <svg width="100%" height="98.4" viewBox="0 0 250 246" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 83C0 69.1929 11.1929 58 25 58H225C238.807 58 250 69.1929 250 83C250 96.8071 238.807 108 225 108H25C11.1929 108 0 96.8071 0 83Z" fill="rgba(var(--color1),0.5)"/>
        <path d="M218.569 108L163.497 52.9289C140.066 29.4975 117.905 13.6683 114 17.5736C125.716 5.85786 141.071 0 156.426 0C171.782 0 187.137 5.85786 198.853 17.5736L241.279 60C246.629 65.3501 249.536 72.2182 250 79.2179V83C250 83.0744 250 83.1488 249.999 83.2231C249.632 88.7181 247.76 94.1315 244.382 98.7923C239.797 104.412 232.818 108 225 108H218.569Z" fill="rgba(var(--color1), 1)"/>
        <path d="M250 163C250 176.807 238.807 188 225 188L25 188C11.1929 188 -8.76416e-07 176.807 3.30641e-07 163C1.5377e-06 149.193 11.1929 138 25 138L225 138C238.807 138 250 149.193 250 163Z" fill="rgba(var(--color2),0.5)"/>
        <path d="M31.4315 138L86.5025 193.071C109.934 216.503 132.095 232.332 136 228.426C124.284 240.142 108.929 246 93.5736 246C78.2182 246 62.8629 240.142 51.1472 228.426L8.72078 186C3.37067 180.65 0.463744 173.782 0 166.782L3.30641e-07 163C3.37149e-07 162.926 0.000320778 162.851 0.000976913 162.777C0.367722 157.282 2.24025 151.869 5.6185 147.208C10.2028 141.588 17.1823 138 25 138L31.4315 138Z" fill="rgba(var(--color2),1)"/>
    </svg>  
</div>



<style>
    .Felche_Switch_container {
	    cursor: pointer;
        display: flex;
        align-items: center;
    }
</style>