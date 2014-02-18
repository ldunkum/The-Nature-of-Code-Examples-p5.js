// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Mover object
var bob;

// Spring object
var spring;

function setup()  {
  createGraphics(640, 360);
  // Create objects at starting location
  // Note third argument in Spring constructor is "rest length"
  spring = new Spring(width/2, 10, 100);
  bob = new Bob(width/2, 100);
}

function draw() {
  background(255);

  // Apply a gravity force to the bob
  var gravity = new PVector(0,2);
  bob.applyForce(gravity);
  
  // Connect the bob to the spring (this calculates the force)
  spring.connect(bob);
  // Constrain spring distance between min and max
  spring.constrainLength(bob, 30, 200);
  
  // Update bob
  bob.update();
  
  // Draw everything
  spring.displayLine(bob); // Draw a line between spring and bob
  bob.display();
  spring.display();
  
  fill(0);
  text("click on bob to drag", 10, height-5);
}

function mousePressed() {
  bob.handleClick(mouseX, mouseY);
}

function mouseDragged() {
  bob.handleDrag(mouseX, mouseY);
}

function mouseReleased() {
  bob.stopDragging();
}
