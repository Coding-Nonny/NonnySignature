# NonnySignature

NonnySignature is an easy-to-use JavaScript-based library that helps you manage user signatures in the front-end. It provides a flexible solution for both React and vanilla JavaScript projects.

## Installation
This library can be installed using either `NPM` or `CDN`.

- using NPM
```js
npm i NonnySignature
```
- using CDN 
```html
<script src="https://Coding-Nonny.github.io/NonnySignature/lib/NonnySignature.js"></script>
```
## Importing NonnySignature

```js
import NonnySignature from 'Nonnysignature'
```
#### Initialize your pad
To initialize NonnySignature, you need to provide the class of the parent div that will hold the signature pad. You can use our default template or your own.
- HTML
```html
<body>
    <div class="mypad"></div>
</body>
```

- JAVASCRIPT

```js
const signaturePad = new NonnySignature(".mypad", false);
```

## Constructor Object
- The first parameter is the class of the parent div that will hold the signature pad (in this case, `.mypad`).
- The second parameter is a boolean that determines whether to use the default template (`false`) or your own (`true`).

### Using Our React Component:

We have also provided a flexible React component that you can use in your React development. 

```js
import SignaturePad from 'NonnySignature/react'

export default function App(){
    <SignaturePad id="mypad"></SignaturePad>
}
```

#### React Component Props
- The id prop sets the ID for the current signature pad (in this case, `mypad`).

## Saving the Signature
To save the signature image, you first need to add a Save button using the `.nonny-save` class name. You can either use our default template or your own.

- HTML
```html
<div class="mypad">
  <canvas width="400" height="200"></canvas>
  <button class="nonny-save">Save</button>
</div>
```
- REACT
```jsx
<SignaturePad id="mypad">
  <canvas width="400" height="200"></canvas>
  <button className="nonny-save">Save</button>
</SignaturePad>
```
Then, set the `onSave` method or props.

Setting The Method

```js
signaturePad.onSave((imageData) => window.location.replace(imageData.toImage('png', 1)));
```
Setting Props

```js
<SignaturePad id="mypad" onSave={(imageData) => window.location.replace(imageData.toImage('png', 1))}>
  ...Your custom template
</SignaturePad>
```

## Explaining the onSave Method
- The `onSave` method takes a callback function as its parameter.
- The callback function takes an ImageData object as its parameter.
- The ImageData object has a few methods, including `toImage(imageType, quality)` and `toSvg()`.
- The toImage method takes two arguments: imageType (currently supported types are `png`, `jpeg`, and `webp`) and quality (a number between `0` and `1`, with `0` being the poorest quality and `1` being the maximum quality).

#### Note: If you click the save button without using the onSave method, the canvas will be downloaded as an image.


## Additionally, the library also provides the following functionalities:

| Name | Function | Class Name |
| -------- | -------- | -------- |
| Clear button: |  The clear button is used to clear the canvas. You can add a clear button to the signature pad using the class name `nonny-clear`. | nonny-clear |
|  Size Up button: | This helps to increase the size of the canvas stroke. You can add a button to increase the size of the stroke using the class name `nonny-sizeup`. | nonny-sizeup |
|  Size Down button: | This helps to decrease the size of the canvas stroke. You can add a button to decrease the size of the stroke using the class name `nonny-sizedown`. | nonny-sizedown |
|  Undo button: | This removes strokes from the canvas until none is left, you can recover strokes using the redo button. You can add an undo button using the class name `nonny-undo`. | nonny-undo |
|  Redo button: | This retrieves strokes removed by the undo button. You can add a redo button using the class name `nonny-redo`. | nonny-redo |
|  Background color input: | You can add an input of type color to change the background color of the signature pad. The input should have the class name `nonny-bgcolor` and the default background color is white `value="#FFFFFF"`. | nonny-bgcolor |
|  Stroke color input: | You can add an input of type color to change the stroke color of the signature pad. The input should have the class name `nonny-color` and default color is black `value="#000000"`. | nonny-color |
- In REACT

you can use the buttons like this
```js
<SignaturePad id="mypad">
  <canvas width="400" height="200"></canvas>
  <button className="nonny-save">Save</button>
  <input type="color" className="nonny-color" value="#000000">
</SignaturePad>
```
For working example, [click here](https://coding-nonny.github.io/NonnySignature/). 
- Or check the example for handling double signature `client` and `management`
[click here](https://github.com/Coding-Nonny/NonnySignature/blob/main/examples/2signatures.html)


If you encounter any issues or have any suggestions, please create an issue in the GitHub repository.
