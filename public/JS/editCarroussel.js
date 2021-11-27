const $prevButton = $('#previousButtonList');
const $nextButton     = $('#nextButtonList');

function getSlidesAmount(pairList) {
  let slideAmount;

  
  if (pairList.length%6) {
    slideAmount = Math.floor(pairList.length/6) + 1;
  }else{
    slideAmount = pairList.length/6;
  }

  return slideAmount;
}

function createNewSlide(sliderId) {
  const $slider = $(sliderId);
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

function buildSlider(pairList,sliderId) {
  const slidesAmount = getSlidesAmount(pairList);
  const $slider = $(sliderId);
  for (let index = 0; index < slidesAmount; index++) {
    const $slideElement = createNewSlide(sliderId);
    const slideContent = getPairsForSlide(pairList,index);
    setPairsOnSlide(slideContent,$slideElement);
  }
  showPairs($slider.children().eq(0));
}

$nextButton.on('click', function () {
  showNextSlide('.active');  
});

$prevButton.on('click',function () {
  showPrevSlide('.active');  
});