var fs = require('fs');

var ClozeCard = function(text, cloze) {
  if (!new.target) {
    return new ClozeCard(text, cloze);
  }
  this.cloze = cloze;
  this.fullText = text;
  this.partialText = text.replace(cloze, '____');
};

ClozeCard.prototype.printCard = function() {
  console.log('New Cloze Flash Card Created:');
  console.log(`Q: ${this.partialText}`);
  console.log(`A: ${this.cloze}`);
  console.log(`A: ${this.fullText}`);
};

ClozeCard.prototype.storeCard = function() {
  var obj = {'partialText': this.partialText,'cloze': this.cloze, 'fullText': this.fullText};
  var json = JSON.stringify(obj);

  fs.appendFile('./Cloze_log.json', json + ';', function(error) {
    if (error) console.log(error);
  });
};

module.exports = ClozeCard;





module.exports = ClozeCard;
