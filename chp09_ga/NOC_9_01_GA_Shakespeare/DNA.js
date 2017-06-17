// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// A class to describe a pseudo-DNA, i.e. genotype
//   Here, a virtual organism's DNA is an array of character.
//   Functionality:
//      -- convert DNA into a string
//      -- calculate DNA's "fitness"
//      -- mate DNA with another set of DNA
//      -- mutate DNA

function newChar() {

  var generatedChar = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,.?!äÄüÜöÖçÇãÃéÉóÓ ";

  generatedChar = possible.charAt(Math.floor(Math.random() * possible.length));


 /* var c = floor(random(63,165));
  if (c === 63) c = 32;   // space
  if (c === 64) c = 46;   // dot
  if (c === 123) c = 44;  // comma
  if (c === 124) c = 39;  // apostrophe
  if (c === 125) c = 33;  // bang
  if (c === 126) c = 63;  // question mark=

  return String.fromCharCode(c);*/

  return generatedChar;
}

// Constructor (makes a random DNA)
function DNA(num) {
  // The genetic sequence
  this.genes = [];
  this.fitness = 0;
  for (var i = 0; i < num; i++) {
    this.genes[i] = newChar();  // Pick from range of chars
    }

  // Converts character array to a String
  this.getPhrase = function() {
    return this.genes.join("");
  }

  // Fitness function (returns floating point % of "correct" characters)
  this.calcFitness = function(target) {
     var score = 0;
     for (var i = 0; i < this.genes.length; i++) {
        if (this.genes[i] == target.charAt(i)) {
          score++;
        }
     }
     this.fitness = score / target.length;
  }

  // Crossover
  this.crossover = function(partner) {
    // A new child
    var child = new DNA(this.genes.length);
    
    var midpoint = floor(random(this.genes.length)); // Pick a midpoint
    
    // Half from one, half from the other
    for (var i = 0; i < this.genes.length; i++) {
      if (i > midpoint) child.genes[i] = this.genes[i];
      else              child.genes[i] = partner.genes[i];
    }
    return child;
  }

  // Based on a mutation probability, picks a new random character
  this.mutate = function(mutationRate) {
    for (var i = 0; i < this.genes.length; i++) {
      if (random(1) < mutationRate) {
        this.genes[i] = newChar();
      }
    }
  }
}
