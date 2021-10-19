
// TODO - [ ] Carregar todos os sinais na pagina
// TODO - [ ] Mostrar apenas o seis sinais na pagina

let signal = {
    "chartLink"  : "https://www.tradingview.com/x/76ZNUuZv/",
    "firstToken" : "BAL",
    "secondToken": "USDT",
    "pair"       : "BALUSDT",
    "buyZoneMin" : "24.741",
    "buyZoneMax" : "26.470",
    "reBuyMin"   : "20.307",
    "reBuyMax"   : "22.010",
    "targets"    : [
    27.37,
    29.121,
    32.17,
    38.762,
    48.41,
    68.378
    ],
    "stoploss"       : 24,
    "riskLevel"      : "Moderado a alto",
    "advice"         : "Saída parcial entre os alvos 1 e 2, 50%",
    "isStPosition"   : true,
    "exchange"       : "kucoin",
    "tradingDuration": "1"
}

let signals = [
    {
        "pair": "BALUSDT"
    },
    {
        "pair": "BAKEUSDT"
    },
    {
        "pair": "FTMUSDT"
    },
    {
        "pair": "FXSBUSD"
    },
    {
        "pair": "THETAUSDT"
    },
    {
        "pair": "RTRERTE"
    },
    {
        "pair": "ASDGGDF"
    },
    {
        "pair": "ZXCVCVBVCX"
    }
]

let signalAmount        = signals.length;
let maxShowedSignal    = 6;
let firstShowedSignal  = -1;
let lastShowedSignal   = -1;
let previousButtonList = document.getElementById('previousButtonList');
let nextButtonList     = document.getElementById('nextButtonList');


function getSignal(){

}

function listSignals(signals) {
    if(signals.length){
        signals.forEach(signal => {
            let pairSelection     = document.getElementById('pair-selection');
            let newSpan           = document.createElement('span');
                newSpan.innerText = signal.pair;
            pairSelection.appendChild(newSpan);       
        });
    }
}

function showSignal(signals){
    listSignals(signals);
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
    let pairSelection = document.getElementById('pair-selection');
    let elSpan        = pairSelection.getElementsByTagName('span');
    let remanant      = elSpan.length - lastShowedSignal - 1;
    console.log(`A sobra de sinais é: ${remanant}`);
    if(remanant){        
        for (let index = firstShowedSignal; index <= lastShowedSignal; index++) {
            const span       = elSpan[index];
                  span.style = 'display:none;';
        }
                firstShowedSignal   = lastShowedSignal +1;
            let newLastShowedSignal = lastShowedSignal
        for (let index = lastShowedSignal +1; index < lastShowedSignal +1 + remanant; index++) {
            const span       = elSpan[index];
                  span.style = 'display:inline;';
            newLastShowedSignal++;        
        }
        lastShowedSignal = newLastShowedSignal;
    }
    console.log(`O primeiro sinal mostrado é o: ${firstShowedSignal}`);
    console.log(`O ultimo sinal mostrado é o: ${lastShowedSignal}`);    
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
  let targetContent  = targetsContent.getElementsByClassName("field-box-main");
  console.log(targetContent.length);
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
          <span class = "feedback" style = "display:none">Lorem ipsum tincidunt leo vehicula bibendum, sapien aenean neque vitae.</span>
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
  // let chartLinkPreview            = document.getElementById('chartLinkPreview');
  //     chartLinkPreview.innerText  = signal.chartLink;
  // let buyZoneMinPreview           = document.getElementById('buyZoneMinPreview');
  //     buyZoneMinPreview.innerText = signal.buyZoneMin;
}


getSignal();
showSignal(signals);
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
