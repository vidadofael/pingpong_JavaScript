const canvasEl = document.getElementById("canvas"),
    canvasCtx = canvas.getContext("2d"),
    collorField = "#015E4D",
    whiteCollor = "#FFFFFF",
    collorScore = "#003027";

    const lineWidth = 15;
    const widthRackets = lineWidth;
    const heightRackets = 200;

function setUp() {
  canvasEl.width = canvasCtx.width = window.innerWidth;
  canvasEl.height = canvasCtx.height = window.innerHeight;
};

//drawing rectangle
function draw() {
    canvasCtx.fillStyle = collorField;
    canvasCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    //drawing the center line
    //  canvasCtx.fillRect(x, y, whidth element, heigth element);
    canvasCtx.fillStyle = whiteCollor;
    canvasCtx.fillRect(window.innerWidth / 2 - lineWidth / 2, 0, lineWidth, window.innerHeight);

    //drawing the left racket of the game
    //  canvasCtx.fillRect(x, y, whidth element, heigth element)
    canvasCtx.fillStyle = whiteCollor;
    canvasCtx.fillRect(10, 400, widthRackets, heightRackets)

    //drawing the right racket of the game
    //  canvasCtx.fillRect(x, y, whidth element, heigth element)
    canvasCtx.fillStyle = whiteCollor;
    canvasCtx.fillRect(window.innerWidth - lineWidth - 10, 600, widthRackets, heightRackets)

    //drawing the game ball
    /*  canvasCtx.beginPath();
        canvasCtx.arc(x, y, r, 0, 2 * Math.PI, false);
        canvasCtx.fill();*/
    canvasCtx.beginPath();
    canvasCtx.arc(100, 200, 20, 0, 2 * Math.PI, false);
    canvasCtx.fill();

    //drawing the game score
    canvasCtx.fillStyle = collorScore;
    canvasCtx.font = "bold 64px Arial";
    canvasCtx.textAlign = "center";
    canvasCtx.textBaseline = "top";
    canvasCtx.fillText('3', window.innerWidth / 4, window.innerHeight - 120);
    canvasCtx.fillText('6', window.innerWidth / 4 + window.innerWidth / 2, window.innerHeight - 120);
    canvasCtx.font = "bold 32px Arial";
    canvasCtx.fillText('human', window.innerWidth / 4, window.innerHeight - 50);
    canvasCtx.fillText('computer', window.innerWidth / 4 + window.innerWidth / 2, window.innerHeight - 50);
};

//calling functions
setUp();
draw();