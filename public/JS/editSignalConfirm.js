//Atribuição
let geradorDeComando = document.getElementById('confirm-btn');
let jsonComando      = {};
//Function
function validarComando(){
    return chartLinkFeedback() &
        buyZoneFeedback() &
        reBuyFeedback() &
        targetsContentFeedback() &
        stoplossFeedback() &
        adviceFeedback() &
        exchangeFeedback();
}

function copiarComandoParaAreaDeTransferencia(){
    let comando           = document.getElementById('comando');
        comando.innerText = JSON.stringify(jsonComando);
    navigator.clipboard.writeText(JSON.stringify(jsonComando));
    alert("Comando copiado para a área de transferência");
}

function checkNewChartLink(oldChartLink, newChartLink){
  if(oldChartLink != newChartLink){
    return true;
  }else{
    return false;
  }
}

function checkNewTargets(targets){
    // @param targets  vetor com os valores dos alvos
    // TODO - [ ] verificar se há novos alvos adicionados
    console.log(`O sinal salvo tem ${signal.targets.length} alvos e o novo tem ${targets.length} alvos`);
    signal.targets.forEach((value,index) => {
      if(value != targets[index]){
        jsonComando.commandType = "editTargets";
        jsonComando.newTargets.push(targets[index]);
        jsonComando.targetsChangedIndexes.push(index);
      }      
    });
    if(signal.targets.length < targets.length){
      jsonComando.commandType = "addTargets";
        for (let index = signal.targets.length; index < targets.length; index++) {
            const target = targets[index];
            console.log(`O valor do alvo ${index+1} é igual a: ${target}`);
            jsonComando.newTargets.push(target);                        
        }
    }
}
    // TODO - [ ] Verificar se há alvos removidos
    // TODO - [ ] Verificar se há alvos editados

function atualizarComando(){
    let pair            = document.getElementById('pair-selected');
    let chartLink       = document.getElementById('chartLink');
    let buyZoneMin      = document.getElementById('buyZoneMin');
    let buyZoneMax      = document.getElementById('buyZoneMax');
    let reBuyMin        = document.getElementById('reBuyMin');
    let reBuyMax        = document.getElementById('reBuyMax');
    let targets         = document.getElementsByClassName('targets');
    let stoploss        = document.getElementById('stoploss');
    let advice          = document.getElementById('advice');
    let isStPosition    = document.getElementById('isStPosition');
    let exchange        = document.getElementById('exchange');
    let tradingDuration = document.getElementById('tradingDuration');

    let targettargets = [];
    for (let index = 0; index < targets.length; index++) {
        targettargets.push(targets[index].valueAsNumber);
        
    }
    jsonComando      = {};
    jsonComando.pair            = pair.getElementsByTagName('span')[0].value;
    
    if(checkNewChartLink(signal.chartLink,chartLink.value)){
      jsonComando.NewChartLink = chartLink.value;
    }      
    else{
      jsonComando.ChartLink = chartLink.value;
    }
    jsonComando.buyZoneMin      = buyZoneMin.valueAsNumber;
    jsonComando.buyZoneMax      = buyZoneMax.valueAsNumber;
    jsonComando.reBuyMin        = reBuyMin.valueAsNumber;
    jsonComando.reBuyMax        = reBuyMax.valueAsNumber;
    jsonComando.newTargets = [];
    jsonComando.targetsChangedIndexes = [];
    checkNewTargets(targettargets);
    // jsonComando.targets         = targettargets;
    jsonComando.stoploss        = stoploss.valueAsNumber;
    jsonComando.advice          = advice.value;
    jsonComando.isStPosition    = isStPosition.value;
    jsonComando.exchange        = exchange.value;
    jsonComando.tradingDuration = tradingDuration.value;
}

function comandGenerator(){
    console.log('GERANDO COMANDO...');
    event.preventDefault();
    atualizarComando();
    if(validarComando()){        
        copiarComandoParaAreaDeTransferencia();
    }else{
        alert("Reveja o preenchimento dos campos");
    }
    console.log(validarComando());
}

//Evento
geradorDeComando.addEventListener('click', comandGenerator, false);