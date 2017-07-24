var fs = require('fs');
var inquirer = require('inquirer');
var basicArray = [];

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
    fs.readFile('./basic_log.json', function(error, obj) {
      if (error) {
        return console.log(error)
      }
      var newstr = obj.toString();
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
    console.log('review cloze');
    // fs.readFile('./basic_log.txt', function(error, obj) {
    //   if (error) {
    //     return console.log(error)
    //   }
    //   var newstr = obj.toString();
    //   var newArray = newstr.split(';');
    //   newArray.splice(-1, 1);
    //   for (i = 0; i < newArray.length; i++) {
    //     var parsedObj = JSON.parse(newArray[i]);
    //     basicArray.push(parsedObj);
    //   };
    //   console.log(basicArray);
    // });
  };

module.exports = reviewType;
