const button = document.querySelector('button');
const form = document.querySelector('#blablabla');
const popup = document.querySelector('.content');
const closeImage = document.querySelector('.page_close');
button.addEventListener('click', () => {
  form.classList.add('open');
  popup.classList.add('popup_open');
});
// Добавляем обработчик события для закрытия формы при клике на изображение
closeImage.addEventListener('click', () => {
  form.classList.remove('open');
  popup.classList.remove('popup_open');
});



jQuery(function() {
  $('#mainForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      url: '<Место для ссылки на вашу облачную функцию>',
      type: 'POST',
      cache: false,
      data: $(e.target).serialize()
    }).done(function() {
      alert('Done.');
    }).fail(function() {
      alert('Something went wrong.');
    });
  });
});
