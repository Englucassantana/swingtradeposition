//*Funções

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    carregarValoresMaximoEMinimo();
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                    resetarCampos();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }
  

function atualizarComando(){
    let pair = document.getElementById('pair');
    let chartLink = document.getElementById('chartLink');
    let buyZoneMin = document.getElementById('buyZoneMin');
    let buyZoneMax = document.getElementById('buyZoneMax');
    let reBuyMin = document.getElementById('reBuyMin');
    let reBuyMax = document.getElementById('reBuyMax');
    let targets = document.getElementsByClassName('targets');
    let stoploss = document.getElementById('stoploss');
    let advice = document.getElementById('advice');
    let isStPosition = document.getElementById('isStPosition');
    let exchange = document.getElementById('exchange');
    let tradingDuration = document.getElementById('tradingDuration');

    let targetArray=[];
    for (let index = 0; index < targets.length; index++) {
        targetArray.push(targets[index].value);
        
    }

    jsonComando.pair = pair.value;
    jsonComando.chartLink = chartLink.value;
    jsonComando.buyZoneMin = buyZoneMin.value;
    jsonComando.buyZoneMax = buyZoneMax.value;
    jsonComando.reBuyMin = reBuyMin.value;
    jsonComando.reBuyMax = reBuyMax.value;
    jsonComando.targets = targetArray;
    jsonComando.stoploss = stoploss.value;
    jsonComando.advice = advice.value;
    jsonComando.isStPosition = isStPosition.value;
    jsonComando.exchange = exchange.value;
    jsonComando.tradingDuration = tradingDuration.value;
}


function validarComando(){
    let chaves = Object.keys(jsonComando);
    for(let i = 0; i <=chaves.length; i++){
        if(jsonComando[chaves[i]] == 0 || jsonComando[chaves[i]] == ''){
            console.log(jsonComando[chaves[i]]);
            return false;
        }
    }
    return true;
}

function copiarComandoParaAreaDeTransferencia(){
    let comando = document.getElementById('comando');
    comando.innerText = JSON.stringify(jsonComando);
    navigator.clipboard.writeText(JSON.stringify(jsonComando));
    alert("Comando copiado para a área de transferência");
}

function carregarValoresMaximoEMinimo(){
    let myInput = document.getElementById("pair");
        let precoAtualDoAtivo = 0;
        for (let i = 0; i < responseObject.length; i++) {
            if(responseObject[i].symbol == myInput.value){
                precoAtualDoAtivo = responseObject[i].price;
                break;
            }
        }
        if(precoAtualDoAtivo > 0){
            let valorMinimoDeEntrada = document.getElementById("buyZoneMin");
            valorMinimoDeEntrada.value = precoAtualDoAtivo*0.995;
            let valorMaximoDeEntrada = document.getElementById("buyZoneMax");
            valorMaximoDeEntrada.value = precoAtualDoAtivo*1.005;
            console.log(valorMaximoDeEntrada.value);
            atualizarAlvos(valorMaximoDeEntrada.value);
            atualizarStop(valorMaximoDeEntrada.value);
        }else{
            alert("Simbolo não relacionado na binance");
        }
}

function atualizarEtiquetaDosAlvos(){
    let targetContent = document.getElementsByClassName("target-content");
    for (let index = 0; index < targetContent.length; index++) {
        const elementLabel = targetContent[index].getElementsByTagName('label')[0];
        console.log(elementLabel);
        elementLabel.innerText = `Alvo ${index+1}`;
        elementLabel.htmlFor = `alvo${index+1}`;

        const elementInput = targetContent[index].getElementsByTagName('input')[0];
        elementInput.id = `alvo${index+1}`;
        console.log(elementInput);
    }
}

//*Main
let xhr = new XMLHttpRequest();
let responseObject;
let listaDeSimbolos = [];

let jsonComando = {

};

atualizarComando();

//*Eventos
let chartLink = document.getElementById('chartLink');
chartLink.addEventListener('input',chartLinkFeedback);

function chartLinkFeedback(){
    let target = event.target;
    let chartLinkBox = document.getElementById('chart-link-box');
    let feedback = chartLinkBox.getElementsByClassName('feedback')[0];
    if(chartLink.value !=''){
        chartLinkBox.style = 'background-color: rgb(209, 255, 209);';
        feedback.className = "feedback feedback-suppression";
    }else{
        chartLinkBox.style = 'background-color: rgb(255, 229, 229);';
        feedback.textContent = 'Preencher campo!';
        feedback.className = "feedback";
    }
}

/*
 * *Gerador de comando 
 */
let geradorDeComando = document.getElementById('gerador-de-comando')
geradorDeComando.addEventListener('click', function(){
    event.preventDefault();
    atualizarComando();
    if(validarComando()){        
        copiarComandoParaAreaDeTransferencia();
    }
    console.log(validarComando());
}, false);

/*
 * *Recepção de informações da binance
 */
xhr.onload = function () {
    if (xhr.status == 200) {
        responseObject = JSON.parse(xhr.responseText);
        for (let i = 0; i < responseObject.length; i++) {
            listaDeSimbolos.push(responseObject[i].symbol);
        }
        console.log(listaDeSimbolos);
        autocomplete(document.getElementById("pair"), listaDeSimbolos);
    }
  }
xhr.open('GET', "https://api.binance.com/api/v3/ticker/price", true);
// xhr.open('GET',"https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT", true);
xhr.send(null);

/**
 * *Adição de novo alvo */ 
let adicionarNovoAlvo = document.getElementById("adicionar-alvo");
adicionarNovoAlvo.addEventListener("click", ()=>{
    event.preventDefault();
    let targetsContent = document.getElementById("targets-content");
    let targetContent = document.getElementsByClassName("target-content");
    let newTargetContentNumber = targetContent.length + 1;
    let newTargetContent = document.createElement('div');
    newTargetContent.className = "target-content"
    let newMsg= `
        <div class="target-input-content">
            <label class="label-align" for="target${newTargetContentNumber}">Alvo ${newTargetContentNumber}:</label>
            <input id="target${newTargetContentNumber}" class="targets" type="number">
            <button class="remover-alvo">&#215</button>
            <button class="seta">&#8595</button>
            <button class="seta">&#8593</button>
        </div>
        <span class="feedback-content">Lorem ipsum tincidunt leo vehicula bibendum, sapien aenean neque vitae.</span>
    `
    newTargetContent.innerHTML = newMsg;
       
    targetsContent.appendChild(newTargetContent);
    console.log(targetsContent);
    removerAlvo = document.getElementsByClassName('remover-alvo');       
});

// /**
//  * *Remoção de alvo
//  */

// let removerAlvo = document.getElementsByClassName('remover-alvo');
// for (let index = 0; index < removerAlvo.length; index++) {
//     removerAlvo[index].addEventListener('click', ()=>{
//         event.preventDefault();
//         let target = event.target;
//         target = target.parentNode.parentNode;
//         fatherTarget = target.parentNode;
//         fatherTarget.removeChild(target); 
//         console.log(fatherTarget);
//     })    
// }

let targetsContent = document.getElementById("targets-content");
targetsContent.addEventListener('click', ()=>{
    console.log("Estou nos alvos");
    event.preventDefault();
    let target = event.target;
    console.log(target)
    if(target.className == "remover-alvo"){
        target = target.parentNode.parentNode;
        fatherTarget = target.parentNode;
        fatherTarget.removeChild(target);
        console.log("Alvo removido");
        atualizarEtiquetaDosAlvos();
    }
});

