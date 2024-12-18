class TowerOfHanoi {
  constructor(startingTower = "A", numFloors = 3) {
    this.towerA =
      startingTower === "A"
        ? Array.from({ length: numFloors }, (_, i) => i + 1)
        : [];
    this.towerB =
      startingTower === "B"
        ? Array.from({ length: numFloors }, (_, i) => i + 1)
        : [];
    this.towerC =
      startingTower === "C"
        ? Array.from({ length: numFloors }, (_, i) => i + 1)
        : [];
    this.startingTower = [this.towerA, this.towerB, this.towerC].find(
      (tower) => tower.length > 0
    );
    this.selectedFromTower = null;
    this.selectedToTower = null;
    this.gameWon = false;

    this.initializeGame();
  }

  initializeGame() {
    this.canvas = document.getElementById("game");
    this.replayBtn = document.getElementById("replay");

    this.jsConfetti = new JSConfetti(this.canvas);

    this.towerAElement = document.getElementById("towerA");
    this.towerBElement = document.getElementById("towerB");
    this.towerCElement = document.getElementById("towerC");

    this.renderTowers(); // Initial render
    console.log(this.startingTower);
    // Set up event listeners
    this.towerAElement.addEventListener("click", () =>
      this.selectTower(this.towerA, this.towerAElement)
    );
    this.towerBElement.addEventListener("click", () =>
      this.selectTower(this.towerB, this.towerBElement)
    );
    this.towerCElement.addEventListener("click", () =>
      this.selectTower(this.towerC, this.towerCElement)
    );
    this.replayBtn.addEventListener("click", () => this.replay());
  }

  replay() {
    this.gameWon = false;
    this.towerA = [];
    this.towerB = [];
    this.towerC = [];
    this.selectedFromTower = null;
    this.selectedToTower = null;

    // Reassign the DOM references
    this.towerAElement = document.getElementById("towerA");
    this.towerBElement = document.getElementById("towerB");
    this.towerCElement = document.getElementById("towerC");

    // Clear the game area
    this.towerAElement.innerHTML = "";
    this.towerBElement.innerHTML = "";
    this.towerCElement.innerHTML = "";

    // Show the modal for user input
    const modal = document.getElementById("game-setup-modal");
    modal.style.display = "flex";
  }

  // Method to render a single tower
  renderTower(towerElement, towerArray) {
    towerElement.innerHTML = "";
    const towerTitle = document.createElement("h4");
    towerTitle.textContent = towerElement.id;

    //calc max width of container
    const maxFloorWidth = Math.max(
      ...towerArray.map((floor) => floor * 40),
      100
    ); // Default to 100px minimum width
    towerElement.style.width = `${maxFloorWidth + 20}px`; // Add some padding for aesthetics

    towerArray
      .slice()
      .reverse()
      .forEach((floor, index) => {
        const floorDiv = document.createElement("div");
        floorDiv.classList.add("floor");
        floorDiv.style.width = floor * 40 + "px";
        floorDiv.style.bottom = `${index * 32}px`;
        // floorDiv.textContent = `Floor ${floor}`;
        floorDiv.style.position = "absolute"; // Ensure stacking works
        towerElement.appendChild(floorDiv);
      });

    towerElement.appendChild(towerTitle);
  }

  //Method to reset tower selection
  resetSelection() {
    // console.log("Resetting selection");
    if (this.selectedFromTower) {
      // console.log("Tower to reset", this.selectedFromTower.towerElement)
      this.selectedFromTower.towerElement.firstChild.style.border = "none";
    }
    this.selectedFromTower = null;
    this.selectedToTower = null;
  }

  // Method to render all towers
  renderTowers() {
    this.renderTower(this.towerAElement, this.towerA);
    this.renderTower(this.towerBElement, this.towerB);
    this.renderTower(this.towerCElement, this.towerC);
    this.checkGameWon();
  }

  checkGameWon() {
    // if (this.towerB.length === 3 || this.towerC.length === 3) {
    //   this.gameWon = true;
    //   this.winningMessage();
    // }
    // console.log(this.gameWon);

    // Towers that aren't the starting tower
    const targetTowers = [this.towerA, this.towerB, this.towerC].filter(
      (tower) => tower !== this.startingTower
    );

    console.log(targetTowers);

    const numFloors =
      this.towerA.length + this.towerB.length + this.towerC.length;

    // Check if any of the target towers have all floors
    if (targetTowers.some((tower) => tower.length === numFloors)) {
      this.gameWon = true;
      this.winningMessage();
    }
    console.log(`Game won: ${this.gameWon}`);
  }

  // Logic to select a tower
  selectTower(towerArray, towerElement) {
    if (!this.selectedFromTower) {
      this.selectedFromTower = { towerArray, towerElement };
      // towerElement.firstChild.style.border = "2px solid red"; // Highlight selection

      // Highlight the topmost floor
      if (towerArray.length > 0) {
        const topFloorIndex = towerArray.length - 1;
        const topFloor = towerElement.children[topFloorIndex];
        topFloor.style.border = "2px solid red";
      }

      console.log(`Selected from tower: ${towerElement.id}`);
    } else if (!this.selectedToTower) {
      this.selectedToTower = { towerArray, towerElement };
      console.log(`Selected to tower: ${towerElement.id}`);

      // Reset border highlight
      // this.selectedFromTower.towerElement.style.border = "none";
      if (this.selectedFromTower.towerArray.length > 0) {
        const topFloorIndex = this.selectedFromTower.towerArray.length - 1;
        const topFloor =
          this.selectedFromTower.towerElement.children[topFloorIndex];
        topFloor.style.border = "none";
      }

      this.moveFloor(
        this.selectedFromTower.towerArray,
        this.selectedToTower.towerArray
      );

      this.selectedFromTower = null;
      this.selectedToTower = null;
    }
  }

  // Method to move floors
  moveFloor(fromTower, toTower) {
    if (fromTower === toTower) {
      this.showToast("Cannot move a block to the same tower.");
      this.resetSelection();
      return;
    }

    if (fromTower.length === 0) {
      this.showToast("No blocks to move");
      this.resetSelection();
      return;
    }

    let floor = fromTower[0];
    if (toTower.length === 0 || floor < toTower[0]) {
      toTower.unshift(floor);
      fromTower.shift();
      this.renderTowers();
    } else {
      this.showToast(
        "Invalid move: can't place a larger block on a smaller one."
      );
      this.resetSelection();
    }
  }

  showToast(error) {
    const toastElement = document.getElementById("errorToast");
    toastElement.textContent = error;
    toastElement.classList.add("toast-show");

    // Auto-hide the toast after 3 seconds
    setTimeout(() => {
      toastElement.classList.remove("toast-show");
    }, 3000);
  }

  winningMessage() {
    this.showToast("You won!");
    this.jsConfetti.addConfetti();
  }
}

