const { JSDOM } = require("jsdom");
const { createCanvas } = require("canvas");
module.exports = (function () {
  "use strict";

  const CONTENT = `
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000;
}

.nonny {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  overflow: auto;
}

#signatureCanvas {
  width: 400px;
  height: 200px;
  display: block;
  border: 1px solid #000;
  cursor: crosshair;
  background-color: #fff;
}

button {
  padding: 8px;
  border: none;
  outline: none;
  border-radius: 10px;
}

.action {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-top: 10px;
}

button {
  margin-top: 8px;
}

img {
  background: #fff;
}

@media (max-width: 600px) {
  .nonny {
    width: 100%;
  }
}

@media (max-width: 404px) {
  #signatureCanvas {
    width: 100%;
    height: 200px;
    display: block;
    border: 1px solid #000;
    cursor: crosshair;
    background-color: #fff;
  }

  img {
    width: 100%;
  }
}
</style>
<canvas id="signatureCanvas" width="400" height="200"></canvas>
<div class="action">
<button type="button" class="nonny-clear">Clear</button>
<button type="button" class="nonny-save">Save</button>
<button type="button" class="nonny-undo">Undo</button>
<button type="button" class="nonny-redo">Redo</button>
<input type="color" class="nonny-color" value="#000000" />
<input type="color" class="nonny-bgColor" value="#FFFFFF" />
<button type="button" class="nonny-sizeup">+</button>
<button type="button" class="nonny-sizedown">-</button>
</div>`;

  class ImageManipulator {
    canva = null;

    constructor(canva) {
      this.canva = canva;
    }

    toImage(imageType, quality = 0.5) {
      const imgType = ["webp", "jpeg", "png"];
      if (!imgType.includes(imageType.toLowerCase())) {
        throw new Error("Invalid image type");
      }
      return this.canva.toDataURL(`image/${imageType}`, quality);
    }

    toSvg() {
      const svgXml = new XMLSerializer().serializeToString(this.canva);
      const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        svgXml
      )}`;
      return svgDataUrl;
    }
  }

  class NonnySignature {
    container = null;
    canvas = null;
    size = 0;
    context = null;
    /* ****** STATES ****** */
    states = {
      isTouch: false,
      isMouseDown: false,
      lastX: 0,
      lastY: 0,
      undo: [],
      redo: [],
    };
    /* ****** BUTTONS ****** */
    buttons = {
      clear: null,
      save: null,
      saveWithBg: null,
      undo: null,
      redo: null,
      color: null,
      bgColor: null,
      sizeUp: null,
      sizeDown: null,
    };
    callback = null;
    insertContent = null;
    constructor(containerName = "nonnysignature", insertContent = false) {
      this.container = containerName;
      this.insertContent = insertContent;
      this.watch();
    }
    watch() {
      const { window } = new JSDOM();
      const parser = new window.DOMParser();
      const document = parser.parseFromString(CONTENT, "text/html");
      if (!this.insertContent) this.container.innerHTML = CONTENT;
      this.canvas = document.querySelector("canvas");
      this.context = this.canvas.getContext("2d");
      this.buttons = this.setUpButtons();
      this.addEventListeners();
    }
    /* ****** Getting buttons ****** */
    setUpButtons() {
      return {
        clear: this.container.querySelector(".nonny-clear"),
        save: this.container.querySelector(".nonny-save"),
        undo: this.container.querySelector(".nonny-undo"),
        redo: this.container.querySelector(".nonny-redo"),
        color: this.container.querySelector(".nonny-color"),
        bgColor: this.container.querySelector(".nonny-bgColor"),
        sizeUp: this.container.querySelector(".nonny-sizeup"),
        sizeDown: this.container.querySelector(".nonny-sizedown"),
      };
    }
    /* ****** THIS METHOD CALLS CANVAS LISTENER AND BUTTON LISTENERS. THIS METHOD IS CALLED IN THE CONSTRUCTOR ****** */
    addEventListeners() {
      this.setUpCanvasListeners();
      this.setUpButtonsListener();
    }
    /* ****** ADDING EVENT LISTENERS TO BUTTONS ****** */
    setUpButtonsListener() {
      this.buttons.clear.addEventListener("click", (e) => {
        e.preventDefault();
        this.clearCanvas();
      });
      this.buttons.save.addEventListener("click", (e) => {
        e.preventDefault();
        this.save();
      });
      this.buttons.undo.addEventListener("click", (e) => {
        e.preventDefault();
        this.undo();
      });
      this.buttons.redo.addEventListener("click", (e) => {
        e.preventDefault();
        this.redo();
      });
      this.buttons.color.addEventListener("change", (e) => {
        this.changeColor(e.target.value);
      });
      this.buttons.bgColor.addEventListener("change", (e) => {
        this.changeBgColor(e.target.value);
      });
      this.buttons.sizeUp.addEventListener("click", (e) => {
        e.preventDefault();
        this.changeSize("+");
      });
      this.buttons.sizeDown.addEventListener("click", (e) => {
        e.preventDefault();
        this.changeSize("-");
      });
    }
    /* ******ADDING EVENT LISTENERS TO CANVAS ELEMENT ****** */
    setUpCanvasListeners() {
      this.canvas.addEventListener("touchstart", (e) =>
        this.handleTouchStart(e)
      );
      this.canvas.addEventListener("touchmove", (e) => this.handleTouchMove(e));
      this.canvas.addEventListener("touchend", (e) => this.handleTouchEnd(e));
      this.canvas.addEventListener("touchcancel", (e) =>
        this.handleTouchEnd(e)
      );
      this.canvas.addEventListener("mousedown", (e) => this.handleMouseDown(e));
      this.canvas.addEventListener("mousemove", (e) => this.handleMouseMove(e));
      this.canvas.addEventListener("mouseup", (e) => this.handleMouseUp(e));
    }
    /* ****** HANDLE USER TOUCH EVENT ****** */
    handleTouchStart(e) {
      this.states.isTouch = true;
      let touch = e.touches[0];
      this.states.lastX = touch.clientX - this.canvas.offsetLeft;
      this.states.lastY = touch.clientY - this.canvas.offsetTop;
      this.canvas.willReadFrequently = true;
    }
    /* ****** HANDLE USER TOUCH EVENT ****** */
    handleTouchMove(e) {
      if (!this.states.isTouch) return;
      let touch = e.touches[0];
      let currentX = touch.clientX - this.canvas.offsetLeft;
      let currentY = touch.clientY - this.canvas.offsetTop;
      this.context.willReadFrequently = true;
      this.context.beginPath();
      this.context.moveTo(this.states.lastX, this.states.lastY);
      this.context.lineTo(currentX, currentY);
      this.context.stroke();
      this.states.lastX = currentX;
      this.states.lastY = currentY;
    }
    /* ****** HANDLE USER TOUCH EVENT ****** */
    handleTouchEnd() {
      this.states.isTouch = false;
      this.states.undo.push(
        this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
      );
      this.states.redo = [];
    }
    /* ****** HANDLE USER MOUSE EVENT ****** */
    handleMouseDown(e) {
      this.states.isMouseDown = true;
      this.states.lastX = e.clientX - this.canvas.offsetLeft;
      this.states.lastY = e.clientY - this.canvas.offsetTop;
      this.canvas.willReadFrequently = true;
    }
    /* ****** HANDLE USER MOUSE EVENT ****** */
    handleMouseMove(e) {
      if (!this.states.isMouseDown) return;
      let currentX = e.clientX - this.canvas.offsetLeft;
      let currentY = e.clientY - this.canvas.offsetTop;
      this.context.beginPath();
      this.context.moveTo(this.states.lastX, this.states.lastY);
      this.context.lineTo(currentX, currentY);
      this.context.stroke();
      this.states.lastX = currentX;
      this.states.lastY = currentY;
    }
    /* ****** HANDLE USER MOUSE EVENT ****** */
    handleMouseUp(e) {
      this.states.isMouseDown = false;
      this.states.undo.push(
        this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
      );
      this.states.redo = [];
    }
    /* ****** UNDO METHOD ****** */
    undo() {
      if (this.states.undo.length > 0) {
        this.states.redo.push(this.states.undo.pop());
        if (this.states.undo.length === 0) {
          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.context.fillStyle =
            localStorage.getItem("nonny_signature_bgColor") || "#ffffff";
          this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
          return "clear";
        } else {
          this.context.putImageData(
            this.states.undo[this.states.undo.length - 1],
            0,
            0
          );
        }
      }
      return this.states.undo.length;
    }
    /* ****** REDO METHOD ****** */
    redo() {
      if (this.states.redo.length > 0) {
        this.context.putImageData(
          this.states.redo[this.states.redo.length - 1],
          0,
          0
        );
        this.states.undo.push(this.states.redo.pop());
      }
    }
    /* ****** CLEAR METHOD ****** */
    clearCanvas() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.states.undo = [];
      this.states.redo = [];
      this.context.fillStyle =
        localStorage.getItem("nonny_signature_bgColor") || "#ffffff";
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    /* ****** SAVE METHOD ****** */
    save() {
      if (this.callback)
        return this.callback(new ImageManipulator(this.canvas));
      if (confirm("is the signature comfirmed by owner?")) {
        let image = this.canvas.toDataURL();
        let a = document.createElement("a");
        a.href = image;
        a.download = "nonny_signature.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    }
    /* ****** CHANGE STROKE COLOR ****** */
    changeColor(color) {
      localStorage.setItem("nonny_signature_color", color);
      this.context.strokeStyle = color;
    }
    /* ****** CHANGE CONTEXT COLOR****** */
    changeBgColor(color) {
      localStorage.setItem("nonny_signature_bgColor", color);
      this.context.fillStyle = color;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    /* ****** SIZE INCREASE AND DECREASE ****** */
    changeSize(direction) {
      if (direction === "+") {
        this.size = this.size + 1;
        this.context.lineWidth = this.size;
        this.buttons.sizeUp.textContent = this.size;
        this.buttons.sizeDown.textContent = "-";
      } else {
        this.size = this.size - 1;
        this.context.lineWidth = this.size;
        this.buttons.sizeDown.textContent = this.size;
        this.buttons.sizeUp.textContent = "+";
        if (this.size < 1) {
          this.buttons.sizeDown.textContent = this.context.lineWidth;
          this.size = 0;
        }
      }
      return this.context.lineWidth;
    }
    /* ****** CALLBACK FOR CONTEXT IMAGE DATA ****** */
    onSave(callback) {
      this.callback = (image) => callback(image);
    }
  }

  return NonnySignature;
})();
