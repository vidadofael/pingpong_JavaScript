    const canvasEl = document.getElementById("canvas"),
    canvasCtx = canvas.getContext("2d"),
    collorField = "#015E4D",
    whiteCollor = "#FFFFFF",
    collorScore = "#003027";
    gapX =  10;

    const lineWidth = 15;
    const widthRackets = lineWidth;
    const heightRackets = 200;

    //parameters for mouse movement to animate the left racket
    const mouse = {
        x: 0,
        y: 0
    }

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

        //left paddle movement and centering the mouse
        _move: function() {
            this.y = mouse.y- this.h / 2
        },

        draw: function() {
            //drawing the left racket of the game
            //  canvasCtx.fillRect(x, y, whidth element, heigth element)
            canvasCtx.fillStyle = whiteCollor;
            canvasCtx.fillRect(this.x, this.y, this.w, this.h)

            //calls the method to animate the left racket
            this._move()
        }
    }

    //Object RacketRight
    //building the right racket as an object on the field
    const rightPaddle = {
        x: field.w - lineWidth - 10,
        y: 0, //depois será de acordo com o movimento da bola do jogo
        w: widthRackets,
        h: heightRackets,

        //animating the right racket based on the movement of the game ball
        _move: function() {
            this.y = ball.y //In the future I need to update the rule so that the computer loses the game too
        },
        draw() {
            canvasCtx.fillStyle = whiteCollor;
            canvasCtx.fillRect(this.x, this.y, this.w, this.h)
            this._move()
        }
    }

    //drawing the game ball
    /*  canvasCtx.beginPath();
    canvasCtx.arc(x, y, r, 0, 2 * Math.PI, false);
    canvasCtx.fill();*/

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

        scoreP1: 0,
        scoreP2: 0,
        
        fontScore: "bold 64px Arial",

        scoreP1X: field.w / 4,
        scoreP2X: field.w / 4 + field.w / 2,

        scoreP1Y: field.h - 120,
        scoreP2Y: field.h - 120,
        
        increaseHuman: function() {
            this.scoreP1++
        },
        increaseComputer: function() {
            this.scoreP2++
        },

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
    const ball = {
        x: 0,
        y: 0,
        r: 20,

        //speed of ball
        speed: 5,

        //sets the direction of the game ball
        directionY: 1,
        directionX: 1,

        //calculates the position of the game ball by checking whether it should change route (change x or y) when it hits the sides
        _calcPosition: function() {
            //checking whether the player scored a point (x > field width)
            if(this.x > field.w - this.r - rightPaddle.w - gapX) {
                //checks if the right racket is in the y position of the game ball
                if(this.y + this.r > rightPaddle.y &&
                    this.y - this.r < rightPaddle.y + rightPaddle.h
                ) {
                    //hits the racket
                    this._reverseX()
                } else {
                    //increase one point to the player
                    score.increaseHuman()
                    this._pointUp()
                }
            }

            //checking whether the player scored a point ( x < 0)
            if( this.x < this.r + leftPaddle.w + gapX ) {
                //check if the left racket is in position y of the ball
                if (
                    this.y + this.r > leftPaddle.y &&
                    this.y - this.r < leftPaddle.y + leftPaddle.h)
                    {
                        //hits the ball and reverses the x direction
                        this._reverseX()
                    } else {
                        score.increaseComputer()
                        this._pointUp()
                    }

            }

            //this.y comes from the move function
            //checks the position of the game ball so that the reversal can happen (top and bottom of the screen)
            if(
                (this.y - this.r < 0 && this.directionY < 0) ||
                (this.y > field.h - this.r && this.directionY > 0)) {
                this._reverseY()
            }
        },
        //will reverse the value of Y so that the Y position of the game ball changes the direction of Y
        _reverseY: function() {
            this.directionY *= -1
            // 1 * -1 = - 1
            // -1 * -1 = 1
        },
        //will reverse the value of X so that the X position of the game ball changes the direction of X
        _reverseX: function() {
            this.directionX *= -1
            // 1 * -1 = - 1
            // -1 * -1 = 1
        },

        //increases the speed and level of the game every time the computer makes a point
        _speedUp: function() {
            this.speed += 3
        },

        //resets the starting position of the game ball to the center of the field
        _pointUp: function() {
            this._speedUp()
            this.x = field.w / 2  
            this.y = field.h / 2
        },

        //animate
        _move: function() {
            this.x += this.directionX * this.speed;
            this.y += this.directionY * this.speed;
        },
        
        
        draw: function() {
            canvasCtx.beginPath();
            canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
            canvasCtx.fill();
            
            //every time the ball is drawn, the movement update is done here
            this._move()

            //calls the function that guides the game ball so that it obeys the bouncing rules at the top and bottom of the screen
            this._calcPosition()
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

//smoothing out the animation
window.animateFrame = (function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame || //google chrome
        window.mozRequestAnimationFrame || //mozzila
        window.oRequestAnimateFrame || //opera
        window.msRequestAnimateFrame || //microsoft explorer
        function (callback) {
            return window.setTimeout(callback, 1000 / 600)
        }
    )
})();

function main() {
    animateFrame(main) //main = callback executada no setTimeout
    draw()
}

setUp()
main()


//paying mouse movement and setting x and y parameters
canvasEl.addEventListener('mousemove', function(e) {
    mouse.x = e.pageX
    mouse.y = e.pageY
    console.log(mouse)
})