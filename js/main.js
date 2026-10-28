
 // GLOBAL DOM ELEMENTS

 const startScreenNode = document.querySelector("#start-screen");
 const gameScreenNode = document.querySelector("#game-screen");
 const gameOverScreenNode = document.querySelector("#game-over-screen");
 const startBtnNode = document.querySelector("#start-btn");
 const gameBoxNode = document.querySelector("#game-box");
 const restartBtnNode = document.querySelector("#restart-btn");
 const mainmenuBtnNode = document.querySelector("#main-menu-btn");
 const coinCounterNode = document.querySelector("#coin-counter");
 
 // GLOBAL GAME VARIABLES
 
 let playerObj = null;
 
 let redshellArr = [];
 let brownboxArr = [];
 
 let boxesCollected = 0;
 
 let mainIntervalId = null;
 let redshellIntervalId = null;
 let brownBoxIntervalId = null;
 
 // GLOBAL GAME FUNCTIONS
 
 function gameStart() {
     startScreenNode.style.display = "none";
     gameOverScreenNode.style.display = "none";
     gameScreenNode.style.display = "flex";
 
     boxesCollected = 0;
     coinCounterNode.textContent = `BOXES COLLECTED: ${boxesCollected}`;
 
     addPlayer();
     addRedShell();
     addBrownBox();
 
     mainIntervalId = setInterval(gameloop, Math.round(1000 / 60));
     redshellIntervalId = setInterval(addRedShell, 3500);
     brownBoxIntervalId = setInterval(addBrownBox, 3000);
 }
 
 // CREATE GAME OBJECTS
 
 function addPlayer() {
     playerObj = new NotMario();
 }
 
 function addRedShell() {
     let newRedShell = new RedShell();
     redshellArr.push(newRedShell);
 }
 
 function addBrownBox() {
    let newBrownBox = new BrownBox(
        gameBoxNode.clientWidth,
        100
    );

    brownboxArr.push(newBrownBox);
}
 
 // MAIN GAME LOOP
 
 function gameloop() {
     redshellArr.forEach((redshell) => {
         redshell.automaticMovement();
     });
 
     brownboxArr.forEach((brownbox) => {
         brownbox.automaticMovement();
     });
 
     checkRedShellDespawn();
     checkBrownBoxDespawn();
 
     checkCollisionPlayerRedShell();
     checkCollisionPlayerBrownBox();
 }
 
 // REMOVE OBJECTS THAT LEAVE THE GAME
 
 function checkRedShellDespawn() {
     if (redshellArr[0] && redshellArr[0].x < -100) {
         redshellArr[0].node.remove();
         redshellArr.shift();
     }
 }
 
 function checkBrownBoxDespawn() {
    if (brownboxArr[0] && brownboxArr[0].x < -100) {
        brownboxArr[0].node.remove();
        brownboxArr.shift();
    }
}
 
 // COLLISION DETECTION
 
 function checkCollision(element1, element2) {
     return (
         element1.x < element2.x + element2.width &&
         element1.x + element1.width > element2.x &&
         element1.y < element2.y + element2.height &&
         element1.y + element1.height > element2.y
     );
 }
 
 function checkCollisionPlayerRedShell() {
     redshellArr.forEach((redshell) => {
         if (checkCollision(playerObj, redshell)) {
             gameOver();
         }
     });
 }
 
 function checkCollisionPlayerBrownBox() {
     brownboxArr.forEach((brownbox, index) => {
         if (checkCollision(playerObj, brownbox)) {
             brownbox.node.remove();
             brownboxArr.splice(index, 1);
 
             boxesCollected++;
             coinCounterNode.textContent = `BOXES COLLECTED: ${boxesCollected}`;
         }
     });
 }
 
 // GAME OVER
 
 function gameOver() {
     clearInterval(mainIntervalId);
     clearInterval(redshellIntervalId);
     clearTimeout(brownBoxIntervalId);
 
     gameScreenNode.style.display = "none";
     gameOverScreenNode.style.display = "flex";
 }
 
 // RESTART GAME
 
 function gameRestart() {
     clearInterval(mainIntervalId);
     clearInterval(redshellIntervalId);
     clearTimeout(brownBoxIntervalId);
 
     gameBoxNode.querySelectorAll(
         ".notmarioplayer, .redshell, .brownbox"
     ).forEach((element) => {
         element.remove();
     });
 
     redshellArr = [];
     brownboxArr = [];
     playerObj = null;
 
     gameStart();
 }
 
 // RETURN TO MAIN MENU
 
 function screenStartOver() {
     clearInterval(mainIntervalId);
     clearInterval(redshellIntervalId);
     clearTimeout(brownBoxIntervalId);
 
     window.location.reload();
 }
 
 // EVENT LISTENERS
 
 startBtnNode.addEventListener("click", gameStart);
 restartBtnNode.addEventListener("click", gameRestart);
 mainmenuBtnNode.addEventListener("click", screenStartOver);
 
 // PLAYER JUMP
 
 window.addEventListener("keyup", (event) => {
     if (event.code === "Space") {
         if (
             playerObj &&
             !playerObj.isJumping &&
             gameScreenNode.style.display === "flex"
         ) {
             playerObj.isJumping = true;
 
             let jumpUp = setInterval(() => {
                 playerObj.moveUp();
             }, 18);
 
             setTimeout(() => {
                 clearInterval(jumpUp);
 
                 let jumpDown = setInterval(() => {
                     playerObj.moveDown();
                 }, 18);
 
                 setTimeout(() => {
                     clearInterval(jumpDown);
 
                     playerObj.y = 383;
                     playerObj.node.style.top = `${playerObj.y}px`;
                     playerObj.isJumping = false;
                 }, 600);
             }, 300);
         }
     }
 });