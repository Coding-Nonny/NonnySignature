const  CONTENT = `
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
<button type="button" class="nonny-save-png">Save png</button>
<button type="button" class="nonny-save-svg">Save svg</button>
<button type="button" class="nonny-save-callback">Onsave callback</button>
<button type="button" class="nonny-undo">Undo</button>
<button type="button" class="nonny-redo">Redo</button>
<input type="color" class="nonny-color" value="#000000" />
<input type="color" class="nonny-bgColor" value="#FFFFFF" />
<button type="button" class="nonny-sizeup">+</button>
<button type="button" class="nonny-sizedown">-</button>
<img src="" alt="">
</div>`;

export default CONTENT;