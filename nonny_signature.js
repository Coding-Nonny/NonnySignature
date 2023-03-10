  const canvas = document.getElementById("signatureCanvas");
        const context = canvas.getContext("2d");
        context.imageSmoothingEnabled = false;
        context.imageSmoothingQuality = "medium";
        let isMouseDown = false;
        let isTouch = false;
        let lastX, lastY,
           $undo = [],
            $redo = [];
        let state = -1;

        canvas.addEventListener("touchstart", handleTouchStart);
        canvas.addEventListener("touchmove", handleTouchMove);
        canvas.addEventListener("touchend", handleTouchEnd);
        canvas.addEventListener("touchcancel", handleTouchEnd);

        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseup", handleMouseUp);

        document.querySelector(".undo").addEventListener("click", handleUndo);
        document.querySelector(".redo").addEventListener("click", handleRedo);

        function handleTouchStart(e) {
            isTouch = true;
            let touch = e.touches[0];
            lastX = touch.clientX - canvas.offsetLeft;
            lastY = touch.clientY - canvas.offsetTop;
            canvas.willReadFrequently = true;
        }

        function handleTouchMove(e) {
            if (isTouch) {
                let touch = e.touches[0];
                let currentX = touch.clientX - canvas.offsetLeft;
                let currentY = touch.clientY - canvas.offsetTop;
                context.willReadFrequently = true;
                context.beginPath();
                context.moveTo(lastX, lastY);
                context.lineTo(currentX, currentY);
                context.stroke();
                lastX = currentX;
                lastY = currentY;
            }
        }

        function handleTouchEnd(e) {
            isTouch = false;
            context.willReadFrequently = false;
            saveUndoState();
        }

        function handleMouseDown(e) {
            isMouseDown = true;
            context.willReadFrequently = true;
            lastX = e.clientX - canvas.offsetLeft;
            lastY = e.clientY - canvas.offsetTop;
        }

        function handleMouseMove(e) {
            if (isMouseDown) {
                let currentX = e.clientX - canvas.offsetLeft;
                let currentY = e.clientY - canvas.offsetTop;
                context.willReadFrequently = true;
                context.beginPath();
                context.moveTo(lastX, lastY);
                context.lineTo(currentX, currentY);
                context.stroke();
                lastX = currentX;
                lastY = currentY;
            }
        }

        function handleMouseUp(e) {
            isMouseDown = false;
            context.willReadFrequently = false;
            saveUndoState();
        }

        function handleUndo() {
            if (state > -1) {
                const cState =$undo.pop();
                context.putImageData(cState, 0, 0);
                $redo.push(cState);
                state--;
                console.log(state);
            } else {
                handleNoMoreUndo();
            }
        }

        function handleRedo() {
            if ($redo.length > 0) {
                const cState = $redo.pop();
                context.putImageData(cState, 0, 0);
               $undo.push(cState);
                state =$undo.length - 1;
            } else {
                handleNoMoreRedo();
            }
        }

        function saveUndoState() {
            const cState = context.getImageData(0, 0, canvas.width, canvas.height, { willReadFrequently: true });
           $undo.push(cState);
            $redo = [];
            state =$undo.length - 1;
        }

        function handleNoMoreUndo() {
            console.log(state);
            const initial = context.getImageData(0, 0, 1, 1, { willReadFrequently: true }).data.join(',');

            if (initial === '0,0,0,0') {
                context.clearRect(0, 0, canvas.width, canvas.height);
            } else {
                alert("canvas is empty")
            }
        }

        function handleNoMoreRedo() {
            console.log(state);
            const initial = context.getImageData(0, 0, 1, 1, { willReadFrequently: true }).data.join(',');

            if (initial === '0,0,0,0') {
                alert("max");
            } else {
                alert("canvas is empty");
            }
        }

        function saveCanvas() {
            let dataUrl = canvas.toDataURL();
            console.log(dataUrl);
            document.querySelector("img").setAttribute("src", dataUrl);
        }
        function clearCanvas() {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }

        document.querySelector(".color").addEventListener("click", color)
        document.querySelector(".bg").addEventListener("click", bgColor)
        function color() {
            let a = "rgb" + "(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";
            let rgb = a;
            context.strokeStyle = a;
            document.querySelector(".color").style.background = a;
            console.log(a);
        }
        let colorPick = Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F");
        function bgColor() {
            let color = "#";
            for (let i = 0; i < 6; i++) {
                color = color + colorPick[rand()];
            }
            canvas.style.background = color;
            document.querySelector(".bg").style.background = color;
            document.querySelector("img").style.background = color;
        }
        function rand() {
            return Math.floor(Math.random() * colorPick.length);
        }
        let inc = 0;
        function lineIncrease() {
            inc = inc + 1;
            context.lineWidth = inc;
            document.querySelector(".plus").textContent = inc;
            document.querySelector(".minus").textContent = "-";
        }

        function lineDecrease() {
            inc = inc - 1;
            context.lineWidth = inc;
            document.querySelector(".minus").textContent = inc;
            document.querySelector(".plus").textContent = "+";
        }
