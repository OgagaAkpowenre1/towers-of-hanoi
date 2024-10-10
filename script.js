//Towers are generated
let towerA = [1, 2, 3, 4, 5, 6];
let towerB = [];
let towerC = [];

let selectedFromTower = null
let selectedToTower = null



function renderTower(towerElement, towerArray) {
  
  towerElement.innerHTML = "";
  const towerTitle = document.createElement("h4");
  towerTitle.textContent = towerElement.id;

  towerArray.forEach((floor, index) => {
    const floorDiv = document.createElement("div");

    floorDiv.classList.add("floor");
    floorDiv.style.width = floor * 40 + "px";
    floorDiv.style.bottom = index * 32 + "px";
    floorDiv.textContent = `Floor ${floor}`; 
    towerElement.appendChild(floorDiv);
  });
  towerElement.appendChild(towerTitle)
  console.log(towerElement.id)
}

function moveFloor(fromTower, toTower){
  //onclick select topmost floor (take frontmost element in array)
  //onclick select new tower (choose new tower array)
  //if selected element is less than frontmost element of new array shift it to front
  //else invalid move
  //render towers

  if(fromTower.length === 0){
    alert('No blocks to move')
    return
  }

  let floor = fromTower.shift()
  if(toTower.length === 0 || floor < toTower[0]){
    toTower.unshift(floor)
    renderTowers()
  } else {
    alert("Invalid move")
  }


  selectedFromTower = null
  selectedToTower = null
}

function selectTower(towerArray, towerElement){
  if(!selectedFromTower){
    selectedFromTower = {towerArray, towerElement}
    console.log(`Selected from tower from ${towerElement.id}`)
  } else if(!selectedToTower){
    selectedToTower = {towerArray, towerElement}
    console.log(`Selected to tower from ${towerElement.id}`)
  }

  moveFloor(selectedFromTower.towerArray, selectedToTower.towerArray)
}

function renderTowers(){
  renderTower(towerAElement, towerA)
  renderTower(towerBElement, towerB)
  renderTower(towerCElement, towerC)
}

function towersOfHanoi() {
  //create a tower
  //allow movement of blocks from one tower to another
  //blocks cannot be moved if larger than block they are to be placed upon
  console.log("let's get cracking");

  towerAElement = document.getElementById("towerA");
  towerBElement = document.getElementById("towerB");
  towerCElement = document.getElementById("towerC");
  gameElement = document.getElementsByClassName("game")

  renderTowers()

  towerAElement.addEventListener('click', () => selectTower(towerA, towerAElement))
  towerBElement.addEventListener('click', () => selectTower(towerB, towerBElement))
  towerCElement.addEventListener('click', () => selectTower(towerC, towerCElement))
}

document.addEventListener("DOMContentLoaded", towersOfHanoi());


