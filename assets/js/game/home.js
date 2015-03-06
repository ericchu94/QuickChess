$(function () {
  $('#board').on('click', '.square', function () {
    // A couple cases here
    // 1. No pieces are active
    //    a. User clicks on a piece
    //       i. User owns the piece    
    //      ii. User does not own the piece
    //    b. User clicks on a square
    // 2. A piece is active
    //    a. User clicks on active piece
    //    b. User clicks on inactive piece
    //    c. User clicks on a square

    var $activePiece = $('.piece.active');
    var $piece = $(this).find('.piece');
    
    if ($activePiece.length) {
      $activePiece.removeClass('active');
      if (!$piece.hasClass('active')) {
        // Request a move to target square
        var start = getNotation($activePiece.parents('.square'));
        var end = getNotation($(this));
        io.socket.post('/move', {
          start: start,
          end: end,
        });
        console.log('Requesting ' + start + ' to ' + end);
      }
    } else {
      if ($piece.length) {
        // Handle all 1a cases
        $piece.addClass('active');
      }
    }
  })
});

function getNotation($square) {
  return $square.attr('id').substr(7);
}