
$(document).ready(function() {
  var slider = $('.gallery-slider');
  var images = slider.find('img');
  var pager = $('.gallery-pager');
  var currentPage = 0;

  // Определение количества страниц
  var totalPages = Math.ceil(images.length / 3);

  // Генерация пейджера
  for (var i = 0; i < totalPages; i++) {
    pager.append('<span></span>');
  }

  // Установка активной страницы
  pager.find('span').eq(currentPage).addClass('active');

  // Обработчик клика по стрелке влево
  $('.arrow-left').click(function() {
    if (currentPage > 0) {
      currentPage--;
      slider.css('transform', 'translateX(' + (-currentPage * 100) + '%)');
      pager.find('span').removeClass('active').eq(currentPage).addClass('active');
    }
  });

  // Обработчик клика по стрелке вправо
  $('.arrow-right').click(function() {
    if (currentPage < totalPages - 1) {
      currentPage++;
      slider.css('transform', 'translateX(' + (-currentPage * 100) + '%)');
      pager.find('span').removeClass('active').eq(currentPage).addClass('active');
    }
  });
});
