//Atributos
let chartLink = document.getElementById('chartLink');

//Function
function chartLinkFeedback(){
    let chartLinkBox = document.getElementById('chart-link-box');
    let feedback     = chartLinkBox.getElementsByClassName('feedback')[0];
    if(chartLink.value !=''){
        feedback.className = "feedback feedback-suppression";
        return true;
    }else{
        feedback.textContent = 'Preencher campo!';
        feedback.className   = "feedback";
        return false;
    }
}

function targetProfit(target){
    let buyZoneMax = document.getElementById('buyZoneMax');
    let buyZoneMin = document.getElementById('buyZoneMin');
    let buyZoneMean = (buyZoneMax.valueAsNumber + buyZoneMin.valueAsNumber)/2;
    let profit     = target.valueAsNumber * 100 / buyZoneMean;
    return profit;
}

function targetsContentFeedback(){
    let targets = document.getElementsByClassName('targets');

    for (let index = 0; index < targets.length; index++) {
        const target   = targets[index];
        // let   profit   = targetProfit(target);
        let   feedback = target.parentNode.parentNode.parentNode;
        console.log(feedback);
        feedback = feedback.getElementsByClassName('feedback')[0];
        console.log(feedback);
        //TODO: avisar caso não haja campos preenchidos
        if(target.value == ''){
            feedback.textContent = 'Preencher campo!';
            feedback.className   = "feedback";
            feedback.style       = '';
            return false;
        }else{
            // feedback.textContent = profit + '%';
            feedback.className   = "feedback";
            feedback.style       = 'color:green';
        }
        //TODO: avisar se o valor do alvo for menor que o valor do alvo anterior
        if( index!=0){
            if(targets[index - 1].valueAsNumber > target.valueAsNumber){

                feedback.textContent = `O alvo anterior maior que esse alvo!`;
                feedback.className   = "feedback";
                feedback.style       = '';
                return false;
            }else{
                feedback.textContent = '';
                feedback.className   = "feedback";
                feedback.style       = 'color:green';
            }
        }

    }
    return true;
}

//Events
chartLink.addEventListener('input', function () {
  chartLinkFeedback();
  setStyleToConfirmButton();
}
,false);

targetsContent.addEventListener('input', function(){
  targetsContentFeedback();
  setStyleToConfirmButton();
},false);