const canvasEl = document.getElementById("canvas"),
    canvasCtx = canvas.getContext("2d"),
    collorField = "#015E4D";


function setUp() {
  canvasEl.width = canvasCtx.width = window.innerWidth;
  canvasEl.height = canvasCtx.height = window.innerHeight;
};

//drawing rectangle
function draw() {
    canvasCtx.fillStyle = collorField;
    canvasCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);
};

//calling functions
setUp();
draw();