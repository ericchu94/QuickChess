/**
 * GameController
 *
 * @description :: Server-side logic for managing games
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Chance = require('chance');
var chance = new Chance();
var name = chance.name();

var spectators = [chance.name(), chance.name(), chance.name(), chance.name()];

module.exports = {
  home: function(req, res) {
    return res.view({
      //todo: 'Not implemented yet!',
      specs: spectators,
    });
  },
};

