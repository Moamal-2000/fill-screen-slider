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




// Get images data function
(async function getData() {
  const res = await fetch(basedUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: API_KEY,
    },
  });
  const data = await res.json();
  addImages(data.photos);
})();




// Add images to the DOM
function addImages(data) {
  // Add images to the page
  for (const obj of data) {
    let urlImg = obj.src.landscape;

    // slide container
    const slide = document.createElement("div");
    slide.classList.add("slide");
    slidesContainer.appendChild(slide);

    // image
    const img = document.createElement("img");
    img.setAttribute("alt", "pexels Image");
    img.src = urlImg;
    slide.appendChild(img);
  }
  setUpImages()
}




// Set up logic for images
function setUpImages() {
  const sliderImgs = document.querySelectorAll(".slides .slide img");
  // Set first img url
  sliderImgs[0].src = 'https://www.travelandleisure.com/thmb/KLPvXakEKLGE5AY2jVyovl3Md1k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/iceland-BEAUTCONT1021-b1aeafa7ac2847a484cbca48d3172b6c.jpg'
  
  // Give every img container left position
  sliderImgs.forEach((img, i) => {
    img.parentElement.style.left = `${(i) * 100}%`;
  });



  function checkSlider(e) {
    // Change current image depending on clicked button
    if (e.target.className === "nextButton" && currentImg < sliderImgs.length - 1)         currentImg++;
    else if (e.target.className === "prevButton" && currentImg !== 0)                      currentImg--;
    else if (e.target.className === "nextButton" && !(currentImg < sliderImgs.length - 1)) currentImg = 0;
    else if (e.target.className === "prevButton" && currentImg === 0)                      currentImg = sliderImgs.length - 1;


    // Get random img
    if (e.target.className === "randomButton") {
      const randomIndexImg = Math.floor(Math.random() * sliderImgs.length);
      currentImg = randomIndexImg;
    }

    // Switch to the current img
    slidesContainer.style.left = `-${(currentImg) * 100}%`;
  }


  nextButton.addEventListener("click", (e) => checkSlider(e));
  PrevButton.addEventListener("click", (e) => checkSlider(e));
  randomButton.addEventListener("click", (e) => checkSlider(e));
}

