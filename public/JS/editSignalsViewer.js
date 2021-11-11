let signalAmount        = pairList.length;
const maxShowedSignal    = 6;
let firstShowedSignal  = -1;
let lastShowedSignal   = -1;
let previousButtonList = document.getElementById('previousButtonList');
let nextButtonList     = document.getElementById('nextButtonList');

function showPairList(pairList) {
    if(pairList.length){
        pairList.forEach(pair => {
            const pairSelection     = document.getElementById('pair-selection');
            const newSpan           = document.createElement('span');

            newSpan.innerText = pair;
            pairSelection.appendChild(newSpan);       
        });
    }
}

function showSignal(signals){
    showPairList(signals);
    let pairSelection = document.getElementById('pair-selection');
    let elSpan        = pairSelection.getElementsByTagName('span');
    if(elSpan.length){
        firstShowedSignal = 0
        for (let index = 0; index < maxShowedSignal; index++) {
            const span       = elSpan[index];
                  span.style = 'display:inline';
            lastShowedSignal++;
        }
        for (let index = 6; index < elSpan.length; index++) {
            const span       = elSpan[index];
                  span.style = 'display:none';
        }
    }
    console.log(`O primeiro sinal mostrado é o: ${firstShowedSignal}`);
    console.log(`O ultimo sinal mostrado é o: ${lastShowedSignal}`);    
}

function nextSignals() {
    const pairSelection = document.getElementById('pair-selection');
    const elSpan        = pairSelection.getElementsByTagName('span');
    const remnant      = elSpan.length - lastShowedSignal - 1;

    if(remnant){        
        for (let index = firstShowedSignal; index <= lastShowedSignal; index++) {
          const span       = elSpan[index];

          span.style = 'display:none;';
        }
        firstShowedSignal   = lastShowedSignal +1;

        let newLastShowedSignal = lastShowedSignal;

        if(remnant < maxShowedSignal){
          for (let index = lastShowedSignal +1; index < lastShowedSignal +1 + remnant; index++) {
            const span = elSpan[index];

            span.style = 'display:inline;';
            newLastShowedSignal++;        
          }
        }else{
          for (let index = lastShowedSignal +1; index < lastShowedSignal +1 + maxShowedSignal; index++) {
            const span = elSpan[index];

            span.style = 'display:inline;';
            newLastShowedSignal++;        
          }
        }
        

        lastShowedSignal = newLastShowedSignal;
    } 
}

function previousSignals() {
    let pairSelection = document.getElementById('pair-selection');
    let elSpan        = pairSelection.getElementsByTagName('span');
    if(firstShowedSignal){        
        for (let index = firstShowedSignal; index <= lastShowedSignal; index++) {
            const span       = elSpan[index];
                  span.style = 'display:none;';
        }
        lastShowedSignal     = firstShowedSignal - 1;
        newFirstShowedSignal = firstShowedSignal;
        for (let index = lastShowedSignal; index >= firstShowedSignal - maxShowedSignal; index--) {
            const span       = elSpan[index];
                  span.style = 'display:inline;';
            newFirstShowedSignal--;        
        }
        firstShowedSignal = newFirstShowedSignal;
    }
    console.log(`O primeiro sinal mostrado é o: ${firstShowedSignal}`);
    console.log(`O ultimo sinal mostrado é o: ${lastShowedSignal}`);    
}

function loadTitlePair(target){
    let pairSelected           = document.getElementById('pair-selected');
        pairSelected           = pairSelected.getElementsByTagName('span')[0];
        pairSelected.innerText = target.innerText;
}

function loadTargets(value, index){
  let targetsContent = document.getElementById("targets-content");
  let newTargetContent           = document.createElement('div');
      newTargetContent.className = "field-box-main"
  let newMsg                     = `
      <div class = "field-box-not-editable">
        <div class="target-input-box">
            <div class="label-input-box">
                <span>Alvo${index+1}</span>
                <span id="target${index+1}Preview" class="input-field">${value}</span>
            </div>
            <div class="btn-edit-target">
            </div>
        </div>
      </div>

      <div class = "field-box-editable editable-target" style = "display:none">
          <div   class = "target-input-box editable-target-box">
            <div   class = "label-input-box">
              <label for   = "target${index+1}">Alvo ${index+1}:</label>
              <input id    = "target${index+1}" class = "targets" type = "number" value = "${value}">
            </div>
          </div>
          <span class = "feedback" style = "display:none"></span>
      </div>

      <div class = "field-box-editable add-new-target">
        <div class="target-input-box">
            <div class="label-input-box">
                <span>Alvo${index+1}</span>
                <span id="target${index+1}Preview" class="input-field">${value}</span>
            </div>
            <div class="btn-edit-target">
            </div>
        </div>
      </div>
  `
  newTargetContent.innerHTML = newMsg;
     
  targetsContent.appendChild(newTargetContent);
  console.log(targetsContent);
  removerAlvo = document.getElementsByClassName('remover-alvo');
}

function loadSignal(event){
  console.log("CARREGANDO SINAIS");
  let target = event.target;
  loadTitlePair(target);
  let targetsContent = document.getElementById("targets-content");
  targetsContent.innerHTML = '';
  for (const key in signal) {
      if (signal.hasOwnProperty.call(signal, key)) {
        console.log(key);
        const keySignal = signal[key];
        const elSignal = document.getElementById(`${key}Preview`);
        const elEditSignal = document.getElementById(key);
        console.log(elEditSignal);
        if(key == "targets"){
          for (let index = 0; index < keySignal.length; index++) {
            const value = keySignal[index];
            loadTargets(value,index);
          }              
        }
        if(elSignal!=null) elSignal.innerText = keySignal;
            
        if(elEditSignal!=null){
          if(elEditSignal.tagName == "select"){
            let elOption = elEditSignal.getElementsByTagName('option');
            for (const key in elOption) {
              if (elOption.hasOwnProperty.call(elOption, key)) {
                const element = elOption[key];
                if(element.value == keySignal)element.selected="selected";                  
              }
            }
          }else{
            elEditSignal.value = keySignal;
          }
        }
              
    }
  }
  showAddNewTargetsForm();
  // let chartLinkPreview            = document.getElementById('chartLinkPreview');
  //     chartLinkPreview.innerText  = signal.chartLink;
  // let buyZoneMinPreview           = document.getElementById('buyZoneMinPreview');
  //     buyZoneMinPreview.innerText = signal.buyZoneMin;
}

showSignal(pairList.data);
previousButtonList.addEventListener('click', previousSignals,false);
nextButtonList.addEventListener('click', nextSignals, false);
let pairSelectionSpan = document.getElementById('pair-selection');
    pairSelectionSpan = pairSelectionSpan.getElementsByTagName('span');
for (const key in pairSelectionSpan) {
    if (pairSelectionSpan.hasOwnProperty.call(pairSelectionSpan, key)) {
        const elSpan = pairSelectionSpan[key];
        elSpan.addEventListener('click', loadSignal, false);
        
    }
}
