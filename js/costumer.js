class Costumer {
    constructor(gameScreen, left, top, width, height, eyes, noses, mouths, imgSrc) {
        this.gameScreen = gameScreen;
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;

        this.eyes = eyes;
        this.noses = noses;
        this.mouths = mouths;
        this.correctEyes = null;
        this.correctNose = null;
        this.correctMouth = null;
        this.selectedEyes = null;
        this.selectedNose = null;
        this.selectedMouth = null;

        this.element = document.createElement("img");
        this.element.src = imgSrc;
        this.element.style.position = "absolute";
        
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
        this.element.style.left = `${left}px`;
        this.element.style.top = `${top}px`;

        this.gameScreen.appendChild(this.element);
    }

    // Randomly display in the first moment the correct parts for the face
    displayRandomFace() {
        const randomEyesIndex = Math.floor(Math.random() * this.eyes.length);
        const randomNoseIndex = Math.floor(Math.random() * this.noses.length);
        const randomMouthIndex = Math.floor(Math.random() * this.mouths.length);

        // Assign random face parts as the correct combination
        this.correctEyes = this.eyes[randomEyesIndex];
        this.correctNose = this.noses[randomNoseIndex];
        this.correctMouth = this.mouths[randomMouthIndex];
    }
    

    // Method to verify if the selected face is correct
    verifyFace() {
        return (
            this.selectedEyes === this.correctEyes.split('/').pop() &&
            this.selectedNose === this.correctNose.split('/').pop() &&
            this.selectedMouth === this.correctMouth.split('/').pop()
        );
    }
}