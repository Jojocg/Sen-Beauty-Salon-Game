class Game {
    constructor() {
        this.startScreen = document.getElementById("game-intro");
        this.gameScreen = document.getElementById("game-screen");
        this.faceElements = document.getElementById("face-elements-container");
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
        this.lives = 2;
        this.gameIsOver = false;
        this.intervals = []; // Store intervals for the slot machine rotation
        this.currentPart = 'eyes'; // Tracking which part to show next
        this.isSpinning = false; // Tracking if the slot machine is spinning

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

        // Hide the start and end screen
        this.startScreen.style.display = "none";
        this.gameEndScreen.style.display = "none";
        // Show the game screen
        this.gameScreen.style.display = "block";

        this.lives = 2;  // Reset lives
        this.gameIsOver = false; 
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

        // Show the correct combination for 5 seconds before starting the rotation
        setTimeout(() => this.startSlotMachine(), 5000); // Start slot machine after 5 seconds
    }

    // Start the slot machine effect (randomly change the images)
    startSlotMachine() {
        this.isSpinning = true; // Set spinning flag to true

        // Set intervals to randomly change the images
        this.intervals.push(setInterval(() => {
            if (this.isSpinning) { // Only change if it's spinning
                // Randomly change each part of the face
                if (this.currentPart === 'eyes') {
                    this.eyeElement.src = this.costumer.eyes[Math.floor(Math.random() * this.costumer.eyes.length)];
                    this.noseElement.style.display = 'none';
                    this.mouthElement.style.display = 'none';
                } else if (this.currentPart === 'nose') {
                    this.noseElement.src = this.costumer.noses[Math.floor(Math.random() * this.costumer.noses.length)];
                } else if (this.currentPart === 'finishFace') {
                    this.mouthElement.src = this.costumer.mouths[Math.floor(Math.random() * this.costumer.mouths.length)];
                }
            }
        }, 800));

        // Listen for spacebar to stop the rotation and choose the part
        document.addEventListener('keydown', this.stopSlotMachine.bind(this));
    }

    stopSlotMachine(event) {
        if (event.key === ' ' && !this.isCheckingFace) {  // Added condition to prevent multiple checks
            this.isSpinning = false;
            this.intervals.forEach(interval => clearInterval(interval));
    
            // Store the selected parts in the costumer object
            if (this.currentPart === 'eyes') {
                this.costumer.selectedEyes = this.eyeElement.src.split('/').pop();
                this.currentPart = 'nose'; // After eyes, show nose next
    
                // Show the nose, leave eyes visible
                this.noseElement.style.display = 'block';  // Show nose
                this.mouthElement.style.display = 'none';  // Hide mouth
    
                // Restart the randomization for the nose
                this.startSlotMachine(); // Keep randomizing the nose
    
            } else if (this.currentPart === 'nose') {
                this.costumer.selectedNose = this.noseElement.src.split('/').pop();
                this.currentPart = 'mouth'; // After nose, show mouth next
    
                // Show the mouth, leave eyes and nose visible
                this.mouthElement.style.display = 'block'; // Show mouth
    
            } else if (this.currentPart === 'mouth') {
                // Restart the randomization for the mouth
                this.startSlotMachine();
                this.costumer.selectedMouth = this.mouthElement.src.split('/').pop();
    
                this.currentPart = 'finishFace';
    
            } else if (this.currentPart === 'finishFace') {
                // Now all parts are selected, verify the face
                this.isCheckingFace = true;  // Set flag to true to prevent further checks during this round
                this.checkIfCorrectFace();
            }
        }
    }

    // Check if the selected face is correct
    checkIfCorrectFace() {
        if (this.costumer.verifyFace()) {
            alert("You won!");
            
            /* this.showCorrectFace(); */  // Show a new face to continue playing
        } else {
            alert("You lost! Try again.");
            this.lives--;

            const displayLives = document.getElementById("lives");
            displayLives.innerText = `${this.lives}`;

            if (this.lives <= 0) {
                alert("Game Over!");
                this.endGame();
            } else {
                alert(`You have ${this.lives} lives remaining.`);
                this.showCorrectFace();// Allow the player to try again
            }
        }
    }

    endGame() {
        this.gameIsOver = true;
        this.gameScreen.style.display = "none";  // Hide the game screen
        this.gameEndScreen.style.display = "block";  // Show the end game screen
    }
}