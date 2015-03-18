/**
 * GameController
 *
 * @description :: Server-side logic for managing games
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Chance = require('chance');
var chance = new Chance();
var name = chance.name();

function Piece(name, color) {
  this.name = name;
  this.color = color;
}

Piece.Color = Object.freeze({
  WHITE: 'white',
  BLACK: 'black',
});
Piece.Name = Object.freeze({
  ROOK: 'r',
  KNIGHT: 'n',
  BISHOP: 'b',
  QUEEN: 'q',
  KING: 'k',
  PAWN: 'p',
});

function Board() {
  this.grid = [];

  for (var i = 0; i < 8; ++i) {
    this.grid.push([]);
  }
  for (var i = 0; i < 8; ++i) {
    this.grid[i][1] = new Piece(Piece.Name.PAWN, Piece.Color.WHITE);
    this.grid[i][2] = null;
    this.grid[i][3] = null;
    this.grid[i][4] = null;
    this.grid[i][5] = null;
    this.grid[i][6] = new Piece(Piece.Name.PAWN, Piece.Color.BLACK);
  }
  this.grid[0][0] = new Piece(Piece.Name.ROOK, Piece.Color.WHITE);
  this.grid[0][7] = new Piece(Piece.Name.ROOK, Piece.Color.BLACK);
  this.grid[1][0] = new Piece(Piece.Name.KNIGHT, Piece.Color.WHITE);
  this.grid[1][7] = new Piece(Piece.Name.KNIGHT, Piece.Color.BLACK);
  this.grid[2][0] = new Piece(Piece.Name.BISHOP, Piece.Color.WHITE);
  this.grid[2][7] = new Piece(Piece.Name.BISHOP, Piece.Color.BLACK);
  this.grid[3][0] = new Piece(Piece.Name.QUEEN, Piece.Color.WHITE);
  this.grid[3][7] = new Piece(Piece.Name.QUEEN, Piece.Color.BLACK);
  this.grid[4][0] = new Piece(Piece.Name.KING, Piece.Color.WHITE);
  this.grid[4][7] = new Piece(Piece.Name.KING, Piece.Color.BLACK);
  this.grid[5][0] = new Piece(Piece.Name.BISHOP, Piece.Color.WHITE);
  this.grid[5][7] = new Piece(Piece.Name.BISHOP, Piece.Color.BLACK);
  this.grid[6][0] = new Piece(Piece.Name.KNIGHT, Piece.Color.WHITE);
  this.grid[6][7] = new Piece(Piece.Name.KNIGHT, Piece.Color.BLACK);
  this.grid[7][0] = new Piece(Piece.Name.ROOK, Piece.Color.WHITE);
  this.grid[7][7] = new Piece(Piece.Name.ROOK, Piece.Color.BLACK);
}

Board.prototype.movePiece = function (start, end) {
  var file = Math.floor(start / 10) - 1;
  var rank = (start % 10) - 1;
  var piece = this.grid[file][rank];
  this.grid[Math.floor(end / 10) - 1][(end % 10) - 1] = piece;
  this.grid[file][rank] = null;
}

var board = new Board();

var spectators = [chance.name(), chance.name(), chance.name(), chance.name()];

function getCoord(coord) {
  coord = parseInt(coord);

  if (!coord)
    return null;

  var unit = coord % 10;
  if (unit == 9 || unit == 0 || coord < 11 || coord > 88)
    return null;

  return coord;
}

module.exports = {
  home: function (req, res) {
    return res.view({
      specs: spectators.join(', '),
      board: board,
    });
  },

  move: function (req, res) {
    var start = getCoord(req.body.start);
    var end = getCoord(req.body.end);

    if (!start || !end) {
      return res.badRequest();
    }

    board.movePiece(start, end);

    sails.sockets.blast('move', {
      start: start,
      end: end,
    }, req.socket);
    return res.ok();
  },

  new: function (req, res) {
    board = new Board();
    sails.sockets.blast('new', board);
    return res.ok();
  },
};

