class Game {
    constructor() {
      this.startScreen = document.getElementById("game-intro");
      this.gameScreen = document.getElementById("game-screen");
      this.gameEndScreen = document.getElementById("game-end");
      this.costumer = null;
      this.height = 100;
      this.width = 100;
      /* this.score = 0; */
      this.lives = 2;
      this.gameIsOver = false;
      /* this.gameIntervalId;
      this.gameLoopFrequency = Math.round(1000/60); // 60fps */
    }
  
    start() {
      // Set the height and width of the game screen
      this.gameScreen.style.height = `${this.height}vh`;
      this.gameScreen.style.width = `${this.width}vw`;
  
      // Hide the start screen
      this.startScreen.style.display = "none";
      
      // Show the game screen
      this.gameScreen.style.display = "block";
  
      // Runs the gameLoop on a fequency of 60 times per second. Also stores the ID of the interval.
      /* this.gameIntervalId = setInterval(() => {
        this.gameLoop()
      }, this.gameLoopFrequency) */
    }
  
    /* gameLoop() {
      console.log("in the game loop");
      
      this.update();
  
      // If "gameIsOver" is set to "true" clear the interval to stop the loop
      if (this.gameIsOver) {
        clearInterval(this.gameIntervalId)
      }
    }
  
    update() {
      console.log("in the update");
    } */
  }