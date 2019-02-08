(() => {

    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    // blur is static in this app.
    const blur = 15;
    const maxHeat = 50;
    const minHeat = 15;
    const animationFramesInterval = 400;

    let heat = simpleheat("canvas-id").data(data).max(18);
    let frame;

    /**
     * Wrapper to get an HTML node element by ID.
     * 
     * @param {int} id 
     * @return nodeElement
     */
    const get = id => {
        return document.getElementById(id);
    }


    /**
     * Draw new data into the canvas element.
     * 
     * @return {null}
     */
    const draw = () => {
        heat.draw();
        frame = null;
    };

    /**
     * Event listener to draw items in
     * the canvas
     * 
     * @return {null}
     */
    get("canvas-id").onmousemove = e => {
        let toAdd = [e.layerX, e.layerY, 1]; 
        heat.add(toAdd);
        frame = frame || window.requestAnimationFrame(draw);
    }

    /**
     * User Interaction Controller.
     * 
     * This object lisens for all user inputs and
     * trigger the actions based on click /  keypress.
     */
    const inputController = {
        /**
         * Container for all interactive elements.
         * These elements will be retrieved from the DOM
         * once it is loaded.
         */
        interactiveElement : {},
        frames : 0.1,

        /**
         * Magic numbers for
         * key inputs
         */
        keyInput : {
            plus : 187,
            minus : 189,
            keyW : 87,
            keyS : 83,
            keyD : 68,
            keyA : 65,
        },

        /**
         * Get all interactive elements
         * 
         * @return {null}
         */
        getInteractiveElements : () => {
            inputController.interactiveElement.plus = get('increase');
            inputController.interactiveElement.minus = get('decrease');
            inputController.interactiveElement.up = get('up');
            inputController.interactiveElement.down = get('down');
            inputController.interactiveElement.right = get('right');
            inputController.interactiveElement.left = get('left');
        },

        /**
         * Add active class to the element
         * the user is interacting with.
         * 
         * @param {object} element
         * @return {null}
         */
        setActiveClass : element => {
            let domElement = ( element.currentTarget || element );
            domElement.classList.add('is_pressed');
        },

        /**
         * Remove active class once the user
         * stops interacting with an element.
         * 
         * @param {object} element
         * @return {null}
         */
        removeActiveClass : element => {
            let domElement = ( element.currentTarget || element );

            // add setTimeOut event to make the animation smoother.
            setTimeout( () => {
                domElement.classList.remove('is_pressed');
            }, 150);
        },

        /**
         * Increase heat in every point drawn in the canvas 
         * when the button '+' is clicked or the key '+'
         * is pressed.
         * 
         * @param {object} e
         * @param {int} amoun
         * @return {null}
         */
        modifyHeat : (e , amount)=> {
            inputController.setActiveClass(e);
            const currentHeat = get('controller-data');
            const toAdd = parseInt(currentHeat.dataset.value ) + amount;

            if ( toAdd >= maxHeat || toAdd <= minHeat ) {
                return;
            }

            heat.radius(toAdd, blur);
            frame = frame || window.requestAnimationFrame(draw);
            currentHeat.dataset.value = toAdd;
        },

        /**
         * Move heat points in
         * the x axis.
         * 
         * @param {object} e
         * @param {string} direction
         * @return {null}
         */
        moveHeatX : (e, direction) => {
            inputController.setActiveClass(e);
            let amount = (direction == 'right') ? 1 : -1;
            inputController.modifyCanvas(heat._data, 0, amount);
        },

        /**
         * Move heat points in
         * the y axis.
         * 
         * @param {string} e
         * @param {direction} direction
         * @return {null}
         */
        moveHeatY : (e, direction) => {
            inputController.setActiveClass(e);
            let amount = (direction == 'up') ? -1 : 1;
            inputController.modifyCanvas(heat._data, 1, amount);
        },

        /**
         * Re-write array of points
         * drawn in the canvas element.
         * 
         * @param {array} currentData Array which contains current data 
         * @param {int} axis Axis to modify [ 0 : X, 1 : Y, 2 : Z ]
         * @param {int} amount Amount to modify
         * @return {array}
         */
        modifyCanvas : (currentData, axis, amount, isFrame) => {
            let newData = [];
            const theFrame = (isFrame || false);

            for (let i = 0; i < currentData.length; i++ ) {
                newData.push( currentData[i] );
                newData[i][axis] += amount;

                // frame operates with float numbers to ensure the animation is smooth,
                if (theFrame) {
                    newData[i][axis] = parseFloat((newData[i][axis] + amount ).toFixed(1));
                }

                if ( currentData[i][2] >= 4 ) {
                    newData[i][axis] += amount;
                }
            }

            heat.data(newData);
            draw();
        },

        /**
         * Animate elements.
         *
         * @return void
         */
        animateElements : () => {
            const animationInit = 0.1;              // min animation ratio.
            const animationLimit = 0.3;             // max anmiation ratio.
            let toAdd = 0.1;                      // smoothnes - the higher the less smooth in the animation.


            if (toAdd > 0 && inputController.frames >= animationLimit) {
                toAdd = parseFloat( ( toAdd * -1 ).toFixed(1) );
            }

            if (toAdd < 0 && inputController.frames < animationInit) {
                toAdd = parseFloat( ( toAdd * -1 ).toFixed(1) );
            } 

            inputController.modifyCanvas(heat._data, 2, toAdd, true);
            inputController.frames += toAdd;
            inputController.frames = parseFloat(inputController.frames.toFixed(1));
        },
        

        /**
         * Action to be triggered when up is pressed.
         * 
         * @param {mixed} key
         * @return {null}
         */
        keyListenerDown : key => {
            let input = key.code || key.keyCode;
            const interactiveElements =  { ...inputController.interactiveElement };
            const keyInputs = { ...inputController.keyInput };

            // + key.
            if (input == 'Equal' || input == keyInputs.plus) {
                inputController.modifyHeat(interactiveElements.plus, 1);
            }

            // - key.
            if (input == 'Minus' || input == keyInputs.minus) {
                inputController.modifyHeat(interactiveElements.minus, -1);
            }

            // W key.
            if (input == 'KeyW' || input == keyInputs.keyW) {
                inputController.moveHeatY(interactiveElements.up, 'up');
            }

            // S key.
            if (input == 'KeyS' || input == keyInputs.keyS) {
                inputController.moveHeatY(interactiveElements.down, 'down');
            }

            // D key.
            if (input == 'KeyD' || input == keyInputs.keyD) {
                inputController.moveHeatX(interactiveElements.right, 'right');
            }

            // A key.
            if (input == 'KeyA' || input == keyInputs.keyA) {
                inputController.moveHeatX(interactiveElements.left, 'left');
            }
        },

        /**
         * Action to be triggered when a key
         * is not longer pressed.
         */
        keyListenerUp : key => {
            let input = key.code || key.keyCode;
            const interactiveElements = { ...inputController.interactiveElement };
            const keyInputs = { ...inputController.keyInput };

            // + key.
            if (input == 'Equal' || input == 187) {
                inputController.removeActiveClass(interactiveElements.plus);
            }

            // - key.
            if (input == 'Minus' || input == keyInputs.minus) {
                inputController.removeActiveClass(interactiveElements.minus);
            }

            // W key.
            if (input == 'KeyW' || input == keyInputs.keyW) {
                inputController.removeActiveClass(interactiveElements.up);
            }

            // S key.
            if (input == 'KeyS' || input == keyInputs.keyS) {
                inputController.removeActiveClass(interactiveElements.down);
            }

            // D key.
            if (input == 'KeyD' || input == keyInputs.keyD) {
                inputController.removeActiveClass(interactiveElements.right);
            }

            // A key.
            if (input == 'KeyA' || input == keyInputs.keyA) {
                inputController.removeActiveClass(interactiveElements.left);
            }
        }


    };

    /**
     * Init event listener events
     * 
     * @return null
     */
    const initEventListeners = () => {     
        const interactiveElements = {...inputController.interactiveElement};
        // Key Down / Key Up listeners.
        document.addEventListener("keydown", inputController.keyListenerDown, false);
        document.addEventListener("keyup", inputController.keyListenerUp, false);

        // increase heat mouse controllers.
        interactiveElements.plus.addEventListener("click", e => {
            inputController.modifyHeat(e, 1);
        });
        interactiveElements.plus.addEventListener("mouseout", e => {
            inputController.removeActiveClass(e);
        });


        // decrease heat mouse controller.
        interactiveElements.minus.addEventListener("click", e => {
            inputController.modifyHeat(e, -1);
        });
        interactiveElements.minus.addEventListener("mouseout", e => {
            inputController.removeActiveClass(e);
        });

        // move up button mouse controller.
        interactiveElements.up.addEventListener("click", e => {
            inputController.moveHeatY(e, 'up');
        });
        interactiveElements.up.addEventListener("mouseout", e => {
            inputController.removeActiveClass(e);
        });

        /// move down button mouse controller.
        interactiveElements.down.addEventListener("click", e => {
            inputController.moveHeatY(e, 'down');
        });
        interactiveElements.down.addEventListener("mouseout", e => {
            inputController.removeActiveClass(e);
        });
        
        /// move right button mouse controller.
        interactiveElements.right.addEventListener("click", e => {
            inputController.moveHeatX(e, 'right');
        });
        interactiveElements.right.addEventListener("mouseout", e => {
            inputController.removeActiveClass(e);
        });

        /// move right button mouse controller.
        interactiveElements.left.addEventListener("click", e => {
            inputController.moveHeatX(e, 'left');
        });
        interactiveElements.left.addEventListener("mouseout", e => {
            inputController.removeActiveClass(e);
        });
    }


    /**
     * Init all the event listeners once the
     * DOM load has been completed.
     * 
     * @return {null}
     */
    document.addEventListener("DOMContentLoaded", () => {
        inputController.getInteractiveElements();
        draw();
        initEventListeners();

        // init canvas elements animation.
        setInterval(() => {
            inputController.animateElements();
        }, animationFramesInterval);
    });

})(window);