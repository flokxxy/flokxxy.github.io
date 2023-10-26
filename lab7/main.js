let horisontScroll = document.querySelector('.container');
let leftBtn = document.getElementById('leftBtn');
let rightBtn = document.getElementById('rightBtn');

rightBtn.addEventListener('click', ()=>{
  horisontScroll.style.scrollBehavior = "smooth";
  horisontScroll.scrollLeft +=900;
});
leftBtn.addEventListener('click', ()=>{
  horisontScroll.style.scrollBehavior = "smooth";
  horisontScroll.scrollLeft -= 900;
});
