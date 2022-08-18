'use strict'
import * as snake from "./snake.js";

const origScore = 1;
export let score = origScore;
const scoreBoard = document.querySelector(".scoreBoard");
const bodyElement = document.querySelector("body");
const mapSize = parseInt(getComputedStyle(bodyElement).getPropertyValue("--mapSize"));
const worldEntity = document.querySelector(".world");
const gameBoard = document.querySelector(".gameBoard");
const fruit = document.createElement("div");
const fruitStartPos = [19, 19]
const mapCellCount = 
    parseInt(getComputedStyle(document.querySelector('body')).getPropertyValue('--mapCellCount'))

export function worldSetup(){
    scaleWorld();
    window.addEventListener("resize", scaleWorld);
    fruit.classList.add("fruitCell");
    fruit.style.setProperty("--left", fruitStartPos[0]);
    fruit.style.setProperty("--top", fruitStartPos[1]);
    gameBoard.append(fruit);
}

function scaleWorld(){
    let scale;
    scale = Math.min(window.innerWidth, window.innerHeight - 50) / mapSize;       // -50 for safety
    worldEntity.style.width = worldEntity.style.height = `${scale * mapSize}px`;
}

export function updateVariables(){
    let snakeHead = snake.snake[0]
    if (getComputedStyle(snakeHead).getPropertyValue("--left") === getComputedStyle(fruit).getPropertyValue("--left") && 
        getComputedStyle(snakeHead).getPropertyValue("--top") === getComputedStyle(fruit).getPropertyValue("--top")){
            scoreBoard.textContent = scoreBoard.textContent.replace(String(score), String(score+1));
            score += 1;
            changeFruitPosition();
            snake.fruitGathered()
    }
}

export function resetScore(){
    scoreBoard.textContent = scoreBoard.textContent.replace(String(score), String(origScore));
    score = origScore;
}

function changeFruitPosition(){
    let top, left;
    let collideWithSnake = true;
    while (collideWithSnake){
        left = Math.floor(Math.random() * mapCellCount);
        top = Math.floor(Math.random() * mapCellCount);
        collideWithSnake = isCollidingWithSnake(left, top);
    }
    fruit.style.setProperty("--left", left);
    fruit.style.setProperty("--top", top);
}

function isCollidingWithSnake(left, top){
    // or we can gather free spaces and somehow choose random cords from them (i think it could be more stable)
    let cellList = snake.snake;
    for(let cell of cellList){
        if (parseInt(cell.style.getPropertyValue("--left")) === left &&
            parseInt(cell.style.getPropertyValue("--top")) === top){
                return true;
        }
    }
    return false;
}

export function reset (){
    fruit.style.setProperty("--left", fruitStartPos[0]);
    fruit.style.setProperty("--top", fruitStartPos[1]);
}