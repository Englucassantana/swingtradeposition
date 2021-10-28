//Properties
const $confirmButton = $('.confirm-btn');

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

function updateCommandWhenAddNewTarget(){
  const $pair          = $('#pair-selected span')[0].textContent;
  const $chartLink     = $('#chartLink')[0].value;
  const $inputNewTargets = $('.new-targets');
  const $inputTargets = $('.targets');
  JSONCommand = {};  
  JSONCommand.commandType = 'addTargets';
  let   newTargets       = [];
  
  $inputNewTargets.each(function() {
    newTargets.push(this.valueAsNumber);
  });

  JSONCommand.pair = $pair;
  
  if(checkNewChartLink(signal.chartLink,$chartLink)){
    JSONCommand.NewChartLink = $chartLink;
  }      
  else{
    JSONCommand.ChartLink = $chartLink;
  }

  JSONCommand.newTargets = newTargets;
}

function updateCommandWhenEditTarget(){
  const $pair          = $('#pair-selected span')[0].textContent;
  const $chartLink     = $('#chartLink')[0].value;
  const $inputTargets = $('.targets:not(.new-targets)');
  JSONCommand = {};
  JSONCommand.commandType = 'editTargets';
  JSONCommand.targetsChangedIndexes = [];
  JSONCommand.newTargets = [];
  $inputTargets.each(function(i){
    const target = this.valueAsNumber;
    if ( target != signal.targets[i]) {
      JSONCommand.newTargets.push(target);
      JSONCommand.targetsChangedIndexes.push(i); 
    }
  });
}

function updateCommand(){
  const $idTabButtonActive = $('.tab-button-active').attr('id');
  if ($idTabButtonActive == 'tabEditTargets') {
    updateCommandWhenEditTarget();
  } else {
    updateCommandWhenAddNewTarget();
  }
 
}

function commandGenerator(){
    console.log('GERANDO COMANDO...');
    event.preventDefault();
    updateCommand();
    if(validarComando()){        
        copiarComandoParaAreaDeTransferencia();
    }else{
        alert("Reveja o preenchimento dos campos");
    }
    console.log(validarComando());
}

//Evento
$confirmButton.on('click', commandGenerator);