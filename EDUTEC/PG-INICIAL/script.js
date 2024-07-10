let swiperCards = new Swiper('.swiper', {
  loop: true,
  spaceBetween: 32,
  grabCursor: true, 

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});