//Atributos
let tabs = document.getElementById("tabs");
//Function
function showAddNewTargetsForm(){
  const addNewTargetsForm = document.getElementsByClassName('add-new-target');
  const editTargetsValues = document.getElementsByClassName('editable-target');
  const tabEditTargets = document.getElementById('tabEditTargets');
  tabEditTargets.className = 'tab-button';
  const tabAddNewTargets = document.getElementById('tabAddNewTargets');
  tabAddNewTargets.className = 'tab-button-active';

  for (const key in addNewTargetsForm) {
    if (Object.hasOwnProperty.call(addNewTargetsForm, key)) {
      const element = addNewTargetsForm[key];
      element.style = "";      
    }
  }
  for (const key in editTargetsValues) {
    if (Object.hasOwnProperty.call(editTargetsValues, key)) {
      const element = editTargetsValues[key];
      element.style = "display:none";  
    }
  }
}

function showEditTargetsForm(){
  const addNewTargetsForm = document.getElementsByClassName('add-new-target');
  const editTargetsValues = document.getElementsByClassName('editable-target');
  const tabAddNewTargets = document.getElementById('tabAddNewTargets');
  tabAddNewTargets.className = 'tab-button';
  const tabEditTargets = document.getElementById('tabEditTargets');
  tabEditTargets.className = 'tab-button-active';
  for (const key in addNewTargetsForm) {
    if (Object.hasOwnProperty.call(addNewTargetsForm, key)) {
      const element = addNewTargetsForm[key];
      element.style = "display:none";     
    }
  }
  for (const key in editTargetsValues) {
    if (Object.hasOwnProperty.call(editTargetsValues, key)) {
      const element = editTargetsValues[key];
      element.style = "";  
    }
  }
}

function selectTab(event){
  let tab = event.target;
  if(tab.id == "tabAddNewTargets"){
    showAddNewTargetsForm();
    return true;
  }
  if(tab.id == "tabEditTargets"){
    showEditTargetsForm();
    return true;
  }
  return false;
}
//Events
tabs.addEventListener('click', selectTab, false);
