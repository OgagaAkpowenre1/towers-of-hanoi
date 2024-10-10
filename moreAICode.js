// Tower arrays
// let towerA = [6, 5, 4, 3, 2, 1]; // Start with all blocks on tower A
// let towerB = [];
// let towerC = [];

// // Get references to tower elements
// const towerAElement = document.getElementById('towerA');
// const towerBElement = document.getElementById('towerB');
// const towerCElement = document.getElementById('towerC');

// // Render the towers
// function renderTowers() {
//     renderTower(towerAElement, towerA);
//     renderTower(towerBElement, towerB);
//     renderTower(towerCElement, towerC);
// }

// // Render a single tower's blocks
// function renderTower(towerElement, towerArray) {
//     // Clear the current content
//     towerElement.innerHTML = '';

//     // Render blocks for each value in the tower array
//     towerArray.forEach((block, index) => {
//         const blockDiv = document.createElement('div');
//         blockDiv.classList.add('block');
//         blockDiv.style.width = (block * 20) + 'px';  // Width proportional to block size
//         blockDiv.style.bottom = (index * 32) + 'px';  // Stack the blocks
//         blockDiv.textContent = block;  // Display block value (optional)
//         towerElement.appendChild(blockDiv);
//     });
// }

// // Move a block from one tower to another
// function moveBlock(fromTower, toTower) {
//     if (fromTower.length === 0) {
//         alert("No blocks to move!");
//         return;
//     }

//     const movingBlock = fromTower[fromTower.length - 1];
//     const topBlockOfDestination = toTower[toTower.length - 1];

//     // Check if move is valid
//     if (toTower.length === 0 || movingBlock < topBlockOfDestination) {
//         toTower.push(fromTower.pop());
//         renderTowers();  // Re-render the towers after the move
//     } else {
//         alert("Invalid move! You cannot place a larger block on a smaller block.");
//     }
// }

// // Initial render
// document.addEventListener("DOMContentLoaded", renderTowers);

// // Example: Move interaction (you can improve this part to make it more interactive)
// towerAElement.addEventListener('click', () => moveBlock(towerA, towerB));
// towerBElement.addEventListener('click', () => moveBlock(towerB, towerC));
// towerCElement.addEventListener('click', () => moveBlock(towerC, towerA));
