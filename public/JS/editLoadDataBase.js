//*PROPERTIES
let signal;
let pairList = {
  status: false,
  data  : []
};

let maxShowedSignal   = 6;
let lastShowedSignal  = -1;
let firstShowedSignal = -1;

const previousButtonId = 'previousButtonList';
const nextButtonId     = 'nextButtonList';
const pairListFrameId  = 'pair-selection';

const previousButton = document.getElementById(previousButtonId);
const nextButton     = document.getElementById(nextButtonId);
const pairListFrame  = document.getElementById(pairListFrameId);

let xhr = new XMLHttpRequest();

//*FUNCTIONS
function loadPairList(pairList, pairListFrame) {


  if(pairList.length) {
    pairList.forEach(pair => {            
      const newSpan = document.createElement('span');

      newSpan.innerText = pair;
      pairListFrame.appendChild(newSpan);       
    });
  }
}

function showPairList(pairListFrame) {
  
  let elSpan = pairListFrame.getElementsByTagName('span');

  if(elSpan.length) {
      firstShowedSignal = 0;

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
}

function nextPairs() {
  const pairListFrame = document.getElementById('pair-selection');

  const elSpan  = pairListFrame.getElementsByTagName('span');
  const remnant = elSpan.length - lastShowedSignal - 1;

  if(remnant){        
      for (let index = firstShowedSignal; index <= lastShowedSignal; index++) {
        const span = elSpan[index];

        span.style = 'display:none;';
      }
      firstShowedSignal = lastShowedSignal +1;

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

function previousPairs() {
    const pairListFrame = document.getElementById('pair-selection');
    const elSpan        = pairListFrame.getElementsByTagName('span');

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

function getSignal(event) {
  const elSpan = event.target;

  if(elSpan.tagName.toUpperCase() == 'SPAN'){
    let   xhr      = new XMLHttpRequest();
    const url      = `http://ec2-3-129-60-43.us-east-2.compute.amazonaws.com:10313/stposition/signals/pair?pair=${pairName}`
    const pairName = elSpan.innerText;

    xhr.onload = function (){
      if(xhr.status === 200){
        signal = JSON.parse(xhr.responseText);   
      }
    }
    xhr.open('GET', url , true);
    xhr.send(null);
    return true;
  }
  return false;
}

function loadTitlePair(){
  const pairSelected = document.getElementById('pair-selected');

  pairSelected           = pairSelected.getElementsByTagName('span')[0];
  pairSelected.innerText = signal.pair
}

function showSignal(event) {
  loadPairList();
}

//*EVENTS
xhr.onload = function (){
  if(xhr.status === 200){
    pairList = JSON.parse(xhr.responseText);
    loadPairList(pairList.data,pairListFrame)
    showPairList(pairListFrame);      
  }
}
nextButton.addEventListener('click', nextPairs);
previousButton.addEventListener('click', previousPairs);
pairListFrame.addEventListener('click', function (event) {
  if(getSignal(event)) showSignal(event);
});

//*CODE
xhr.open('GET', 'http://ec2-3-129-60-43.us-east-2.compute.amazonaws.com:10313/stposition/signals/',true);
xhr.send(null);