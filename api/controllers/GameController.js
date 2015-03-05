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

module.exports = {
  home: function(req, res) {
    return res.view({
      //todo: 'Not implemented yet!',
      specs: spectators.join(', '),
      board: defaultBoard,
    });
  },
};

