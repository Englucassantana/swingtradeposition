//Properteis
const suspensionButton = document.getElementById('suspension-btn');
const selectionPanel = document.getElementById('selection-panel');

//Functions
function commandSuspensionGenerator() {
  const comando = document.getElementById('comando');
  const pair = document.getElementById('pair');
  let commandObject = {
    commandType:"signalStPositionSuspension",
    pair
  }
  commandObject.pair = pair.innerText;
  comando.innerText = JSON.stringify(commandObject, null, 4); 
}

// function enableSuspensionButton() {
//   console.log("cheguei na função enable");  
//   const pair = document.getElementById('pair');
//   const pairText = pair.innerText;
//   const suspensionButton = document.getElementById('suspension-btn');

//   console.log(pairText);
//   if(pairText != "Par Selecionado"){
//     suspensionButton.removeAttribute("disabled");
//   }
// }

//Events
suspensionButton.addEventListener('click',commandSuspensionGenerator);
// selectionPanel.addEventListener('click',enableSuspensionButton);