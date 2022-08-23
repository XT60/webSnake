'use strict'
import * as world from "./world.js";        // for the execution ??
import * as snake from "./snake.js";

const startMessage = document.querySelector(".startMessage");
const endMessageDiv = document.querySelector(".endMessage");
const endMessageText = document.querySelector(".endMessage p");
const endRestartButton = document.querySelector(".endMessage button");
const origFspValue = 10;
const maxFpsValue  = 40;

let fps = 15;
let fpsIncrementSpeed = 0.02;
let tickLength = 1/fps * 1000;            // in miliseconds

let lastTime = 0;
let delta;
let inGame = false;

endRestartButton.addEventListener("click", restartGame);
window.addEventListener("keydown", startGame)
document.querySelector(".moveControls .btnUp").addEventListener('click', startGame);
document.querySelector(".moveControls .btnDown").addEventListener('click', startGame);
document.querySelector(".moveControls .btnLeft").addEventListener('click', startGame);
document.querySelector(".moveControls .btnRight").addEventListener('click', startGame);
world.worldSetup()
snake.snakeSetup()

function updateVariables(timeStamp){
    delta = timeStamp - lastTime;           // in miliseconds
    if (delta >= tickLength){
        snake.updateVariables()
        world.updateVariables()
        updateTickLength()
        lastTime = timeStamp
    }
    if (snake.isGameLost()) {
        endMessageText.innerHTML = "You lost! Your score was: " + String(world.score);
        endMessageDiv.style.setProperty("display", "block");
    }
    else{
        requestAnimationFrame(updateVariables);
    }
}

function startGame(){
    if (!inGame){
        window.requestAnimationFrame(updateVariables);
        resetFps();
        inGame = true;
        startMessage.style.setProperty("display", "none");
    }
}

function restartGame(){
    world.reset();
    snake.reset();
    world.resetScore();
    resetFps();
    requestAnimationFrame(updateVariables);
    endMessageDiv.style.setProperty("display", "none");
}

function updateTickLength(){
    fps += fpsIncrementSpeed;
    if (fps > maxFpsValue){
        fps = maxFpsValue;
    }
    else{
        tickLength = 1/fps * 1000;
    }
}

function resetFps(){
    fps = origFspValue;
    tickLength = 1/fps * 1000;
}
