var fs = require('fs');
var inquirer = require('inquirer');
var basicArray = [];
var basicCount = basicArray.length;
var basicIndex = 0;
var clozeArray = [];
var clozeCount = clozeArray.length;
var clozeIndex = 0;

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
          requestBasic();
        break;

        case 'Cloze Cards':
          requestCloze();
        break;
      };
    });
  };

var requestBasic = function() {
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
      basicCount = basicArray.length;
      reviewBasic();
    });
  };

var requestCloze = function() {
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
      clozeCount = clozeArray.length;
      reviewCloze();
    });
  };

var reviewBasic = function() {
  if (basicCount > 0) {
    console.log('\nQuestion: ' + basicArray[basicIndex].front + '\n');
    inquirer.prompt([
    {
      'type': 'input',
      'message': 'Show answer? [y]',
      'name' : 'show',
      validate: function(value) {
        if (value === "y") return true;
        return false;
      }
    },
    ]).then(function(inquirerResponse) {
     console.log('\nAnswer: ' + basicArray[basicIndex].back  + '\n');
     basicCount--;
     basicIndex++;
     reviewBasic();
    });
  } else {
      console.log("Great Job!");
    };
};

module.exports = reviewType;
