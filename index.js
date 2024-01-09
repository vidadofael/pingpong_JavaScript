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
        x: 50,
        y: 50,
        r: 20,

        //speed of ball
        speed: 10,

        //animate
        _move: function() {
            this.x += 1 * this.speed;
            this.y += 1 * this.speed;
        },

        draw: function() {
            canvasCtx.beginPath();
            canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
            canvasCtx.fill();

            //every time the ball is drawn, the movement update is done here
            this._move()
        }
    }
    
    //drawing the game score
    const score = {
        position: "center",
        basePosition: "top",

        player1: "human",
        player2: "computer",
        
        fontPlayer: "bold 32px Arial",

        player1X: field.w / 4,
        player2X: field.w / 4 + field.w / 2,
        
        player1Y: field.h - 50,
        player2Y: field.h - 50,

        scoreP1: "3",
        scoreP2: "6",
        
        fontScore: "bold 64px Arial",

        scoreP1X: field.w / 4,
        scoreP2X: field.w / 4 + field.w / 2,

        scoreP1Y: field.h - 120,
        scoreP2Y: field.h - 120,
        
        draw: function() {
            //canvasCtx.fillText(name, x, y;
            canvasCtx.fillStyle = collorScore;
            canvasCtx.font = this.fontScore;
            canvasCtx.textAlign = this.position;
            canvasCtx.textBaseline = this.basePosition;
            
            //points
            canvasCtx.font = this.fontPlayer;
            canvasCtx.fillText(this.player1, this.player1X, this.player1Y);
            canvasCtx.fillText(this.player2, this.player2X, this.player2Y);

            //player name
            canvasCtx.font = this.fontScore;
            canvasCtx.fillText(this.scoreP1, this.scoreP1X, this.scoreP1Y);
            canvasCtx.fillText(this.scoreP2, this.scoreP2X, this.scoreP2Y);
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

    score.draw()   
};

//calling functions
setUp();
draw();

//smoothing out the animation
window.animateFrame = (function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame || //google chrome
        window.mozRequestAnimationFrame || //mozzila
        window.oRequestAnimateFrame || //opera
        window.msRequestAnimateFrame || //microsoft explorer
        function (callback) {
            return window.setTimeout(callback, 1000 / 60)
        }
    )
})();

function main() {
    animateFrame(main) //main = callback executada no setTimeout
    draw()
}

setUp()
main()
