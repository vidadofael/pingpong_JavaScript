    const canvasEl = document.getElementById("canvas"),
    canvasCtx = canvas.getContext("2d"),
    collorField = "#015E4D",
    whiteCollor = "#FFFFFF",
    collorScore = "#003027";
    gapX =  10;

    const lineWidth = 15;
    const widthRackets = lineWidth;
    const heightRackets = 200;


    //Object Field
    // building the field object
    const field =  {
        x: 0,
        y: 0,
        w: window.innerWidth,
        h: window.innerHeight,
        draw: function() {
            canvasCtx.fillStyle = collorField;
            canvasCtx.fillRect(this.x, this.y, this.w, this.h);
        }
    }

    //Object Center Line
    //building the center line
    const centerLine = {
        x: window.innerWidth / 2 - lineWidth / 2,
        y: 0,
        w: lineWidth,
        h: field.h,
        draw: function() {
            //  canvasCtx.fillRect(x, y, whidth element, heigth element);
            canvasCtx.fillStyle = whiteCollor;
            canvasCtx.fillRect(this.x, this.y, this.w, this.h);
        }
    }

    //Object RacketLeft
    //building the left racket as an object on the field
    const leftPaddle = {
        x: gapX,
        y: 360, //vai alterar com o movimento do mouse
        w: widthRackets,
        h: heightRackets,
        draw: function() {
            //drawing the left racket of the game
            //  canvasCtx.fillRect(x, y, whidth element, heigth element)
            canvasCtx.fillStyle = whiteCollor;
            canvasCtx.fillRect(this.x, this.y, this.w, this.h)
        }
    }

    //Object RacketRight
    //building the right racket as an object on the field
    const rightPaddle = {
        x: field.w - lineWidth - 10,
        y: 600, //depois será de acordo com o movimento da bola do jogo
        w: widthRackets,
        h: heightRackets,
        draw() {
            canvasCtx.fillStyle = whiteCollor;
            canvasCtx.fillRect(this.x, this.y, this.w, this.h)
        }
    }

    //drawing the game ball
    /*  canvasCtx.beginPath();
        canvasCtx.arc(x, y, r, 0, 2 * Math.PI, false);
        canvasCtx.fill();*/
    const ball = {
        x: 100,
        y: 200,
        r: 20,
        draw: function() {
            canvasCtx.beginPath();
            canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
            canvasCtx.fill();
        }

    }


function setUp() {
  canvasEl.width = canvasCtx.width = field.w;
  canvasEl.height = canvasCtx.height = field.h;
};

//drawing rectangle
function draw() {
    field.draw()
    centerLine.draw()
    leftPaddle.draw()
    rightPaddle.draw()
    ball.draw()

   

    

    

   

    //drawing the game score
    //canvasCtx.fillText(name, x, y;
    canvasCtx.fillStyle = collorScore;
    canvasCtx.font = "bold 64px Arial";
    canvasCtx.textAlign = "center";
    canvasCtx.textBaseline = "top";
    canvasCtx.fillText('3', field.w / 4, field.h - 120);
    canvasCtx.fillText('6', field.w / 4 + field.w / 2, field.h - 120);
    canvasCtx.font = "bold 32px Arial";
    canvasCtx.fillText('human', field.w / 4, field.h - 50);
    canvasCtx.fillText('computer', field.w / 4 + field.w / 2, field.h - 50);
};

//calling functions
setUp();
draw();