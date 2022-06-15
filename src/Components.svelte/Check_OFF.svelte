<div class=container>
    <div class=cross></div>
</div>

<style>
.container {
      width: 16px;
      height: 13px;
      overflow:hidden;
}


.cross {
    width: 100%;
    height: 100%;
    position: relative;
}

.cross::before, .cross::after {
    position: absolute;
    display: block;
    content:'';
    width: 130%;
    height: 16%;
    top: 42%;
    left: -15%;
} 

.cross::before {
    transform: rotate(45deg);
}

.cross::after {
    transform: rotate(-45deg);
} 
</style>