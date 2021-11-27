function getSlidesAmount(pairList) {
  let slideAmount;

  
  if (pairList.length%6) {
    slideAmount = Math.floor(pairList.length/6) + 1;
  }else{
    slideAmount = pairList.length/6;
  }

  return slideAmount;
}

function createNewSlide(idSlider) {
  const $slider = $(idSlider);
  const newSlideElement = "<div class = 'slide disable'></div>"
  $slider.append(newSlideElement);
  return $('.slide:last');
}

function getPairsForSlide(pairList, currentIndexArray) {
  return pairList.slice(currentIndexArray, currentIndexArray + 6);
}

function setPairsOnSlide(pairList, $slideElement) {
  pairList.forEach(element => {
    const newSpan = `<span>${element}</span>`
    $slideElement.append(newSpan);
  });
}

function hidePairs(slideClassNameActive) {
  const $currentSlideActive = $(slideClassNameActive);
  $currentSlideActive.removeClass('active');
  $currentSlideActive.addClass('disable');
}

function showPairs($targetSlideEl) {
  $targetSlideEl.removeClass('disable');
  $targetSlideEl.addClass('active');
  
}

function showNextSlide(slideClassNameActive) {
  const $currentSlideActive = $(slideClassNameActive);
  if ($currentSlideActive.next().length) {
    hidePairs(slideClassNameActive);
    showPairs($currentSlideActive.next());
  }else{
    if($currentSlideActive.prev().length){
      hidePairs(slideClassNameActive);
      showPairs($currentSlideActive.parent().children().eq(0));
    }
  }
}

function showPrevSlide(slideClassNameActive) {
  const $currentSlideActive = $(slideClassNameActive);
  if ($currentSlideActive.prev().length) {
    hidePairs(slideClassNameActive);
    showPairs($currentSlideActive.prev());
  }else{
    if($currentSlideActive.next().length){
      hidePairs(slideClassNameActive);
      showPairs($currentSlideActive.parent().children().filter('.slide:last'));
    }
  }
}

const $nextButton     = $('#nextButtonList');

$nextButton.on('click', function () {
  showNextSlide('.active');  
});

const $prevButton = $('#previousButtonList');
$prevButton.on('click',function () {
  showPrevSlide('.active');  
});

let pairList = {"status":true,"data":["1INCHUSDT","ADAUSDT","ALPHAUSDT","AXSUSDT","BANDUSDT","CHRUSDT","DYDXUSDT","ETHUSDT","FETUSDT","GRTUSDT","HBARUSDT","ICXUSDT","INJUSDT","ONEUSDT","RSRUSDT","SNXUSDT","UNFIUSDT","XTZUSDT","ZILUSDT","KSMUSDT","UNIUSDT","LINKUSDT","COMPUSDT","MANAUSDT", "TESTE"]}

const slidesAmount = getSlidesAmount(pairList.data);
const $slideElement = createNewSlide('#pair-selection');
const slideContent = getPairsForSlide(pairList.data,0)
setPairsOnSlide(slideContent,$slideElement);
showPairs($slideElement);
setPairsOnSlide(getPairsForSlide(pairList.data,6),createNewSlide('#pair-selection'));
setPairsOnSlide(getPairsForSlide(pairList.data,12),createNewSlide('#pair-selection'));