var inquirer = require('inquirer');
var BasicCard = require('./BasicCard.js');
var ClozeCard = require('./ClozeCard.js');

// var newBasicCard = BasicCard (
//   'Who was the first president of the United States?',
//   'George Washington'
// );

// newBasicCard.printCard();

inquirer.prompt([
  {
  type: 'input',
  message: 'What is the question to display on front of card',
  name: 'front',
},
  {
    type: 'input',
    message: 'What is the answer to display on back of card',
    name: 'back',
  },
]) .then(function(inquirerAnswers) {
  var newBasicCard = BasicCard (inquirerAnswers.front, inquirerAnswers.back);
  newBasicCard.printCard();
});
