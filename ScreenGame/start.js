class Start {
    constructor(game, x, y) {
        this.game = game;

        // Adjusted bounding box positions based on PARAMS.CANVAS_WIDTH and PARAMS.CANVAS_HEIGHT
        this.startBB = new BoundingBox(PARAMS.CANVAS_WIDTH / 2 - 150, PARAMS.CANVAS_HEIGHT / 2 - 75, 300, 50);
        this.aboutBB = new BoundingBox(PARAMS.CANVAS_WIDTH / 2 - 150, PARAMS.CANVAS_HEIGHT / 2 + 25, 300, 50);
        this.creditBB = new BoundingBox(PARAMS.CANVAS_WIDTH / 2 - 150, PARAMS.CANVAS_HEIGHT / 2 + 125, 300, 50);

        this.clickOnStart = false;
        this.clickOnAbout = false;
        this.clickOnCredit = false;
    }

    update() {
        if (this.game.click) {
                const mouseBB = new BoundingBox(this.game.click.x, this.game.click.y, 1, 1);
            console.log(this.game.click);
            if (mouseBB.collide(this.startBB) && !this.clickOnStart) {
                this.game.camera.loadMap();
                this.clickOnStart = true;
                this.removeFromWorld = true;
            } else if (mouseBB.collide(this.aboutBB) && !this.clickOnAbout) {
                this.game.addEntity(new About(this.game));
                this.clickOnAbout = true;
                console.log("MOUSE CLICK ON ABOUT");
                this.removeFromWorld = true;
            } else if (mouseBB.collide(this.creditBB) && !this.clickOnCredit) {
                this.game.addEntity(new Credit(this.game));
                this.clickOnCredit = true;
                console.log("MOUSE CLICK ON CREDIT");
                this.removeFromWorld = true;
            }

            // Reset click
            this.game.click = null;
        }
    }

    draw(ctx) {
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'red';
            ctx.strokeRect(PARAMS.CANVAS_WIDTH / 2 - 150, PARAMS.CANVAS_HEIGHT / 2 - 75, 300, 50);
            ctx.strokeRect(PARAMS.CANVAS_WIDTH / 2 - 150, PARAMS.CANVAS_HEIGHT / 2 + 25, 300, 50);
            ctx.strokeRect(PARAMS.CANVAS_WIDTH / 2 - 150, PARAMS.CANVAS_HEIGHT / 2 + 125, 300, 50);
        }

        ctx.font = '25px "Press Start 2P"';
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);

        ctx.fillStyle = 'white';
        ctx.fillRect(PARAMS.CANVAS_WIDTH / 2 - 150, PARAMS.CANVAS_HEIGHT / 2 - 75, 300, 50);
        ctx.fillRect(PARAMS.CANVAS_WIDTH / 2 - 150, PARAMS.CANVAS_HEIGHT / 2 + 25, 300, 50);
        ctx.fillRect(PARAMS.CANVAS_WIDTH / 2 - 150, PARAMS.CANVAS_HEIGHT / 2 + 125, 300, 50);

        ctx.fillStyle = "green";
        ctx.fillRect(PARAMS.CANVAS_WIDTH / 2 - 150, PARAMS.CANVAS_HEIGHT / 2 - 75, 300, 50);
        ctx.fillStyle = 'white';
        ctx.fillText("Start", PARAMS.CANVAS_WIDTH / 2 - 300/4, PARAMS.CANVAS_HEIGHT / 2 - 45 + 7);

        ctx.fillStyle = "green";
        ctx.fillRect(PARAMS.CANVAS_WIDTH / 2 - 150, PARAMS.CANVAS_HEIGHT / 2 + 25, 300, 50);
        ctx.fillStyle = 'white';
        ctx.fillText("About", PARAMS.CANVAS_WIDTH / 2 - 300/4, PARAMS.CANVAS_HEIGHT / 2 + 55+ 7);

        ctx.fillStyle = "green";
        ctx.fillRect(PARAMS.CANVAS_WIDTH / 2 - 150, PARAMS.CANVAS_HEIGHT / 2 + 125, 300, 50);
        ctx.fillStyle = 'white';
        ctx.fillText("Credit", PARAMS.CANVAS_WIDTH / 2 -300/4, PARAMS.CANVAS_HEIGHT / 2 + 155 + 7);
    }
}

class About {
    constructor(game, x, y) {
        this.game = game;

        // Updated exitBB to bottom right
        this.exitBB = new BoundingBox(PARAMS.CANVAS_WIDTH - 190, PARAMS.CANVAS_HEIGHT - 80, 140, 60);
        this.clickOnExit = false;
    }

