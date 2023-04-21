# Nonny Signature

NonnySignature is an easy to use Javascript based library that helps you manage users signatures in the front-end

## Usage
### Installation:

This library can be used both in `react.js` and `vanilla Javascript`

- using npm
```js
npm i NonnySignature
```
- using CDN 
```html
<script src="https://" defer></script>
```
### Importing NonnySignature:

```js
import NonnySignature from 'Nonnysignature'
```
#### Initialize your pad
create a div tag with a class or id
- The HTML example
```html
<body>
    <div class="mypad"></div>
</body>
```

- The Javascript code

```js
const signaturePad = new NonnySignature(".mypad", false);
```

## The constructor object
- The first parameter given is the class or id of the parentDiv to hold the signature pad as for our case `.mypad` 
- the second parameter uses our default template and automatically inserts it to the parentDiv if set to `false` else it uses your custom template. When using a custom template, make sure to add the canvas tag and controls inside the parentDiv.

- Example

```html
<body>
    <div class="mypad">
        <canvas width="400" height="200"></canvas>
        <!-- this button clears the canvas -->
        <button class="nonny-clear">clear</button>
    </div>
</body>
```
### Using our react component:

To make it easy to use in your react development, we built a very flexible component to use and you can import it using 

```js
import SignaturePad from 'NonnySignature/react'

export default function App(){
    <SignaturePad id="mypad">
    </SignaturePad>
}
```

#### The react component 
- The id prop sets the id for the current signature Pad, as for our case `mypad`.