let inputDir ={x:0, y:0};
const gameOverSound = new Audio('snakehit.mp3');
const foodSound = new Audio('snakefood.mp3');
const moveSound = new Audio('snakemove.mp3');
let speed = 2;
let score = 0;
let lastPaintTime = 0;
let snakeArr=[
    {x:13, y:15}
]
food = {x: 10, y: 5};

// Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snake){
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            gameOverSound.play();
            return true;
        }   
    }
    if(snake[0].x >= 20 || snake[0].x <=0 || snake[0].y >= 20 || snake[0].y <=0 ){
        gameOverSound.play();
        return true;
    }
    
}

function gameEngine(){
    //update snake and food

    if(isCollide(snakeArr)){
        
        inputDir = {x:0, y:0};
        alert("Game Over! Press any key to play again.");
        snakeArr = [{x:13, y:15}];
        score = 0;
        speed = 2;
        scoreBox.innerHTML = "Score: " + score;
    }

    //snake eat food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score +=1;
        speed +=1;
        scoreBox.innerHTML = "Score: " + score;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            highScoreBox.innerHTML = "High Score: " + hiscoreval;
        }
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 18;
        food = { x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())};
    } 

    // Move sanake
    for (let i = snakeArr.length-2 ; i >=0 ; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //display sanke 
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        
        board.appendChild(snakeElement);
    });

    //display food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


// Main Logic
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    highScoreBox.innerHTML = "High Score: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDir={x:0,y:1} //start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        
        case "ArrowDown":
            
            inputDir.x = 0;
            inputDir.y = 1;
            break;
            
        case "ArrowLeft":
            
            inputDir.x= -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});