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
        var move = {
          start: start,
          end: end,
        };
        io.socket.post('/move', move, function (resData, jwres) {
          if (jwres.statusCode == 200) {
            movePiece(move);
          }
        });
        console.log('Requesting ' + start + ' to ' + end);
      }
    } else {
      if ($piece.length) {
        // Handle all 1a cases
        $piece.addClass('active');
      }
    }
  });

  io.socket.on('move', movePiece);
});

function getNotation($square) {
  return $square.attr('id').substr(7);
}

function movePiece(move) {
  var $start = $('#square-' + move.start);
  var $end = $('#square-' + move.end);
  var $piece = $start.children('.piece');
  $piece.detach();
  $end.empty();
  $end.append($piece);
}