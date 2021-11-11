let signal = {
    "chartLink"  : "https://www.tradingview.com/x/76ZNUuZv/",
    "firstToken" : "BAL",
    "secondToken": "USDT",
    "pair"       : "BALUSDT",
    "buyZoneMin" : "24.741",
    "buyZoneMax" : "26.470",
    "reBuyMin"   : "20.307",
    "reBuyMax"   : "22.010",
    "targets"    : [
    27.37,
    29.121,
    32.17,
    38.762,
    48.41,
    68.378
    ],
    "stoploss"       : 24,
    "riskLevel"      : "Moderado a alto",
    "advice"         : "Saída parcial entre os alvos 1 e 2, 50%",
    "isStPosition"   : true,
    "exchange"       : "kucoin",
    "tradingDuration": "1"
}

let pairList = {"status":true,"data":["1INCHUSDT","ADAUSDT","ALPHAUSDT","AXSUSDT","BANDUSDT","CHRUSDT","DYDXUSDT","ETHUSDT","FETUSDT","GRTUSDT","HBARUSDT","ICXUSDT","INJUSDT","ONEUSDT","RSRUSDT","SNXUSDT","UNFIUSDT","XTZUSDT","ZILUSDT","KSMUSDT","UNIUSDT","LINKUSDT","COMPUSDT","MANAUSDT"]}

let xhr = new XMLHttpRequest();

xhr.onload = function (){
  if(xhr.status === 200){
    pairList = JSON.parse(xhr.responseText);
  }
}

xhr.open('GET', 'http://ec2-3-129-60-43.us-east-2.compute.amazonaws.com:10313/stposition/signals/pair?pair=grtusdt',true);
xhr.send(null);