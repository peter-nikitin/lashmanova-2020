import 'lazysizes'; 
import {descktopImages, mobileImages} from './images'; 

export const makeGallery = () => {
  const gallery = document.querySelector(`.gallery`);
  
  if (window.innerWidth > 520) {
    const galleryItem = descktopImages.map(item => {
      gallery.insertAdjacentHTML(
        `beforeend`,
        `<img class="gallery__item lazyload" data-src="${item.image}" alt="${item.alt[window.language]}">`
      );
    });
  } else {
    const galleryItem = mobileImages.map(item => {
      gallery.insertAdjacentHTML(
        `beforeend`,
        `<img class="gallery__item lazyload" data-src="${item.image}" alt="${item.alt[window.language]}">`
      );
    });
  }

  // get all images on page
  const galleryItems = document.querySelectorAll(`.gallery__item`);
  // get caption position
  const captionPlaceHolder = document.querySelector(`.footer__caption`);
  // create holder for timer
  let galleryInterval;

  // interval for autoswitching
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
  playBtn.id = `play`;

  const pauseBtn = document.createElement(`div`);
  pauseBtn.classList.add(`button_pause`, `caption__button`, `button`);
  pauseBtn.id = `pause`;

  // draw pagination
  galleryItems.forEach((item, i) => {
    const el = document.createElement(`div`);
    el.classList.add(
      `caption__pagination-item`,
      `list__item`,
      `list__item_inline-block`
    );
    el.dataset.target = i;
    el.innerHTML = i + 1;
    captionPagination.append(el);
  });

  captionPlaceHolder.append(buttonsWrapper);
  const captionPaginationItems = captionPagination.querySelectorAll(
    `.caption__pagination-item`
  );

  // --------

  const timer = {
    timer: null
  };

  // change image funciton
  const changeImage = (target, speed) => {
    const currentImage = gallery.querySelector(`.gallery__item_current`);
    const currentPagination = captionPlaceHolder.querySelector(
      `.list__item_current`
    );
    const showingImage = gallery.querySelector(`.gallery__item_showing`);
    // console.log(currentImage === showingImage)
    if (showingImage) {
      showingImage.classList.remove(`gallery__item_showing`);
    }
    if (!(currentImage === showingImage)) {
      currentPagination.classList.remove(`list__item_current`);
      captionPaginationItems[target].classList.add(`list__item_current`);
    }
    galleryItems[target].classList.add(`gallery__item_showing`);
    clearInterval(timer.timer);

    const transitionSpeed = speed || 350;

    timer.timer = setTimeout(() => {
      currentImage.classList.remove(`gallery__item_current`);
      galleryItems[target].classList.add(`gallery__item_current`);
      galleryItems[target].classList.remove(`gallery__item_showing`);
    }, transitionSpeed);
    captionImageName.innerText = galleryItems[target].alt;

    if (window.innerWidth < 420) {
      if (captionPaginationItems[target].getBoundingClientRect().left > captionPagination.getBoundingClientRect().width || captionPaginationItems[target].getBoundingClientRect().left < 0) {

        captionPagination.scrollTo({
          left: captionPaginationItems[target].offsetLeft - 30,
          behavior: "smooth"
        }) 
      } 
    } 
  };
  // -------

  let currentImageIndex = 0;
  const showNextImage = speed => {
    // if last - back to first
    if (currentImageIndex === galleryItems.length - 1) {
      currentImageIndex = 0;
    } else {
      currentImageIndex += 1;
    } 
    changeImage(currentImageIndex, speed);
  };

  // start auto switching
  if (gallery) {
    buttonsWrapper.appendChild(playBtn);
    buttonsWrapper.appendChild(pauseBtn);
    galleryInterval = setInterval(showNextImage, INTERVAL);
    play.classList.add(`caption__button_current`);
    captionImageName.innerText = galleryItems[0].alt;
    galleryItems[0].classList.add(`gallery__item_current`);
    captionPaginationItems[0].classList.add(`list__item_current`);

    // add listitners on buttons
    buttonsWrapper.addEventListener(`click`, e => {
      e.preventDefault();
      switch (e.target.id) {
        case `play`:
          clearInterval(galleryInterval);
          galleryInterval = setInterval(showNextImage, INTERVAL);
          pauseBtn.classList.toggle(`caption__button_current`);
          playBtn.classList.toggle(`caption__button_current`);
          break;
        case `pause`:
          clearInterval(galleryInterval);
          pauseBtn.classList.toggle(`caption__button_current`);
          playBtn.classList.toggle(`caption__button_current`);
          break;
      }
    });

    gallery.addEventListener(`click`, e => {
      e.preventDefault();
      clearInterval(galleryInterval);
      showNextImage(100);
      clearInterval(galleryInterval);
        if (!pauseBtn.classList.contains(`caption__button_current`)) {
          pauseBtn.classList.add(`caption__button_current`);
        }
        playBtn.classList.remove(`caption__button_current`);
    });

    // add listeners on pagination
    captionPlaceHolder.addEventListener(`click`, e => {
      e.preventDefault();
      if (e.target.classList.contains(`caption__pagination-item`)) {
        const targetImage = e.target.dataset.target;
        currentImageIndex = +targetImage;
        if (!e.target.classList.contains(`list__item_current`)) {
          captionPlaceHolder
            .querySelector(`.list__item_current`)
            .classList.remove(`list__item_current`);
          e.target.classList.add(`list__item_current`);
          changeImage(targetImage); 
        }
        clearInterval(galleryInterval);
        if (!pauseBtn.classList.contains(`caption__button_current`)) {
          pauseBtn.classList.add(`caption__button_current`);
        }
        playBtn.classList.remove(`caption__button_current`);
      }
    });
  }
};
