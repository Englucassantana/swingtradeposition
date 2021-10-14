//Atributos
let tabs = document.getElementById("tabs");
//Function
function showAddNewTargetsForm(){
  const addNewTargetsForm = document.getElementById('addNewTargetsForm');
  addNewTargetsForm.style = "";
}

function showEditTargetsForm(){
  const addNewTargetsForm = document.getElementById('addNewTargetsForm');
  addNewTargetsForm.style = "display:none";
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
