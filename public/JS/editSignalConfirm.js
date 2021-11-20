//Properties
const $confirmButton = $('#confirm-btn');

const fieldIds = {
  pairId:'#pair',
  chartLink:'#chartLink',
};
const targetClassName = '.targets'

let JSONCommand      = {};

//Function
function validarComando(){
    return chartLinkFeedback() &
        targetsContentFeedback();
}

function copiarComandoParaAreaDeTransferencia(){
    let comando           = document.getElementById('comando');
        comando.innerText = JSON.stringify(JSONCommand, null, 4);
    navigator.clipboard.writeText(JSON.stringify(JSONCommand));
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
        JSONCommand.commandType = "editTargets";
        JSONCommand.newTargets.push(targets[index]);
        JSONCommand.targetsChangedIndexes.push(index);
      }      
    });
    if(signal.targets.length < targets.length){
      JSONCommand.commandType = "addTargets";
        for (let index = signal.targets.length; index < targets.length; index++) {
            const target = targets[index];
            console.log(`O valor do alvo ${index+1} é igual a: ${target}`);
            JSONCommand.newTargets.push(target);                        
        }
    }
}

function updateCommand(fieldIds, targetClassName){
  const pair = $(fieldIds.pairId).text();
  const chartLink = $(fieldIds.chartLink).val();
  const $targets = $(targetClassName);
  let targets = [];
 $targets.each(function () {
  targets.push($(this).val());
 });

 JSONCommand.pair = pair;
 JSONCommand.chartLink = chartLink;
 JSONCommand.targets = targets;
}

function commandGenerator(){
    console.log('GERANDO COMANDO...');
    event.preventDefault();
    updateCommand(fieldIds, targetClassName);
    if(validarComando()){        
        copiarComandoParaAreaDeTransferencia();
    }else{
        alert("Reveja o preenchimento dos campos");
    }
}

function setStyleToConfirmButton() {
  if (validarComando() == true) {
    $confirmButton.removeAttr('disabled');
  } else {
    $confirmButton.attr('disabled',true);
  }
}

//Evento
$confirmButton.on('click', commandGenerator);
window.addEventListener('DOMContentLoaded',setStyleToConfirmButton);