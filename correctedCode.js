let towerA = [1, 2, 3, 4, 5, 6];  // Starting with floors
let towerB = [];
let towerC = [];

function renderTower(towerElement, towerArray) {
  towerElement.innerHTML = ""; // Clear previous rendering
  const towerTitle = document.createElement("h4");
  towerTitle.textContent = towerElement.id;

  // Render each floor
  towerArray.forEach((floor, index) => {
    const floorDiv = document.createElement("div");

    floorDiv.classList.add("floor");
    floorDiv.style.width = floor * 40 + "px"; // Width based on floor value
    floorDiv.style.bottom = index * 32 + "px"; // Stacking floors vertically
    floorDiv.textContent = `Floor ${floor}`; 
    towerElement.appendChild(floorDiv);
  });

  towerElement.appendChild(towerTitle); // Add tower title
}

function moveFloor(fromTower, toTower, fromElement, toElement) {
  // Handle invalid move if no floors to move
  if (fromTower.length === 0) {
    alert('No blocks to move from this tower');
    return;
  }

  const floor = fromTower[0]; // Get topmost floor from the 'fromTower'
  
  // Check if move is valid
  if (toTower.length === 0 || floor < toTower[toTower.length - 1]) {
    toTower.unshift(fromTower.shift()); // Move the floor to 'toTower'
    renderTowers(); // Re-render all towers
  } else {
    alert("Invalid move! You can't place a larger block on a smaller one.");
  }
}

function renderTowers() {
  renderTower(towerAElement, towerA);
  renderTower(towerBElement, towerB);
  renderTower(towerCElement, towerC);
}

function towersOfHanoi() {
  console.log("Starting Towers of Hanoi");

  // Get tower elements by ID
  towerAElement = document.getElementById("towerA");
  towerBElement = document.getElementById("towerB");
  towerCElement = document.getElementById("towerC");

  // Initially render the towers
  renderTowers();

  // Set up event listeners for tower click events
  towerAElement.addEventListener("click", () => moveFloor(towerA, towerB, towerAElement, towerBElement));
  towerBElement.addEventListener("click", () => moveFloor(towerB, towerC, towerBElement, towerCElement));
  towerCElement.addEventListener("click", () => moveFloor(towerC, towerA, towerCElement, towerAElement));
}

// Run when DOM is fully loaded
document.addEventListener("DOMContentLoaded", towersOfHanoi);
