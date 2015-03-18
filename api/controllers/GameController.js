/**
 * GameController
 *
 * @description :: Server-side logic for managing games
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Chance = require('chance');
var chance = new Chance();
var name = chance.name();
var defaultBoard = [
  [
    { color: "white", piece: "r" },
    { color: "white", piece: "n" },
    { color: "white", piece: "b" },
    { color: "white", piece: "q" },
    { color: "white", piece: "k" },
    { color: "white", piece: "b" },
    { color: "white", piece: "n" },
    { color: "white", piece: "r" },
  ],
  [
    { color: "white", piece: "p" },
    { color: "white", piece: "p" },
    { color: "white", piece: "p" },
    { color: "white", piece: "p" },
    { color: "white", piece: "p" },
    { color: "white", piece: "p" },
    { color: "white", piece: "p" },
    { color: "white", piece: "p" },
  ],
  [ null, null, null, null, null, null, null, null, null ],
  [ null, null, null, null, null, null, null, null, null ],
  [ null, null, null, null, null, null, null, null, null ],
  [ null, null, null, null, null, null, null, null, null ],
  [
    { color: "black", piece: "p" },
    { color: "black", piece: "p" },
    { color: "black", piece: "p" },
    { color: "black", piece: "p" },
    { color: "black", piece: "p" },
    { color: "black", piece: "p" },
    { color: "black", piece: "p" },
    { color: "black", piece: "p" },
  ],
  [
    { color: "black", piece: "r" },
    { color: "black", piece: "n" },
    { color: "black", piece: "b" },
    { color: "black", piece: "q" },
    { color: "black", piece: "k" },
    { color: "black", piece: "b" },
    { color: "black", piece: "n" },
    { color: "black", piece: "r" },
  ],
];

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
      //todo: 'Not implemented yet!',
      specs: spectators.join(', '),
      board: defaultBoard,
    });
  },

  move: function (req, res) {
    var start = getCoord(req.body.start);
    var end = getCoord(req.body.end);

    if (!start || !end) {
      return res.badRequest();
    }

    sails.sockets.blast('move', {
      start: start,
      end: end,
    }, req.socket);
    return res.ok();
  }
};

