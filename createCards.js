var inquirer = require('inquirer');
var BasicCard = require('./BasicCard.js');
var ClozeCard = require('./ClozeCard.js');
var cardCount = 0;

var createType = function() {
    inquirer.prompt([
      {
        type: 'list',
        message: 'What type of flash cards do you want to create?',
        choices: ['Basic Cards', 'Cloze Cards'],
        name: 'choice',
      },
      {
        type: 'input',
        message: 'How many cards do you want to create?',
        name: 'cardCount',
        validate: function(value) {
          if (isNaN(value) || parseInt(value) === 0) return false;
          return true;
        }
      },
    ]).then(function(inquirerResponse) {
      cardCount = parseInt(inquirerResponse.cardCount);
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
  if (cardCount !== 0) {
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
        validate: function(value) {
          if(value) return true;
          return false;
        }
      },
    ]).then(function(inquirerAnswers) {
        var newBasicCard = new BasicCard(inquirerAnswers.front, inquirerAnswers.back);
        newBasicCard.printCard();
        newBasicCard.storeCard();
        cardCount--;
        console.log(`${cardCount} cards to create`);
        createBasic();
      });
    } else {
      console.log('All cards have been created.');
    };
  };

var createCloze = function() {
    if (cardCount !== 0) {
      inquirer.prompt([
      {
        type: 'input',
        message: 'Type the complete statement. MUST include the cloze deletion answer.',
        name: 'fullText',
      },
      {
        type: 'input',
        message: 'Type the cloze answer exactly the same as the complete statement.',
        name: 'cloze',
        validate: function(value) {
          if(value) return true;
          return false
        }
      },
    ]).then(function(inquirerAnswers) {
        var testCloze = inquirerAnswers.fullText.includes(inquirerAnswers.cloze);
        console.log(testCloze);
        if (testCloze === true) {
          var newClozeCard = new ClozeCard(inquirerAnswers.fullText, inquirerAnswers.cloze);
          newClozeCard.printCard();
          newClozeCard.storeCard();
          cardCount--;
          console.log(`${cardCount} cards to create`);
          createCloze();
        } else {
          console.log('The complete statement must include the cloze deletion answer. Try again.');
          createCloze();
        };
      });
    } else {
      console.log('All cards have been created.');
    };
  };

module.exports = createType;
