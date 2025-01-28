class Game {
    constructor() {
        this.startScreen = document.getElementById("game-intro");
        this.gameScreen = document.getElementById("game-screen");
        this.faceElements = document.getElementById("face-elements-container"); //it should be display flex column
        this.gameEndScreen = document.getElementById("game-end");
        this.costumer = new Costumer(
            this.gameScreen,
            400,
            280,
            1200,
            1200,
            ["./images/eyes/blue-eyes.png", "./images/eyes/green-eyes.png", "./images/eyes/red-eyes.png"],
            ["./images/noses/flat_nose.png", "./images/noses/human_nose.png", "./images/noses/yellow_nose.png"],
            ["./images/mouths/mouth_orange_lips.png", "./images/mouths/mouth_tongue.png", "./images/mouths/mouth_with_teeth.png"],
            "./images/costumers/woman-front-shadow.png"
        );
        this.height = 100;
        this.width = 100;
        /* this.score = 0; */
        this.lives = 2;
        this.gameIsOver = false;
        this.intervals = []; // Store intervals for the slot machine rotation

        // Create dynamic img elements for eyes, nose, and mouth
        this.createFaceElements();
    }

    createFaceElements() {
        // Create and append the eye element
        this.eyeElement = document.createElement("img");
        this.eyeElement.id = "eyes";
        this.faceElements.appendChild(this.eyeElement);

        // Create and append the nose element
        this.noseElement = document.createElement("img");
        this.noseElement.id = "nose";
        this.faceElements.appendChild(this.noseElement);

        // Create and append the mouth element
        this.mouthElement = document.createElement("img");
        this.mouthElement.id = "mouth";
        this.faceElements.appendChild(this.mouthElement);
    }

    start() {
        // Set the height and width of the game screen
        this.gameScreen.style.height = `${this.height}vh`;
        this.gameScreen.style.width = `${this.width}vw`;

        // Hide the start screen
        this.startScreen.style.display = "none";

        // Show the game screen
        this.gameScreen.style.display = "block";

        // Start the round
        this.showCorrectFace();
    }

    // Show the correct face to the player at the start (for a few seconds)
    showCorrectFace() {
        this.costumer.displayRandomFace(); // Select random parts of the face for this round

        // Display the correct face
        this.eyeElement.src = this.costumer.correctEyes;
        this.noseElement.src = this.costumer.correctNose;
        this.mouthElement.src = this.costumer.correctMouth;

        // Show the correct combination for a few seconds before starting the rotation
        setTimeout(() => this.startSlotMachine(), 5000); // Start slot machine after "x" seconds
    }

    // Start the slot machine effect (randomly change the images)
    startSlotMachine() {
        this.isPlaying = true;

        // Set intervals to randomly change the images
        this.intervals.push(setInterval(() => {
            // Randomly change each part of the face
            this.eyeElement.src = this.costumer.eyes[Math.floor(Math.random() * this.costumer.eyes.length)];
            this.noseElement.src = this.costumer.noses[Math.floor(Math.random() * this.costumer.noses.length)];
            this.mouthElement.src = this.costumer.mouths[Math.floor(Math.random() * this.costumer.mouths.length)];
        }, 500)); 

        // Listen for spacebar to stop the rotation
        document.addEventListener('keydown', this.stopSlotMachine.bind(this));
    }

    // Stop the slot machine and check if the player selected the correct face
    stopSlotMachine(event) {
        if (event.key === ' ') {
            // Stop all the intervals (stopping the rotation)
            this.intervals.forEach(interval => clearInterval(interval));

            // Check the current images and assign them to the costumer
            this.costumer.chooseEyes(this.costumer.eyes.indexOf(this.eyeElement.src.split('/').pop()));
            this.costumer.chooseNose(this.costumer.noses.indexOf(this.noseElement.src.split('/').pop()));
            this.costumer.chooseMouth(this.costumer.mouths.indexOf(this.mouthElement.src.split('/').pop()));

            // Check if the player selected the correct face
            if (this.costumer.verifyFace()) {
                alert("You won!");
                // Reset game or move to the next level, etc.
            } else {
                alert("You lost! Try again.");
                this.lives -= 1;
                if (this.lives <= 0) {
                    alert("Game Over!");
                    // Restart the game or end it
                } else {
                    alert(`You have ${this.lives} lives remaining.`);
                    // Allow the player to try again
                }
            }

            this.isPlaying = false; // End the game
        }
    }
}