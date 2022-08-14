'use strict'
import * as world from "./world.js";        // for the execution ??
import * as snake from "./snake.js";


let fps = parseFloat(getComputedStyle(document.querySelector("body")).getPropertyValue("--fps"));
let fpsIncrementSpeed = 0.02;
const bodyElement = document.querySelector("body") 
let tickLength = 1/fps * 1000;            // in miliseconds
const scoreBoard = document.querySelector(".scoreBoard")

let lastTime = 0;
let delta;

world.worldSetup()
snake.snakeSetup()
window.requestAnimationFrame(updateVariables);

function updateVariables(timeStamp){
    delta = timeStamp - lastTime;           // in miliseconds
    if (delta >= tickLength){
        snake.updateVariables()
        world.updateVariables()
        updateScore()
        updateTickLength()
        lastTime = timeStamp
    }
    if (snake.isGameLost()) {
        let score = parseInt(getComputedStyle(bodyElement).getPropertyValue("--score"));
        if (score < 10){
            window.alert("Are you joking??? My dog can do better than that... and you know the thing is he has been dead for 2 years now.") 
        }
        else{
            window.alert("You Lost SUCKER !!! You got as little as: "  + 
                getComputedStyle(bodyElement).getPropertyValue("--score") + "points, hahahha dumb piece of shit !!!");
        }
        world.reset()
        snake.reset()
        resetScore()
        resetTickLength()
    }
    requestAnimationFrame(updateVariables);
}


function updateScore(){
    let shownScore = parseInt(scoreBoard.textContent.slice(7));
    let currScore = parseInt(getComputedStyle(bodyElement).getPropertyValue("--score"));
    if (shownScore !== currScore){
        scoreBoard.textContent = scoreBoard.textContent.replace(String(shownScore), String(currScore))
    }
}

function resetScore(){
    bodyElement.style.setProperty("--score", 1);
    updateScore();
}

function updateTickLength(){
    fps += fpsIncrementSpeed;
    tickLength = 1/fps * 1000;
}

function resetTickLength(){
    tickLength = 1/fps * 1000;
}