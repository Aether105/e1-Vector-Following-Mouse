
/*const ball = document.getElementById("ball");
            let x = 100;
            let y = 100;
            let xSpeed = 1;
            let ySpeed = 3.3;
            function animate() {
            x += xSpeed;
            y += ySpeed;
            if (x + 50 > window.innerWidth || x < 0) {
               xSpeed = -xSpeed;
            }
            if (y + 50 > window.innerHeight || y < 0) {
               ySpeed = -ySpeed;
            }
            ball.style.left = x + "px";
            ball.style.top = y + "px";
            requestAnimationFrame(animate);
         }
        animate();
        */

        const ball = document.getElementById("ball");

        let mouseX = 740; // Starting position of the ball on the x-axis
        let mouseY = 300; // Starting position of the ball on the y-axis
        let ballX = 100; // Ball's initial x position on screen
        let ballY = 100; // Ball's initial y position on screen
        let velocityX = 0; // Ball's x-axis velocity (how fast it moves horizontally)
        let velocityY = 0; // Ball's y-axis velocity (how fast it moves vertically)
        const acceleration = 0.005; // Adjust this for faster/slower acceleration towards the mouse
        const friction = 0.9; // Adjust this for more or less friction (momentum effect) - how quickly the ball slows down after moving.

        const ballSize = 100; // Diameter of the ball, used for the boundary checks
        
        // Updates the target mouse coordinates when the mouse moves
        document.addEventListener("mousemove", (event) => {
            mouseX = event.clientX; // Updates the x-coordinate of the mouse
            mouseY = event.clientY; // Updates the y-coordinate of the mouse
        });
        
        // Animation loop to make the ball follow the mouse
        function animate() {
            // Calculates distance to mouse
            const distanceX = mouseX - ballX; // Difference between the mouse and ball on the x-axis
            const distanceY = mouseY - ballY; // Difference between the mouse and ball on the y-axis
        
            // Applies acceleration based on the distance. Larger distances result in faster speeds, as the velocity variables are increased in proportion to the distance of the mouse
            velocityX += distanceX * acceleration; // Increases velocityX in the direction of the mouse
            velocityY += distanceY * acceleration; // Increases velocityY in the direction of the mouse
        
            // Applies friction for a smoother, decelerating effect
            velocityX *= friction; // Reduces velocityX slightly, to create a smoother slowdown
            velocityY *= friction; // Same applies here for y
        
            // Updates ball position
            ballX += velocityX; // Moves ball horizontally by velocityX
            ballY += velocityY; // Vice versa

            // Boundary checks to keep the ball within the screen
            if (ballX < 0) {
                ballX = 0;     // Sets ballX to the left boundary
                velocityX = 0; // Stops horizontal movement at the left edge
            } else if (ballX + ballSize > window.innerWidth) {
                ballX = window.innerWidth - ballSize; // Sets ballX to the right boundary
                velocityX = 0; // Stops horizontal movement at the right edge
            }
        
            if (ballY < 0) {
                ballY = 0;     // Sets ballY to the top boundary
                velocityY = 0; // Stops vertical movement at the top edge
            } else if (ballY + ballSize > window.innerHeight) {
                ballY = window.innerHeight - ballSize; // Sets ballY to the bottom boundary
                velocityY = 0; // Stops vertical movement at the bottom edge
            }        
        
            // Moves the ball element to the updated position
            ball.style.left = `${ballX}px`; // Sets the CSS 'left' property based on ballX
            ball.style.top = `${ballY}px`; // Vice versa
        
            // Request the next frame
            requestAnimationFrame(animate);
        }
        
        // Start the animation
        animate();
        