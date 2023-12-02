// using Canvas Api

const canvas=document.querySelector('canvas');
const pen=canvas.getContext('2d');
pen.fillStyle='palevioletred';
pen.font='40px sans-serif';

const cS=67;
const width=1175;
const height=530;
let food=null;
let gameOver=false;
let score=0;

const snake={
    in_len : 5,
    direction : 'right',
    cells:[],

    createSnake : function(){
        for(i=0;i<this.in_len;i++){
            this.cells.push({
                x:i,
                y:0
            })
        }
    },
    drawSnake : function(){
        for(let cell of this.cells){
            pen.fillRect(cell.x*cS,cell.y*cS,cS-1,cS-1);
        }
    },
    updateSnake : function(){
        const headX= this.cells[this.cells.length-1].x;
        const headY= this.cells[this.cells.length-1].y;

        let nextX;
        let nextY;

        if(food.x===headX && headY===food.y){
            food=getFood();
            score++;
        }
        else{
            // removing first cell
            this.cells.shift();
        }

        if(this.direction==='down'){
            nextX=headX;
            nextY=headY+1;

            if(nextY*cS>=height){
                pen.fillStyle='green';
                pen.fillText('GAME OVER!!',30,100);
                clearInterval(id);
            }
        }
        else if(this.direction==='up'){
            nextX=headX;
            nextY=headY-1;

            if(nextY*cS<0){
                pen.fillStyle='green';
                pen.fillText('GAME OVER!!',30,100);
                clearInterval(id);
            }
        }
        else if(this.direction==='left'){
            nextX=headX-1;
            nextY=headY;

            if(nextX*cS<0){
                pen.fillStyle='green';
                pen.fillText('GAME OVER!!',30,100);
                clearInterval(id);
            }
        }
        else if(this.direction==='right'){
            nextX=headX+1;
            nextY=headY;

            if(nextX*cS >= width){
                pen.fillStyle='green';
                pen.fillText('GAME OVER!!',30,100);
                clearInterval(id);
            }
        }

        // adding next cell
        this.cells.push({
            x:nextX,
            y:nextY
        })
    }

}

// Initializing the GAME

function init(){
    food=getFood();
    snake.createSnake();

    function keypressed(e){
        if(e.key==='ArrowDown'){
            snake.direction='down';
        }
        else if(e.key==='ArrowUp'){
            snake.direction='up';
        }
        else if(e.key==='ArrowLeft'){
            snake.direction='left';
        }
        if(e.key==='ArrowRight'){
            snake.direction='right';
        }

        console.log(snake.direction);

    }
    document.addEventListener('keydown',keypressed)
}


// Updating properties of the GAME

function update(){
    snake.updateSnake();
}

// Draw something onto canvas

function draw(){
    pen.clearRect(0,0,width,height);
    pen.fillStyle='palevioletred';
    pen.fillText(`Score : ${score}`,30,40);
    pen.fillStyle='blue';
    pen.fillRect(food.x*cS,food.y*cS,cS,cS);
    pen.fillStyle='yellow';
    snake.drawSnake();
}

// Game Loop
function gameLoop(){
    draw();
    update();
}

function getFood(){
    const foodX=Math.round(Math.random()*(width-cS)/cS);
    const foodY=Math.round(Math.random()*(height-cS)/cS);

    food={
        x:foodX,
        y:foodY
    }

    return food;
}

init();
const id=setInterval(gameLoop,100);