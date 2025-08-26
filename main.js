import { Application, Graphics, Text, Container } from 'https://cdn.jsdelivr.net/npm/pixi.js@8.x/dist/pixi.mjs';

(async () => {
    const app = new Application();

    await app.init({
        background: '#bcbec2',
        width: window.innerWidth,
        height: window.innerHeight,
     });

    document.body.appendChild(app.canvas);

    // Creates the ball.
    const ballSize = 25;
    const ball = new Graphics().circle(0, 0, ballSize).fill('red');

    // Initial position of the ball.
    ball.x = 100;
    ball.y = 100;

    // Variables for the physics and mouse tracking.
    let mouseX = 740;
    let mouseY = 300;
    let velocityX = 0;
    let velocityY = 0;

    // Acceleration is a mutable value and controlled by the buttons.
    let acceleration = 0.005;
    const minAcceleration = 0.001;
    const maxAcceleration = 0.02;
    const accelerationStep = 0.001; // How much it changes with each click.

    const friction = 0.9;

    // Adds the ball to the stage.
    app.stage.addChild(ball);

    // Mouse tracking using Pixi's InteractionManager.
    app.stage.interactive = true;
    app.stage.hitArea = app.screen;
    app.stage.on('pointermove', (event) => {
        mouseX = event.global.x;
        mouseY = event.global.y;
    });

    // --- Button Creation Logic ---
    const buttonWidth = 60;
    const buttonHeight = 60;
    const buttonColour = 0x8c8e91;
    const buttonTextColour = 0xFFFFFF;
    const buttonHoverColour = 0xA29BFE;
    const buttonPressedColour = 0x5C4CD7; // Slightly darker when pressed.
    const buttonTextSize = 30;
    const buttonMargin = 15; // The space between the buttons.

    // Button creation.
    function createButton(text, x, y, onClick){
        const button = new Container();
        button.x = x;
        button.y = y;
        button.interactive = true;
        button.cursor = 'pointer';

        // Draws the button rectangle.
        const buttonRect = new Graphics().rect(0, 0, buttonWidth, buttonHeight).fill(buttonColour);
        button.addChild(buttonRect);

        // Creates the text.
        const buttonTextObj = new Text({
            text: text,
            style: {
                fill: buttonTextColour,
                fontSize: buttonTextSize,
                align: 'center',
                fontWeight: 'bold',
            }
        });
        buttonTextObj.x = buttonWidth * 0.5;
        buttonTextObj.y = buttonHeight * 0.5;
        buttonTextObj.anchor.set(0.5); // Centres the text.
        button.addChild(buttonTextObj);

        // Interaction events.
        button
            .on('pointerdown', () => {
                buttonRect.tint = buttonPressedColour;
                button.scale.set(0.95); // Scales down slightly.
            })
            .on('pointerup', () => {
                buttonRect.tint = 0xFFFFFF; // Resets the tint on release.
                button.scale.set(1);
                onClick();
            })
            .on('pointerover', () => {
                buttonRect.tint = buttonHoverColour;
            })
            .on('pointerout', () => {
                buttonRect.tint = 0xFFFFFF;
                button.scale.set(1); // Ensures normal scale.
            });

        return button;
    }

    // Calculates the button positions.
    const buttonGroupX = app.screen.width - 1400; // 1400px from the right edge.
    const buttonGroupY = app.screen.height * 0.5 - (buttonHeight + buttonMargin) * 0.5; // Centres vertically.

    // Plus button to increase acceleration.
    const plusButton = createButton('+', buttonGroupX, buttonGroupY - (buttonHeight + buttonMargin) * 0.5, () => {
        if (acceleration < maxAcceleration){
            acceleration += accelerationStep;
            console.log('Acceleration increased to:', acceleration.toFixed(3));
        } else {
            console.log('Max acceleration reached:', acceleration.toFixed(3));
        }
    });
    app.stage.addChild(plusButton);

    // Minus button to decrease acceleration.
    const minusButton = createButton('-', buttonGroupX, buttonGroupY + (buttonHeight + buttonMargin) * 0.5, () => {
        if (acceleration > minAcceleration){
            acceleration -= accelerationStep;
            console.log('Acceleration decreased to:', acceleration.toFixed(3));
        } else {
            console.log('Min acceleration reached:', acceleration.toFixed(3));
        }
    });
    app.stage.addChild(minusButton);

    // Animation loop using Pixi.js Ticker.
    app.ticker.add(() => {
        // Calculates the distance to mouse.
        const distanceX = mouseX - ball.x;
        const distanceY = mouseY - ball.y;

        // Applies acceleration.
        velocityX += distanceX * acceleration;
        velocityY += distanceY * acceleration;

        // Applies friction.
        velocityX *= friction;
        velocityY *= friction;

        // Updates ball position.
        ball.x += velocityX;
        ball.y += velocityY;

        // Boundary checks to keep the ball within the screen.
        if (ball.x - ballSize * 0.5 < 0){
            ball.x = ballSize * 0.5;
            velocityX = 0;
        } else if (ball.x + ballSize * 0.5 > app.screen.width){
            ball.x = app.screen.width - ballSize * 0.5;
            velocityX = 0;
        }

        if (ball.y - ballSize * 0.5 < 0){
            ball.y = ballSize * 0.5;
            velocityY = 0;
        }  else if (ball.y + ballSize * 0.5 > app.screen.height) {
            ball.y = app.screen.height - ballSize * 0.5;
            velocityY = 0;
        }
    });
})();