// When the DOM is ready, initialize the game
document.addEventListener("DOMContentLoaded", () => {
  const menuicon = document.getElementById("menu-icon");
  const sidebar = document.getElementById("sidebar");
  let menuOpen = true;

  const modal = document.getElementById("game-setup-modal");
  const form = document.getElementById("game-setup-form");

  // Show the modal on page load
  modal.style.display = "flex";

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get user input
    const startingTower = document.getElementById("starting-tower").value;
    const numFloors = parseInt(document.getElementById("num-floors").value, 10);

    // Clear old instance (if any) by re-initializing game container
    const gameContainer = document.getElementById("game");
    gameContainer.innerHTML = `
    <div class="tower" id="towerA"></div>
    <div class="tower" id="towerB"></div>
    <div class="tower" id="towerC"></div>
  `;

    // Initialize the game with user input
    new TowerOfHanoi(startingTower, numFloors);

    // Hide the modal
    modal.style.display = "none";
  });

  menuicon.addEventListener("click", () => {
    console.log(menuOpen);
    console.log(window.getComputedStyle(sidebar).width);
    if (menuOpen) {
      sidebar.style.width = "0px";
      sidebar.style.padding = "0px";
      sidebar.style.border = "0px";
      menuOpen = false;
    } else {
      sidebar.style.width = "200px";
      sidebar.style.padding = "";
      sidebar.style.border = "";
      menuOpen = true;
    }
  });
});
