window.onload = function () {
    const startButton = document.getElementById("start-button");
    const restartButton = document.querySelector(".restart-button");
    let game;

    startButton.addEventListener("click", function () {
        startGame();
    });

    function startGame() {
        console.log("start game");
        game = new Game();

        game.start();
    }

    restartButton.addEventListener("click", function () {
        restartGame();
    });

    function restartGame() {
        location.reload();
    }

    const stopSlotMachine = (event) => {
        /* console.log(event); */
        
        if (event.key === ' ' && !game.isCheckingFace) {  // Added condition (game.isCheckingFace) to prevent multiple checks
            game.isSpinning = false;
            game.intervals.forEach(interval => clearInterval(interval));

            // Store the selected parts in the costumer object
            if (game.currentPart === 'eyes') {
                game.costumer.selectedEyes = game.eyeElement.src.split('/').pop();
                game.currentPart = 'nose'; // After eyes, show nose next

                // Show the nose, leave eyes visible
                game.noseElement.style.display = 'block';  // Show nose
                game.mouthElement.style.display = 'none';  // Hide mouth

                // Restart the randomization for the nose
                game.startSlotMachine(); // Keep randomizing the nose

            } else if (game.currentPart === 'nose') {
                game.costumer.selectedNose = game.noseElement.src.split('/').pop();
                game.currentPart = 'mouth'; // After nose, show mouth next

                // Show the mouth, leave eyes and nose visible
                game.mouthElement.style.display = 'block'; // Show mouth

                game.startSlotMachine();

            } else if (game.currentPart === 'mouth') {
                // Restart the randomization for the mouth
                game.startSlotMachine();
                game.costumer.selectedMouth = game.mouthElement.src.split('/').pop();

                game.currentPart = 'finishFace';

            } else if (game.currentPart === 'finishFace') {
                // Now all parts are selected, verify the face
                game.isCheckingFace = true;  // Set flag to true to prevent further checks during game round
                game.checkIfCorrectFace();
            }
        }
    }

    document.addEventListener('keydown', stopSlotMachine);
};