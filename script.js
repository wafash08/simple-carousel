const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__button--next");
const prevButton = document.querySelector(".carousel__button--prev");
const dotsNav = document.querySelector(".carousel__nav");
const dots = Array.from(dotsNav.children);

const slideSize = slides[0].getBoundingClientRect();
const slideWidth = slideSize.width;

// arrange slide next to one another
slides.forEach(function setSlidePosition(slide, index) {
  slide.style.left = `${slideWidth * index}px`;
});

function moveToSlide(track, currentSlide, targetSlide) {
  track.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
}

function updateDots(currentDot, targetDot) {
  currentDot.classList.remove("current-dot");
  targetDot.classList.add("current-dot");
}

function handlePrevNextButton(slides, prevButton, nextButton, targetIndex) {
  if (targetIndex === 0) {
    prevButton.disabled = true;
    nextButton.disabled = false;
  } else if (targetIndex === slides.length - 1) {
    prevButton.disabled = false;
    nextButton.disabled = true;
  } else {
    prevButton.disabled = false;
    nextButton.disabled = false;
  }
}

function getCurrentElement(element, identifier) {
  return element.querySelector(`${identifier}`);
}

function getIndex(elements, targetElement) {
  return elements.findIndex(element => element === targetElement);
}

// When i click next button, move slides to the right
nextButton.addEventListener("click", () => {
  const currentSlide = getCurrentElement(track, ".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = getCurrentElement(dotsNav, ".current-dot");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = getIndex(slides, nextSlide);

  //   move to the next slide
  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  handlePrevNextButton(slides, prevButton, nextButton, nextIndex);
});

// when i click prev button, move slide to the lefr
prevButton.addEventListener("click", () => {
  const currentSlide = getCurrentElement(track, ".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = getCurrentElement(dotsNav, ".current-dot");
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = getIndex(slides, prevSlide);

  //   move to the previous slide
  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  handlePrevNextButton(slides, prevButton, nextButton, prevIndex);
});

dotsNav.addEventListener("click", e => {
  // what indicator is clicked on?
  const targetDot = e.target.closest("button");
  if (!targetDot) return;

  const currentSlide = getCurrentElement(track, ".current-slide");
  const currentDot = getCurrentElement(dotsNav, ".current-dot");
  const targetIndex = getIndex(dots, targetDot);
  const targetSLide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSLide);
  updateDots(currentDot, targetDot);
  handlePrevNextButton(slides, prevButton, nextButton, targetIndex);
});
