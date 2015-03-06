$(function () {
  $('#board').on('click', '.square', function () {
    var $piece = $(this).find('.piece');
    var active = $piece.hasClass('active');

    $('.piece').removeClass('active');
    if (!active) {
      $(this).children().addClass('active');
    }
  })
})