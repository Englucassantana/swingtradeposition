//*PROPERTIES
let signal ;
let pairList = {
  status: false,
  data  : []
};

let method = 'GET'
let url = 'https://ec2-18-222-226-84.us-east-2.compute.amazonaws.com:10313/stposition/signals';

const pairListFrameId  = 'pair-selection';
const targetsContentId = 'targets-content';

const pairListFrame  = document.getElementById(pairListFrameId);


let xhr = new XMLHttpRequest();

//*FUNCTIONS
function getSignal(event) {
  const elSpan = event.target;

  if(elSpan.tagName.toUpperCase() == 'SPAN'){
    let   xhr      = new XMLHttpRequest();
    const pairName = elSpan.innerText;
    const url      = `https://ec2-18-222-226-84.us-east-2.compute.amazonaws.com:10313/stposition/signals/pair?pair=${pairName}`

    xhr.onload = function (){
      if(xhr.status === 200){
        signal = JSON.parse(xhr.responseText);
        showSignal(event);
        chartLinkFeedback();
        targetsContentFeedback();  
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
    buildSlider(pairList.data,'#pair-selection');    
  }
}

pairListFrame.addEventListener('click', function (event) {
  getSignal(event);
});

//*CODE
xhr.open(method, url,true);
xhr.send(null);