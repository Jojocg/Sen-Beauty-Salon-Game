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
        // Set up the default element's property values
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
    // Methods to choose the parts of the face
    chooseEyes(index) {
        this.selectedEyes = this.eyes[index];
    }

    chooseNose(index) {
        this.selectedNose = this.noses[index];
    }

    chooseMouth(index) {
        this.selectedMouth = this.mouths[index];
    }

    /* // Method to display the selected face on the screen
    displayFace() {
        console.log(`Costumer face:`);
        console.log(`Eyes: ${this.selectedEyes}`);
        console.log(`Nose: ${this.selectedNose}`);
        console.log(`Mouth: ${this.selectedMouth}`);
    } */

    // Method to verify if the selected face is correct
    verifyFace() {
        return (
            this.selectedEyes === this.correctEyes && // The first option is the correct one (you can randomize it if you want)
            this.selectedNose === this.correctNose &&
            this.selectedMouth === this.correctMouth
        );
    }
}