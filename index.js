const canvasEl = document.getElementById("canvas"),
    canvasCtx = canvas.getContext("2d"),
    collorField = "#015E4D",
    collorCenterLine = "#FFFFFF";
    const lineWidth = 15;

function setUp() {
  canvasEl.width = canvasCtx.width = window.innerWidth;
  canvasEl.height = canvasCtx.height = window.innerHeight;
};

//drawing rectangle
function draw() {
    canvasCtx.fillStyle = collorField;
    canvasCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    //drawing the center line
    canvasCtx.fillStyle = collorCenterLine;
    canvasCtx.fillRect(window.innerWidth / 2 - lineWidth / 2, 0, lineWidth, window.innerHeight);
};

//calling functions
setUp();
draw();