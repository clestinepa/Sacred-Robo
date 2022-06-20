<script>
        import {undoAction} from '../Functions.svelte';

</script>

<div class=container on:click={undoAction}>
    <svg width="100%" height="82.8%" viewBox="0 0 250 207" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 57C11.1929 57 0 68.1929 0 82C0 95.8071 11.1929 107 25 107H175C188.807 107 200 129.386 200 157C200 184.614 188.807 207 175 207C216.421 207 250 173.421 250 132C250 90.5786 216.421 57 175 57H25Z" fill="var(--normal)" fill-opacity="0.5"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M51.5736 145.64C75.005 169.071 112.995 169.071 136.426 145.64C128.616 153.45 103.289 140.787 79.8578 117.355L44.5025 82.0001L79.8578 46.6447C103.289 23.2133 128.616 10.55 136.426 18.3605C112.995 -5.071 75.005 -5.071 51.5735 18.3605L9.14715 60.7869C-2.56858 72.5026 -2.56858 91.4976 9.14715 103.213L51.5736 145.64Z" fill="var(--normal)"/>
    </svg>
</div>

<style>
    .container {
        height: min(max(15px,3vw),25px);
        width: min(max(15px,3vw),25px);
        cursor: pointer;
        display: flex;
        align-items: center;
    }
</style>