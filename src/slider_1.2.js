/*const docSlider = new Swiper('.swiper.is--features-list', {

direction: 'horizontal',
loop: false,
allowTouchMove: false,
speed: 600,

// Navigation arrows
navigation: {
  nextEl: '.features-list__btn--right',
  prevEl: '.features-list__btn--left',
},

breakpoints: {
  479: {
    slidesPerView: "auto",
    spaceBetween: 20,
  }
}
});*/

const solutionsSlider = new Swiper('.swiper.solutions-slider', {

  direction: 'horizontal',
  loop: false,
  allowTouchMove: false,
  speed: 600,
  slideToClickedSlide: true,
  
  // Navigation arrows
  navigation: {
    nextEl: '.solutions-benef__slider--btn-right',
    prevEl: '.solutions-benef__slider--btn-left',
  },
  
  breakpoints: {
    479: {
      enabled: true,
      slidesPerView: "auto",
      spaceBetween: 1,
      slidesOffsetAfter: 24,
      stopOnLastSlide: true,
    }
  }
  });
