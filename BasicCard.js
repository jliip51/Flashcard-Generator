var fs = require('fs');

//Basic Flash Card Constructor
var BasicCard = function(front, back) {
  if (!new.target) {
    return new BasicCard(front, back);
  }
  this.front = front;
  this.back = back;
};

BasicCard.prototype.printCard = function() {
  console.log('New Basic Flash Card Created:');
  console.log(`Q: ${this.front}`);
  console.log(`A: ${this.back}`);
};

BasicCard.prototype.storeCard = function() {
  var obj = {'front': this.front,'back': this.back};
  var json = JSON.stringify(obj);

  fs.appendFile('./basic_log.json', json + ';', function(error) {
    if (error) console.log(error);
  });
};

module.exports = BasicCard;
