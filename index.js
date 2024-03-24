let canvas = document.querySelector("canvas")
let c = canvas.getContext('2d')
let leftbtn = document.getElementById("leftBtn")


canvas.width = innerWidth;
canvas.height = innerHeight;


canvas.addEventListener('touchstart',(event)=>{
    document.getElementById("touch").innerHTML = event
})

let x = 200;
let y = 200;
let radius = 30;
let dx = innerWidth/40;


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    c.beginPath();
    c.arc(x, y, radius, 0, Math.PI*2,false);
    c.fill();
    c.stroke();
}

animate();


addEventListener("keydown",(event)=>{
    console.log(event['code']);
    if (event['code']=='ArrowLeft'||event['code']=="KeyA") {
        x-=dx
    }
    if (event['code']=='ArrowRight') {
        x+=dx
    }
    if (event['code']=='ArrowUp') {
        y-=dx
    }
    if (event['code']=='ArrowDown') {
        y+=dx
    }
    // console.log(x,y)
})
// leftbtn.addEventListener("mousedown",(event)=>{
//     // console.log(x)
//     x++;
// })

document.getElementById("leftBtn").addEventListener("touchstart", function(event) {
    //fires on mouse down
    console.log(true);
    x-=dx;
}, false);
document.getElementById("rightBtn").addEventListener("touchstart", function(event) {
    //fires on mouse down
    x+=dx;
    console.log(true);
}, false);

// function left() {
//     console.log(x);
// }