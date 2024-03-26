let canvas = document.querySelector("canvas")
let c = canvas.getContext('2d')
let leftbtn = document.getElementById("leftBtn")


canvas.width = innerWidth;
canvas.height = innerHeight;
let touch_Pos = innerWidth/2;
let touch_s = 0;
let touch_m = 0;


let x = innerWidth-30;
let y = innerHeight-150;
let radius = 60;
let dx = innerWidth/150;
let left = true;
let right = true


let ballList = [];
let sec = 0;



let score = 0;
let life = 3;
let gameOver = false;



function rR(min,max) {
    return Math.ceil(Math.random()*(max-min+1)+min);
}


function ball() {
    this.ran = rR(0,2);
    if (this.ran >3) {
        this.ran = 3;
    }
    this.x = rR(1,innerWidth);
    this.y = -10*this.ran;
    this.radius = 20;
    this.dy = 1;

    this.draw = ()=>{
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fillStyle = `rgba(255, 166, 0)`
        c.fill()
        c.strokeStyle = `rgba(255, 166, 0)`
        c.stroke();
    }

    this.update = ()=>{
        this.y += this.dy;
        this.draw();
    }

}
function animate() {
    requestAnimationFrame(animate);
    if (!gameOver) {
        c.clearRect(0,0,innerWidth,innerHeight);
        
        const date = new Date();
        if (-3>=date.getSeconds()-sec||date.getSeconds()-sec >=3) {
            // console.log(date.getSeconds()-x)
            // for (let i = 0; i < 10; i++) {
            ballList.push(new ball())    
            // }
            sec = date.getSeconds();        
            
        }
    
        for (let i = 0; i < ballList.length; i++) {
            if (i==0) {
                continue;
            }
            const element = ballList[i];
            element.update();
            if (x-radius<=element.x&&element.x<=x+radius&&y-element.radius<=element.y&&element.y<=y+element.radius) {
                ballList.splice(i,i)
                score++;
                document.getElementById("Score").innerHTML = "Score: "+score;
            }
            if (element.y>=innerHeight-60-element.radius) {
                life--;
                ballList.splice(i,i)
                document.getElementById("Life").innerHTML = "Life: "+life;
                if(life<=0){
                    gameOver = true;
                }
                
            }
        }
    
        c.beginPath();
        c.arc(x, y, radius, Math.PI*2, Math.PI,false);
        c.fillStyle = "orange"
        c.fill();
    
        c.stroke();
    
        c.beginPath()
        c.rect(0,innerHeight-60,innerWidth,60);
        c.fillStyle = "red";
        c.fill()
        c.stroke
        if (x-radius<=0) {
            x = radius;
        }
        if (x+radius>=innerWidth){
            x = innerWidth-radius;
        }
        if (left){
            x-=dx;
        }
        if (right) {
            x+=dx
        }
    }
    if (gameOver) {
        document.getElementById("GameOver").style.visibility = "visible"
    }
}

animate();


addEventListener("keydown",(event)=>{
    console.log(event['code']);
    if (event['code']=='ArrowLeft'||event['code']=="KeyA") {
        left = true;
    }   
    if (event['code']=='ArrowRight' ||event['code']=="KeyD") {
        right = true;
    }
    // console.log(x,y)
})
addEventListener("keyup",(event)=>{
    console.log(event['code']);
    if (event['code']=='ArrowLeft'||event['code']=="KeyA") {
        left = false;
    }
    if (event['code']=='ArrowRight'||event['code']=="KeyD") {
        right = false;
    }
})

function touch_move(event) {
    touch_m = event.touches[0].clientX;
    document.getElementById("touch").innerHTML = touch_Pos;
    // touch_Pos = touch_m-touch_s;
    // x = touch_Pos
    
}

window.addEventListener("touchstart",(event)=>{
    touch_s = event.touches[0].clientX;
    
})