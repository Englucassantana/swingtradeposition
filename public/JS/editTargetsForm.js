//Atributos
let adicionarNovoAlvo = document.getElementById("adicionar-alvo");
let targetsContent    = document.getElementById('targets-content');

//Function
function addNewTarget(event){
    event.preventDefault();
    let targetsContent = document.getElementById("targets-content");
    let targetContent  = targetsContent.getElementsByClassName("field-box-main");
    console.log(targetContent.length);
    let newTargetContentNumber     = targetContent.length + 1;
    let newTargetContent           = document.createElement('div');
        newTargetContent.className = "field-box-main"
    let newMsg                     = `
        <div class = "field-box-not-editable add-new-target" >

            
        </div>

        <div class = "field-box-editable add-new-target">

            <div   class = "target-input-box editable-target-box">
            <div   class = "label-input-box">
            <label for   = "target${newTargetContentNumber}">Alvo ${newTargetContentNumber}:</label>
            <input id    = "target${newTargetContentNumber}" class = "targets new-targets" type = "number">
                </div>
                <div    class = "btn-edit-target">
                <button class = "remover-alvo">&#215</button>
                <button class = "seta">&#8595</button>
                <button class = "seta">&#8593</button>
                </div>
            </div>
            <span class = "feedback" style = "display:none">Lorem ipsum tincidunt leo vehicula bibendum, sapien aenean neque vitae.</span>
                
        </div>
    `
    newTargetContent.innerHTML = newMsg;
       
    targetsContent.appendChild(newTargetContent);
    console.log(targetsContent);
    removerAlvo = document.getElementsByClassName('remover-alvo');
}

function updateTargetLabel(){
    let editableTargetBox = document.getElementsByClassName('editable-target-box');
    console.log(editableTargetBox);
    for (let index = 0; index < editableTargetBox.length; index++) {
        const elEditableTargetBox = editableTargetBox[index];
        let   labelInputBox       = elEditableTargetBox.getElementsByClassName('label-input-box')[0];
        console.log(labelInputBox);
        let elLabel = labelInputBox.getElementsByTagName('label')[0];
        console.log(elLabel);
            elLabel.htmlFor   = `target${index + 1}`;
            elLabel.innerText = `Alvo ${index + 1}:`;
        let elInput           = labelInputBox.getElementsByTagName('input')[0];
            elInput.id        = `target${index +1}`;
    }
}

function removeTarget(target){    
    let fieldBoxMain = target;
    for (let index = 0; index < 4; index++) {
        fieldBoxMain = fieldBoxMain.parentNode;
    }
    targetsContent.removeChild(fieldBoxMain);
    console.log("Alvo removido");
}

function checkTargetButtons(event){
    target = event.target;
    if(target.className == 'remover-alvo') removeTarget(target);
    if(target.className == 'seta-acima') moveToUp(target);
    if(target.className == 'seta-abaixo') moveToDown(target);
    updateTargetLabel();    
}


//Eventos
adicionarNovoAlvo.addEventListener('click',function(){
  addNewTarget(event);
  setStyleToConfirmButton();
},false);

targetsContent.addEventListener('click',checkTargetButtons,false);