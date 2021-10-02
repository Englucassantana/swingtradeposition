
// TODO - [ ] Carregar todos os sinais na pagina
// TODO - [ ] Mostar apenas o seis sinais na pagina


let signals = [
    {
        "pair":"BTCUSDD"
    },
    {
        "pair":"BAKEUSDT"
    },
    {
        "pair":"FTMUSDT"
    },
    {
        "pair":"FXSBUSD"
    },
    {
        "pair":"THETAUSDT"
    },
    {
        "pair":"RTRERTE"
    },
    {
        "pair":"ASDGGDF"
    },
    {
        "pair":"ZXCVCVBVCX"
    }
]

let signalAmout = signals.length;
let maxShowedSignal = 6;
let firstShowedSignal = -1;
let lastShowedSignal = -1;
let previousButtonList = document.getElementById('previousButtonList');
let nextButtonList = document.getElementById('nextButtonList');


function getSignal(){

}

function listSignals(signals) {
    if(signals.length){
        signals.forEach(signal => {
            let pairSelection = document.getElementById('pair-selection');
            let newSpan = document.createElement('span');
            newSpan.innerText = signal.pair;
            pairSelection.appendChild(newSpan);       
        });
    }
}

function showSignal(signals){
    listSignals(signals);
    let pairSelection = document.getElementById('pair-selection');
    let elSpan = pairSelection.getElementsByTagName('span');
    if(elSpan.length){
        firstShowedSignal = 0
        for (let index = 0; index < maxShowedSignal; index++) {
            const span = elSpan[index];
            span.style = 'display:inline';
            lastShowedSignal++;
        }
        for (let index = 6; index < elSpan.length; index++) {
            const span = elSpan[index];
            span.style = 'display:none';        
        }
    }
    console.log(`O primeiro sinal mostrado é o: ${firstShowedSignal}`);
    console.log(`O ultimo sinal mostrado é o: ${lastShowedSignal}`);    
}

function nextSignals() {
    let pairSelection = document.getElementById('pair-selection');
    let elSpan = pairSelection.getElementsByTagName('span');
    let remanant = elSpan.length - lastShowedSignal - 1;
    console.log(`A sobra de sinais é: ${remanant}`);
    if(remanant){        
        for (let index = firstShowedSignal; index <= lastShowedSignal; index++) {
            const span = elSpan[index];
            span.style = 'display:none;';
        }
        firstShowedSignal = lastShowedSignal +1;
        let newLastShowedSignal = lastShowedSignal
        for (let index = lastShowedSignal +1; index < lastShowedSignal +1 + remanant; index++) {
            const span = elSpan[index];
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
    let elSpan = pairSelection.getElementsByTagName('span');
    if(firstShowedSignal){        
        for (let index = firstShowedSignal; index <= lastShowedSignal; index++) {
            const span = elSpan[index];
            span.style = 'display:none;';
        }
        lastShowedSignal = firstShowedSignal - 1;
        newFirstShowedSignal = firstShowedSignal;
        for (let index = lastShowedSignal; index >= firstShowedSignal - maxShowedSignal; index--) {
            const span = elSpan[index];
            span.style = 'display:inline;';
            newFirstShowedSignal--;        
        }
        firstShowedSignal = newFirstShowedSignal;
    }
    console.log(`O primeiro sinal mostrado é o: ${firstShowedSignal}`);
    console.log(`O ultimo sinal mostrado é o: ${lastShowedSignal}`);    
}



function loadTitlePair(target){
    let pairSelected = document.getElementById('pair-selected');
    pairSelected = pairSelected.getElementsByTagName('span')[0];
    pairSelected.innerText = target.innerText;
}

function loadSignal(event){
    let target = event.target;
    loadTitlePair(target);
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
