//Basic Flash Card Constructor
var BasicCard = function(front, back) {
  if (!new.target) {
    return new BasicCard(front, back);
  }
  this.front = front;
  this.back = back;
  this.printCard = function() {
    console.log('New Basic Flash Card Created:');
    console.log(`Q: ${this.front}`);
    console.log(`A: ${this.back}`);
  };
};

module.exports = BasicCard;
