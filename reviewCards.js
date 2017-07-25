var fs = require('fs');
var inquirer = require('inquirer');
var basicArray = [];
var clozeArray = [];

var reviewType = function() {
    inquirer.prompt([
      {
        type: 'list',
        message: 'What set of flash cards do you want to review?',
        choices: ['Basic Cards', 'Cloze Cards'],
        name: 'choice',
      },
    ]).then(function(inquirerResponse) {
      switch (inquirerResponse.choice) {
        case 'Basic Cards':
          reviewBasic();
        break;

        case 'Cloze Cards':
          reviewCloze();

        break;
      };
    });
  };

var reviewBasic = function() {
    fs.readFile('./basic_log.json', function(error, data) {
      if (error) {
        return console.log(error)
      }
      var newstr = data.toString();
      var newArray = newstr.split(';');
      newArray.splice(-1, 1);
      for (i = 0; i < newArray.length; i++) {
        var parsedObj = JSON.parse(newArray[i]);
        basicArray.push(parsedObj);
      };
      console.log(basicArray);
    });
  };

var reviewCloze = function() {
    fs.readFile('./cloze_log.json', function(error, data) {
      if (error) {
        return console.log(error);
      }
      var newstr = data.toString();
      var newArray = newstr.split(';');
      newArray.splice(-1, 1);
      for (i = 0; i < newArray.length; i++) {
        var parsedObj = JSON.parse(newArray[i]);
        clozeArray.push(parsedObj);
      };
      console.log(clozeArray);
    });
  };

module.exports = reviewType;
