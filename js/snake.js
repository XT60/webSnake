'use strict'
const gameBoard = document.querySelector(".gameBoard");
const mapCellCount = parseInt(getComputedStyle(document.querySelector('body')).getPropertyValue('--mapCellCount'))
document.querySelector(".moveControls .btnUp").addEventListener('click', moveUp);
document.querySelector(".moveControls .btnDown").addEventListener('click', moveDown);
document.querySelector(".moveControls .btnLeft").addEventListener('click', moveLeft);
document.querySelector(".moveControls .btnRight").addEventListener('click', moveRight);
export const snake = [];
const origMovement = [1, 0];
let previousMovement = [...origMovement];
let movement = [0, 0];
let gatheredFruit = false

window.addEventListener("keydown", updateMovement)

export function snakeSetup(){
    createCellObject();
}

export function fruitGathered(){
    gatheredFruit = true;
}

export function updateVariables(){
    if (gatheredFruit){
        createCellObject()      
    }
    
    if (movement[0] === 0 && movement[1] === 0){
        updatePosition(previousMovement);
    }
    else{
        updatePosition(movement)
        previousMovement = movement
        movement = [0, 0]
    }
    gatheredFruit = false
}

function updatePosition(move){
    let headCell, tailCell
    for( let i = snake.length-1; i > 0; i--){
        headCell = snake[i-1]       // cell closer to head
        tailCell = snake[i]         // cell closer to tail

        tailCell.style.setProperty("--left", getComputedStyle(headCell).getPropertyValue("--left")) 
        tailCell.style.setProperty("--top", getComputedStyle(headCell).getPropertyValue("--top"))
    }
    snake[0].style.setProperty("--left", 
        (parseInt(getComputedStyle(snake[0]).getPropertyValue("--left")) + move[0] + mapCellCount) % mapCellCount)

    snake[0].style.setProperty("--top", 
       (parseInt(getComputedStyle(snake[0]).getPropertyValue("--top")) + move[1] + mapCellCount) % mapCellCount)
}

export function isGameLost(){
    let computedHeadStyle = getComputedStyle(snake[0])
    for( let i = 1; i < snake.length; i++){
        if(computedHeadStyle.getPropertyValue("--left") === getComputedStyle(snake[i]).getPropertyValue("--left") &&
        computedHeadStyle.getPropertyValue("--top") === getComputedStyle(snake[i]).getPropertyValue("--top")){
            return true;
        }
    }
    return false
}

function createCellObject(){
    let newCell = document.createElement("div");
    newCell.classList.add('snakeCell');             // set class attribute
    newCell.style.setProperty("--top", 0);    
    newCell.style.setProperty("--left", 0);               // initialize properties, position doesn't mattter, will be changed later in iteration
    gameBoard.append(newCell);
    snake.push(newCell)
    return newCell
}

export function reset(){
    previousMovement = [...origMovement];
    movement = [...origMovement];
    for(let i = 1; i < snake.length; i++){
        snake[i].remove();
    }
    snake.length = 1;
    snake[0].style.setProperty("--left", (0));
    snake[0].style.setProperty("--top", (0));
}

function updateMovement(event){
    if (movement[0] === 0 && movement[1] === 0){
        switch (event.key){
            case "ArrowDown":
                if (!(previousMovement[1] === -1))      movement[1] = 1;
                break;
            case "ArrowUp":
                if (!(previousMovement[1] === 1))       movement[1] = -1;
                break;
            case "ArrowRight":
                if (!(previousMovement[0] === -1))      movement[0] = 1;
                break;
            case "ArrowLeft":
                if (!(previousMovement[0] === 1))       movement[0] = -1;
                break;
            }
    }
}

function moveUp(){
    if (movement[0] === 0 && movement[1] === 0 && previousMovement[1] !== 1){
        movement[1] = -1;
    }
}

function moveDown(){
    if (movement[0] === 0 && movement[1] === 0 && previousMovement[1] !== -1){
        movement[1] = 1;
    }
}

function moveRight(){
    if (movement[0] === 0 && movement[1] === 0 && previousMovement[0] !== -1){
        movement[0] = 1;
    }
}

function moveLeft(){
    if (movement[0] === 0 && movement[1] === 0 && previousMovement[0] !== 1){
        movement[0] = -1;
    }
}