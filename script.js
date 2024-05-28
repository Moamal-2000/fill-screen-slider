"use strict";

// Selectors
const slidesContainer = document.querySelector(".slides");
const nextButton = document.querySelector(".nextButton");
const PrevButton = document.querySelector(".prevButton");
const randomButton = document.querySelector(".randomButton");

// Variables
const API_KEY = "S1tWDRgN45RVT6Am1EuRaNFCpVFGOVooMKhbkiEhKPSW1P04hSHiUACL";
const basedUrl = `https://api.pexels.com/v1/search?query=nature&per_page=500`;
let currentImg = 0;

// Functions
// Get images data function
async function getImagesData() {
  const headers = {
    Accept: "application/json",
    Authorization: API_KEY,
  };
  const fetchOptions = {
    method: "GET",
    headers,
  };

  try {
    const res = await fetch(basedUrl, fetchOptions);
    const data = await res.json();
    renderImages(data.photos);
  } catch (e) {
    console.log("Error while fetching images", e);
  }
}
getImagesData();

// Add images to the DOM
function renderImages(data) {
  let limited = 5
  for (const obj of data) {
    if (limited > 0) {
      let urlImg = obj.src.large;

      const imgSlideHTML = `
      <div class="slide">
        <img src="${urlImg}" alt="pexels Image" />
      </div>`;
  
      slidesContainer.innerHTML += imgSlideHTML;
    }
    limited--
  }

  handleSlider();
}

// Set up logic for images
function handleSlider() {
  const sliderImgs = document.querySelectorAll(".slides .slide img");
  sliderImgs[0].parentElement.remove();

  // Give every img container left position
  sliderImgs.forEach((img, i) => {
    img.parentElement.style.left = `${(i - 1) * 100}%`;
  });

  nextButton.addEventListener("click", (e) => checkSlider(e, sliderImgs));
  PrevButton.addEventListener("click", (e) => checkSlider(e, sliderImgs));
  randomButton.addEventListener("click", (e) => checkSlider(e, sliderImgs));
}

function checkSlider(e, slides) {
  const targetClassName = e.target.className;
  const isNextButton = targetClassName === "nextButton";
  const isPrevButton = targetClassName === "prevButton";
  const isRandomButton = targetClassName === "randomButton";
  const isLastItem = currentImg > slides.length - 1;
  const isFirstItem = currentImg === 0;

  if (isNextButton && !isLastItem) currentImg++;
  else if (isPrevButton && !isFirstItem) currentImg--;
  else if (nextButton && !isLastItem) currentImg = 0;
  else if (isPrevButton && isFirstItem) currentImg = slides.length - 1;

  if (isRandomButton) {
    const randomIndexImg = random(slides);
    currentImg = randomIndexImg;
  }

  slidesContainer.style.left = `-${currentImg * 100}%`;
}

function random(items) {
  return Math.floor(Math.random() * items.length);
}