    update() {
        console.log(this.game.camera.enities);
        if (this.game.click) {
            const mouseBB = new BoundingBox(this.game.click.x, this.game.click.y, 1, 1);

            if (mouseBB.collide(this.exitBB) && !this.clickOnExit) {
                 this.clickOnExit = true;
                this.game.addEntity(new Start(this.game));
                this.removeFromWorld = true;
                console.log("click exit");
            }

            // Reset click
            this.game.click = null;
        }
    }

    draw(ctx) {
        ctx.font = '25px "Press Start 2P"';
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);

        // Draw Information Text
        ctx.fillStyle = 'white';
         // Centered text
         ctx.fillText("The character is a CS graduate who cannot find a job", PARAMS.CANVAS_WIDTH / 2 - ctx.measureText("The character is a CS graduate who cannot find a job").width / 2, 350 * 0.75);
         ctx.fillText("So, he decides to return and help his family's farm", PARAMS.CANVAS_WIDTH / 2 - ctx.measureText("So, he decides to return and help his family's farm").width / 2, 450 * 0.75);
        ctx.fillText("However, they don't tell him what happens to the farm at night.", PARAMS.CANVAS_WIDTH / 2 - ctx.measureText("However, they don't tell him what happens to the farm at night.").width / 2, 550 * 0.75);

        // Draw Exit Box at bottom right (moved 50px to the left)
        ctx.fillStyle = "green";
        ctx.fillRect(PARAMS.CANVAS_WIDTH - 190, PARAMS.CANVAS_HEIGHT - 80, 140, 60);
        ctx.fillStyle = 'white';

        // Centering text within the box
        const exitText = "Exit";
        const exitTextWidth = ctx.measureText(exitText).width;
        const exitTextHeight = 25; // Assuming the font size is 25px
        ctx.fillText(exitText, PARAMS.CANVAS_WIDTH - 190 + (140 - exitTextWidth) / 2, PARAMS.CANVAS_HEIGHT - 80 + (60 + exitTextHeight) / 2);

        // Debug Rectangle
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'red';
            ctx.strokeRect(PARAMS.CANVAS_WIDTH - 190, PARAMS.CANVAS_HEIGHT - 80, 140, 60);
        }
    }
}






class Credit {
    constructor(game, x, y) {
        this.game = game;
        this.exit = false;
        this.exitBB = new BoundingBox(PARAMS.CANVAS_WIDTH - 190, PARAMS.CANVAS_HEIGHT - 80, 140, 60);

    }

    update() {
        if (this.game.click) {
            const mouseBB = new BoundingBox(this.game.click.x, this.game.click.y, 1, 1);

            if (mouseBB.collide(this.exitBB)) {
                this.clickOnExit = true;
                this.game.addEntity(new Start(this.game));
                this.removeFromWorld = true;
                console.log("MOUSE CLICK ON EXIT");
            } 

            // Reset click
            this.game.click = null;
        }
    }

    draw(ctx) {
     

        ctx.font = '25px "Press Start 2P"'
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);

   
       ctx.fillStyle = 'white';
          // Centered text
          ctx.fillText("This game is created By:", PARAMS.CANVAS_WIDTH / 2 - ctx.measureText("This game is created By:").width / 2, 390 * 0.75);
          ctx.fillText("Tin Phu, Thinh Le, Lixin Wang", PARAMS.CANVAS_WIDTH / 2 - ctx.measureText("Tin Phu, Thinh Le, Lixin Wang").width / 2, 490 * 0.75);
     // Draw Exit Box at bottom right (moved 50px to the left)
     ctx.fillStyle = "green";
     ctx.fillRect(PARAMS.CANVAS_WIDTH - 190, PARAMS.CANVAS_HEIGHT - 80, 140, 60);
     ctx.fillStyle = 'white';

     // Centering text within the box
     const exitText = "Exit";
     const exitTextWidth = ctx.measureText(exitText).width;
     const exitTextHeight = 25; // Assuming the font size is 25px
     ctx.fillText(exitText, PARAMS.CANVAS_WIDTH - 190 + (140 - exitTextWidth) / 2, PARAMS.CANVAS_HEIGHT - 80 + (60 + exitTextHeight) / 2);
   
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'red';
            ctx.strokeRect(PARAMS.CANVAS_WIDTH - 190, PARAMS.CANVAS_HEIGHT - 80, 140, 60);
           
            
        }
    }


}
