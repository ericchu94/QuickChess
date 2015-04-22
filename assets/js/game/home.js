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
        console.log('Requesting', start, 'to', end);
      }
    } else {
      if ($piece.length) {
        // Handle all 1a cases
        $piece.addClass('active');
      }
    }
  });
  
  $('.controls-new').on('click', function () {
    io.socket.post('/new');
  });

  io.socket.on('move', movePiece);
  io.socket.on('new', setBoard);
});

function setBoard(board) {
  $('.piece').remove();
  var grid = board.grid;
  for (var j = 0; j < grid.length; ++j) {
    for (var i = 0; i < grid[j].length; ++i) {
      var piece = grid[i][j];
      if (piece) {
        $('#square-' + (i + 1) + (j + 1)).append(createPiece(piece));
      }
    }
  }
}

function createPiece(piece) {
  var name = piece.name;
  var color = piece.color;
  return '<div class="piece piece-' + color + ' piece-' + name + '">' + name.toUpperCase() + '</div>';
}

function getNotation($square) {
  return {
    file: $square.data('file'),
    rank: $square.data('rank'),
  };
}

function getSquare(coord) {
  return $('.square[data-file="' + coord.file + '"][data-rank="' + coord.rank + '"]');
}

function movePiece(move) {
  var $start = getSquare(move.start);;
  var $end = getSquare(move.end);;
  var $piece = $start.children('.piece');
  $piece.detach();
  $end.empty();
  $end.append($piece);
}