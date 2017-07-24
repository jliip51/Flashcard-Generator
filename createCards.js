var inquirer = require('inquirer');
var BasicCard = require('./BasicCard.js');
var ClozeCard = require('./ClozeCard.js');

var createType = function() {
    inquirer.prompt([
      {
        type: 'list',
        message: 'What type of flash cards do you want to create?',
        choices: ['Basic Cards', 'Cloze Cards'],
        name: 'choice',
      },
    ]).then(function(inquirerResponse) {
      switch (inquirerResponse.choice) {
        case 'Basic Cards':
          createBasic();
        break;

        case 'Cloze Cards':
          createCloze();
        break;
      };
    });
  };

var createBasic = function() {
    inquirer.prompt([
      {
        type: 'input',
        message: 'What is the question to display on front of card?',
        name: 'front',
      },
      {
        type: 'input',
        message: 'What is the answer to display on back of card?',
        name: 'back',
      },
    ]).then(function(inquirerAnswers) {
        var newBasicCard = BasicCard(inquirerAnswers.front, inquirerAnswers.back);
        newBasicCard.printCard();
        newBasicCard.storeCard();
      });
  };

var createCloze = function() {
    inquirer.prompt([
      {
        type: 'input',
        message: 'Type the complete statement (final answer). Must include the cloze answer',
        name: 'fullText',
      },
      {
        type: 'input',
        message: 'Type the cloze answer exactly the same as the full text statement',
        name: 'cloze',
      },
    ]).then(function(inquirerAnswers) {
        var newClozeCard = ClozeCard(inquirerAnswers.fullText, inquirerAnswers.cloze);
        newClozeCard.printCard();
        newClozeCard.storeCard();
      });
  };

module.exports = createType;
