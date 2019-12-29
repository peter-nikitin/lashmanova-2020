import { breakStatement } from "babel-types";

export const makeGallery = () => {
  // get all images on page
  const gellary = document.querySelector(`.gallery`);
  const gelleryItems = document.querySelectorAll(`.gallery__item`);
  // get caption position 
  const captionPlaceHolder = document.querySelector(`.footer__caption`);
  // create holder for timer
  let gelleryInterval;

  const INTERVAL = 4000;

  // create elements for caption
  const captionPagination = document.createElement(`div`);
  captionPagination.classList.add(`caption__pagination`, `list`);

  const captionImageName = document.createElement(`div`);
  captionImageName.classList.add(`caption__image-name`);


  const buttonsWrapper = document.createElement(`div`);
  buttonsWrapper.classList.add(`caption__buttons-wrapper`);

  captionPlaceHolder.appendChild(captionImageName);
  captionPlaceHolder.appendChild(captionPagination);


  // ------------

  // create buttons for player
  const playBtn = document.createElement(`div`);
  playBtn.classList.add(`button_play`, `caption__button`, `button`);
  playBtn.id = `play`
  
  const pauseBtn = document.createElement(`div`);
  pauseBtn.classList.add(`button_pause`, `caption__button`, `button`); 
  pauseBtn.id = `pause` 

  
// draw pagination
  gelleryItems.forEach((item, i) => {
    const el = document.createElement(`div`);
    el.classList.add(`caption__pagination-item`, `list__item`, `list__item_inline-block`);
    el.dataset.target = i
    el.innerHTML = i+1
    captionPagination.append(el)
  })

  captionPlaceHolder.append(buttonsWrapper)
  const captionPaginationItems = captionPagination.querySelectorAll(`.caption__pagination-item`);
// --------

const timer = {
  timer: null
}

// change image funciton
  const changeImage = (target) => {
    const currentImage = gellary.querySelector(`.gallery__item_current`);
    const currentPagination = captionPlaceHolder.querySelector(`.list__item_current`);
    const showingImage = gellary.querySelector(`.gallery__item_showing`);
    // console.log(currentImage === showingImage)
    if (showingImage) {
      showingImage.classList.remove(`gallery__item_showing`)
    }
    if (!(currentImage === showingImage)) {
      currentPagination.classList.remove(`list__item_current`);
      captionPaginationItems[target].classList.add(`list__item_current`) 

    }
    gelleryItems[target].classList.add(`gallery__item_showing`)
    clearInterval(timer.timer);
    timer.timer = setTimeout(() => {
      currentImage.classList.remove(`gallery__item_current`);
      gelleryItems[target].classList.add(`gallery__item_current`)
      gelleryItems[target].classList.remove(`gallery__item_showing`)
    }, 350);
    captionImageName.innerText = gelleryItems[target].alt;
  }
// -------



  let currentImageIndex = 0;
  const showNextImage = () => {
    // if last - back to first
    if (currentImageIndex === gelleryItems.length-1) {
      currentImageIndex = 0;
    } else {
      currentImageIndex += 1;
    }
    // console.log(currentImageIndex)
    changeImage(currentImageIndex)
  }

  // start auto switching
  if (gellary) {
    
    buttonsWrapper.appendChild(playBtn);
    buttonsWrapper.appendChild(pauseBtn);
    gelleryInterval = setInterval(showNextImage, INTERVAL);
    play.classList.add(`caption__button_current`);
    captionImageName.innerText = gelleryItems[0].alt;
    gelleryItems[0].classList.add(`gallery__item_current`)
    captionPaginationItems[0].classList.add(`list__item_current`) 


  // add listitners on buttons
  buttonsWrapper.addEventListener(`click`, (e) => {
    e.preventDefault();
    switch (e.target.id ) {
      case `play`:currentImageIndex
          clearInterval(gelleryInterval);
          gelleryInterval = setInterval(showNextImage, INTERVAL);
          pauseBtn.classList.toggle(`caption__button_current`);
          playBtn.classList.toggle(`caption__button_current`);
          break;
      case `pause`:
          clearInterval(gelleryInterval);
          pauseBtn.classList.toggle(`caption__button_current`);
          playBtn.classList.toggle(`caption__button_current`);
          break; 
    }
  });

  gellary.addEventListener(`click`, (e) => {
    e.preventDefault();
    clearInterval(gelleryInterval);
    showNextImage();
  });

  // add listeners on pagination
  captionPlaceHolder.addEventListener(`click`, (e) => {
    e.preventDefault();
    if (e.target.classList.contains(`caption__pagination-item`)) {
      const targetImage = e.target.dataset.target;
      if (!(e.target.classList.contains(`list__item_current`))) {
        captionPlaceHolder.querySelector(`.list__item_current`).classList.remove(`list__item_current`)
        e.target.classList.add(`list__item_current`);
        changeImage(targetImage);
      }
      clearInterval(gelleryInterval);
      if (!(pauseBtn.classList.contains(`caption__button_current`))) {
        pauseBtn.classList.add(`caption__button_current`);
      }
      playBtn.classList.remove(`caption__button_current`);
    }
  })

  }


}