var inquirer = require('inquirer');
var createCards = require('./createCards.js');
var reviewCards = require('./reviewCards.js');

inquirer.prompt([
  {
    type: 'list',
    message: 'Do you want to create new cards or review cards?',
    choices: ['Create Cards', 'Review Cards'],
    name: 'choice',
  },
]).then(function(inquirerResponse) {
    switch (inquirerResponse.choice) {
      case 'Create Cards':
        createCards();
      break;

      case 'Review Cards':
        reviewCards();
      break;
    };
  });
