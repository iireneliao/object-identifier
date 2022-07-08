// CSSI Day 13/14: CYOA, ML emojis
// Made following the tutorial here: https://www.youtube.com/watch?v=kwcillcWOg0

/*
global createCanvas, background, ml5, createButton, nf, createDiv, mouseIsPressed, strokeWeight, mouseX, mouseY, pmouseX, pmouseY, line, createCapture, VIDEO, width, image, height, filter, THRESHOLD
*/

// Video
let clearButton;
let canvas;

let doodleClassifier;
let resultsDiv;

let video;

function setup() {
  canvas = createCanvas(400, 400);
  clearButton = createButton('clear');
  clearButton.mousePressed(clearCanvas);
  background(255);
  doodleClassifier = ml5.imageClassifier('DoodleNet', modelReady);
  resultsDiv = createDiv('model loading');
  // video = createCapture(VIDEO);
  // video.hide();
}

function modelReady() {
  console.log('model loaded');
  doodleClassifier.classify(canvas, gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  console.log(results);
  let content = `${results[0].label}
                 ${nf(100*results[0].confidence, 2, 0)}%<br/>
                 ${results[1].label}
                 ${nf(100*results[1].confidence, 2, 0)}%`;
  resultsDiv.html(content);
  doodleClassifier.classify(canvas, gotResults);
}

function clearCanvas() {
  background(255);
}

function draw() {
  // image(video, 0, 0, width, height);
  // filter(THRESHOLD, 0.7);
  if (mouseIsPressed) {
    strokeWeight(16);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}
