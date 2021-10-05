//Atributos
let chartLink = document.getElementById('chartLink');
let buyZone = document.getElementById('buy-zone');
let reBuy = document.getElementById('rebuy');
let stoploss = document.getElementById('stoploss');
let advice = document.getElementById('advice');
let exchange = document.getElementById('exchange');



//Function
function chartLinkFeedback(){
    let chartLinkBox = document.getElementById('chart-link-box');
    let feedback = chartLinkBox.getElementsByClassName('feedback')[0];
    if(chartLink.value !=''){
        feedback.className = "feedback feedback-suppression";
        return true;
    }else{
        feedback.textContent = 'Preencher campo!';
        feedback.className = "feedback";        
        return false;
    }
}

function buyZoneFeedback(){
    targetsContentFeedback()
    let buyZoneMax = document.getElementById('buyZoneMax');
    let buyZoneMin = document.getElementById('buyZoneMin');
    let buyZoneMinFeedback = document.getElementById('buyZoneMinFeedback');
    let buyZoneMaxFeedback = document.getElementById('buyZoneMaxFeedback');
    if(buyZoneMin.value ==''){

        buyZoneMinFeedback.textContent = 'Preencher campo!';
        buyZoneMinFeedback.className = "feedback";
        return false
    }
    if(buyZoneMin.value > buyZoneMax.value){

        buyZoneMinFeedback.textContent = 'O valor do campo de zona mínima de compra é maior que o valor de zona de compra máxima';
        buyZoneMinFeedback.className = "feedback";
        return false
    }

    if(buyZoneMax.value ==''){
        buyZoneMaxFeedback.textContent = 'Preencher campo!';
        buyZoneMaxFeedback.className = "feedback";
        return false
    }

    buyZoneMinFeedback.className = "feedback feedback-suppression";
    buyZoneMaxFeedback.className = "feedback feedback-suppression";
    return true;  

}

function reBuyFeedback(){
    let reBuyMax = document.getElementById('reBuyMax');
    let reBuyMin = document.getElementById('reBuyMin');
    let reBuyMinFeedback = document.getElementById('reBuyMinFeedback');
    let reBuyMaxFeedback = document.getElementById('reBuyMaxFeedback');
    if(reBuyMin.value ==''){
        reBuyMinFeedback.textContent = 'Preencher campo!';
        reBuyMinFeedback.className = "feedback";
        return false
    }
    if(reBuyMin.value > reBuyMax.value){
        reBuyMinFeedback.textContent = 'O valor do campo de recompra mínima é maior que o valor de recompra máxima';
        reBuyMinFeedback.className = "feedback";
        return false
    }

    if(reBuyMax.value ==''){
        reBuyMaxFeedback.textContent = 'Preencher campo!';
        reBuyMaxFeedback.className = "feedback";
        return false
    }

    reBuyMinFeedback.className = "feedback feedback-suppression";
    reBuyMaxFeedback.className = "feedback feedback-suppression";
    return true;  

}

function targetProfit(target){
    let buyZoneMax = document.getElementById('buyZoneMax');
    let profit = target.valueAsNumber * 100 / buyZoneMax.valueAsNumber;
    return profit;
}

function targetsContentFeedback(){
    let targets = document.getElementsByClassName('targets');

    for (let index = 0; index < targets.length; index++) {
        const target = targets[index];
        let profit = targetProfit(target);
        let feedback = target.parentNode.parentNode.parentNode;
        console.log(feedback);
        feedback = feedback.getElementsByClassName('feedback')[0];
        console.log(feedback);
        //TODO: avisar caso não haja campos preenchidos
        if(target.value == ''){
            feedback.textContent = 'Preencher campo!';
            feedback.className = "feedback";
            feedback.style = '';
            return false;
        }else{
            feedback.textContent = profit + '%';
            feedback.className = "feedback";
            feedback.style = 'color:green';
        }
        
        let buyZoneMax = document.getElementById('buyZoneMax');        
        //TODO: avisar caso o valor do alvo seja menor que o valor da zona de compra máxima
        if(target.valueAsNumber < buyZoneMax.valueAsNumber){
            feedback.textContent = `${profit}%, o alvo tem valor menor que a zona de compra máxima`;
            feedback.className = "feedback";
            feedback.style = '';
            return false;
        }else{
            feedback.textContent = profit + '%';
            feedback.className = "feedback";
            feedback.style = 'color:green';
        }
        //TODO: avisar se o valor do alvo for menor que o valor do alvo anterior
        if( index!=0){
            if(targets[index - 1].valueAsNumber > target.valueAsNumber){

                feedback.textContent = `${profit}%, o alvo anterior maior que esse alvo!`;
                feedback.className = "feedback";
                feedback.style = '';
                return false;
            }else{
                feedback.textContent = profit + '%';
                feedback.className = "feedback";
                feedback.style = 'color:green';
            }
        }

    }
    return true;
}

function stoplossInjure(target){
    let buyZoneMax = document.getElementById('buyZoneMax');
    let injure = target.valueAsNumber * 100 / buyZoneMax.valueAsNumber;
    return injure;
}

function stoplossFeedback(){
    let feedback = stoploss.parentNode.getElementsByClassName('feedback')[0];
    //TODO:avisar caso o valor do stoploss seja maior que o valor da zona de compra máxima.
    let injure = stoplossInjure(stoploss);
    if(injure > 100){
        feedback.textContent = `${injure}%, o stoploss tem valor maior que a zona de compra máxima`;
        feedback.className = "feedback";
        feedback.style = '';
        return false;
    }
    //TODO: Caso não haja problemas de preenchimento mudar cor da estrutura para verde
    //TODO: avisar a porcentagem em relação a zona máxima de compra.
    feedback.textContent = injure + '%';
    feedback.className = "feedback";
    feedback.style = 'color:green';
    return true;
}

function adviceFeedback(){
    let target = document.getElementById('advice');
    let feedback = target.parentNode.getElementsByClassName('feedback')[0];
    //TODO: avisar caso não haja campos preenchidos;
    if(target.value == ''){
        feedback.textContent = 'Preencher campo!';
        feedback.className = "feedback";
        return false
    }
     //TODO: Caso não haja problemas de preenchimento mudar cor da estrutura para verde
    feedback.className = "feedback feedback-suppression";
    return true;   
}

function exchangeFeedback(){
    let target = document.getElementById('exchange');
    let feedback =  target.parentNode.getElementsByClassName('feedback')[0];
    if(target.value == ''){
        feedback.className = "feedback";
        return true;
    }
     //TODO: Caso não haja problemas de preenchimento mudar cor da estrutura para verde
    feedback.className = "feedback feedback-suppression";
    return true;   
}

//Events
chartLink.addEventListener('input',chartLinkFeedback,false);
buyZone.addEventListener('input',buyZoneFeedback,false);
reBuy.addEventListener('input',reBuyFeedback,false);
targetsContent.addEventListener('input', targetsContentFeedback,false);
stoploss.addEventListener('input', stoplossFeedback, false);
advice.addEventListener('input',adviceFeedback, false);
exchange.addEventListener('input',exchangeFeedback,false);