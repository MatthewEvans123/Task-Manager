function test(text)  {
  alert(text);
}
idNumber = 0
function idNumberIncrease() { //function for creating new id numbers
  idNumber ++;
  return idNumber;
}
class taskBox { // class for creation of task object
  constructor(colour,text,parent,children) {
    this.colour = colour;
    this.text = text;
    this.parent = parent;
    this.childen = children;
  }
}
const tasks = []; //array to control task objects
tasks[0] = new taskBox(); //create base task
function newTaskBox(target) { // function for creating a new box
  const thisIdNumber = idNumberIncrease() //gets next id number
  tasks[thisIdNumber] = new taskBox(); //create task object
  const newBox = document.createElement('div'); //create new box
  const newInput = document.createElement('input'); // create input element
  const newText = document.createTextNode(thisIdNumber+'  '); //create text node with id number
  newBox.classList.add('mybox'); //add myBox class to new box
  newBox.id = thisIdNumber; //give new box an id number
  document.getElementById(target).appendChild(newBox); // place the new box
  newBox.appendChild(newText)
  addButton(newBox.id); // place button
  addColourChoice(newBox.id); // place colour choice dropdown
  newBox.appendChild(newInput); //place input box
}
function addButton(target) {
  const newButton = document.createElement('button'); // create button element
  const buttonSymbol = document.createTextNode("+"); //create button label
  newButton.appendChild(buttonSymbol); // populate button with symbol
  newButton.addEventListener('click', function() {
    newTaskBox(this.parentNode.id);
  }); // add event handler for new button click
  document.getElementById(target).appendChild(newButton); //add button to target
}
function changeColour(target, value) {
  //const colourClassList = [];
  const colourClassList = document.getElementById(target).className.split(/\s+/);
  for (i = 0; i < colourClassList.length; i++) {
    if (colourClassList[i].indexOf('Sel') != -1) {
      document.getElementById(target).classList.remove(colourClassList[i]);
    }
  }
  document.getElementById(target).classList.add(value+'Sel');
  tasks[target].colour = value;
}
function addColourChoice(target) {
  const colourOptions = ['red','blue','green','purple']
  const newSelect = document.createElement('select');
  const newOption = [];
  const selectOption = document.createElement('option');
  selectOption.selected = 'selected';
  newSelect.appendChild(selectOption);
  var i;
  for (i = 0; i < colourOptions.length; i++) {
    newOption[i] = document.createElement('option');
    newOption[i].className = colourOptions[i]+'Sel';
    newOption[i].value = colourOptions[i];
    newSelect.appendChild(newOption[i]);
  }
  newSelect.addEventListener('change', function() {
    changeColour(target, this.value);
    });
  document.getElementById(target).appendChild(newSelect);
  //  Need to get this to run change colour when an option is selected
}
function idTest() { // controls test box at bottom of screen
  const id = document.getElementById('idTestInput').value //get id from form
  const colour = tasks[id].colour //get colour from tasks object
  document.getElementById('idTestOutput').innerHTML = 'Colour: ' + colour; //output colour
}
