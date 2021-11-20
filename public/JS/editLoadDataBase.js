//*PROPERTIES
let signal ;
let pairList = {
  status: false,
  data  : []
};

let maxShowedSignal   = 6;
let lastShowedSignal  = -1;
let firstShowedSignal = -1;

let method = 'GET'
let url = 'http://ec2-18-188-141-215.us-east-2.compute.amazonaws.com:10313/stposition/signals/';

const previousButtonId = 'previousButtonList';
const nextButtonId     = 'nextButtonList';
const pairListFrameId  = 'pair-selection';
const targetsContentId = 'targets-content';

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
}

function getSignal(event) {
  const elSpan = event.target;

  if(elSpan.tagName.toUpperCase() == 'SPAN'){
    let   xhr      = new XMLHttpRequest();
    const pairName = elSpan.innerText;
    const url      = `http://ec2-18-188-141-215.us-east-2.compute.amazonaws.com:10313/stposition/signals/pair?pair=${pairName}`

    xhr.onload = function (){
      if(xhr.status === 200){
        signal = JSON.parse(xhr.responseText);
        showSignal(event);  
      }
    }
    xhr.open('GET', url , true);
    xhr.send(null);
    
  }
}

function loadTitlePair(){
  const pairSelected = document.getElementById('pair-selected');
  const elSpan       = pairSelected.getElementsByTagName('span')[0];
  elSpan.innerText = signal.data.pair;
}

function prepareHtmlForTarget(target,targetReached,i) {
  if (targetReached) {
    const targetHtmlString =
      `
        <div class = "field-box-not-editable">
          <div class="target-input-box">
              <div class="label-input-box">
                  <span>Alvo${i + 1}</span>
                  <span id="target${i + 1}Preview" class="input-field">${target}</span>
              </div>
              <div class="btn-edit-target">
              </div>
          </div>
        </div>

        <div class = "field-box-editable editable-target" >
            <div   class = "target-input-box editable-target-box">
              <div   class = "label-input-box">
                <label for   = "target${i + 1}">Alvo ${i + 1}:</label>
                <input id    = "target${i +1 }" class = "targets" type = "number" value = "${target}" disabled>
              </div>
            </div>
            <span class = "feedback" style = "display:none"></span>
        </div>
      `;
    return targetHtmlString;
  } else {
    const targetHtmlString =
      `
        <div class = "field-box-not-editable">
          <div class="target-input-box">
              <div class="label-input-box">
                  <span>Alvo${i + 1}</span>
                  <span id="target${i + 1}Preview" class="input-field">${target}</span>
              </div>
              <div class="btn-edit-target">
              </div>
          </div>
        </div>

        <div class = "field-box-editable editable-target" >
            <div   class = "target-input-box editable-target-box">
              <div   class = "label-input-box">
                <label for   = "target${i + 1}">Alvo ${i + 1}:</label>
                <input id    = "target${i +1 }" class = "targets" type = "number" value = "${target}">
              </div>
            </div>
            <span class = "feedback" style = "display:none"></span>
        </div>
      `;
    return targetHtmlString;
  }
  
  
}

function showTarget(targetHtmlString,targetsContentId) {
  let targetsContent   = document.getElementById(targetsContentId);
  let newTargetContent = document.createElement('div');

  newTargetContent.className = "field-box-main"
  newTargetContent.innerHTML = targetHtmlString;
     
  targetsContent.appendChild(newTargetContent);
  removerAlvo = document.getElementsByClassName('remover-alvo');
}

function removeOldTargets(targetsContentId) {
  const targetsContent = document.getElementById(targetsContentId);
  targetsContent.innerHTML = '';
}

function showTargets(targets,targetsReached,targetsContentId){
  removeOldTargets(targetsContentId);
  targets.forEach((target,i) => {
    const targetHtmlString = prepareHtmlForTarget(target,targetsReached[i],i);
    showTarget(targetHtmlString,targetsContentId);
  });
}

function showChartLink(chartLink,chartLinkId,chartLinkPreviewId) {
  const $elChartLink = $(chartLinkId);
  const $elChartLinkPreviewId = $(chartLinkPreviewId);
  $elChartLink.val(chartLink);
  $elChartLinkPreviewId.text(chartLink);
  console.log("teste") ;
}

function showSignal(event) {
  loadTitlePair();
  showChartLink(signal.data.chartLink, fieldIds.chartLink,fieldIds.chartLinkPreviewId);
  showTargets(signal.data.targets, signal.data.targetsReached, targetsContentId);
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
  getSignal(event);
});

//*CODE
xhr.open(method, url,true);
xhr.send(null);