const docSlider = new Swiper('.swiper.is--features-list', {

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
});
