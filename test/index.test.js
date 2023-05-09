const { JSDOM } = require('jsdom');
const { document } = new JSDOM('<!doctype html><html><body></body></html>').window;
const NonnySignature = require('./test');

describe('NonnySignature', () => {
  let signature;
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    container.setAttribute('id', 'mydiv');
    let canvas = document.createElement("canvas");
    container.appendChild(canvas)
    document.body.appendChild(container);
    signature = new NonnySignature();
  });

  afterEach(() => {
    signature = null;
    container.remove();
  });

  test('signature canvas should be created', () => {
    expect(signature.canvas).toBeTruthy();
  });

  test('signature context should be 2d', () => {
    expect(signature.context).toBeTruthy();
    expect(signature.context).toBeInstanceOf(CanvasRenderingContext2D);
  });

  test('buttons should be set up', () => {
    const buttons = signature.buttons;
    expect(buttons.clear).toBeTruthy();
    expect(buttons.save).toBeTruthy();
    expect(buttons.undo).toBeTruthy();
    expect(buttons.redo).toBeTruthy();
    expect(buttons.color).toBeTruthy();
    expect(buttons.bgColor).toBeTruthy();
    expect(buttons.sizeUp).toBeTruthy();
    expect(buttons.sizeDown).toBeTruthy();
  });

  test('clear button should clear the canvas', () => {
    signature.clearCanvas();
    const imageData = signature.context.getImageData(0, 0, signature.canvas.width, signature.canvas.height);
    const emptyImageData = new ImageData(imageData.width, imageData.height);
    expect(imageData.data).toEqual(emptyImageData.data);
  });

  test('undo button should undo last drawing', () => {
    signature.context.moveTo(0, 0);
    signature.context.lineTo(50, 50);
    signature.context.stroke();
    signature.undo();
    const imageData = signature.context.getImageData(0, 0, signature.canvas.width, signature.canvas.height);
    const emptyImageData = new ImageData(imageData.width, imageData.height);
    expect(imageData.data).toEqual(emptyImageData.data);
  });

  test('redo button should redo last undone drawing', () => {
    signature.context.moveTo(0, 0);
    signature.context.lineTo(50, 50);
    signature.context.stroke();
    signature.undo();
    signature.redo();
    const imageData = signature.context.getImageData(0, 0, signature.canvas.width, signature.canvas.height);
    expect(imageData.data).toBeTruthy();
  });

  test('save button should call the callback with data url of canvas', () => {
    const callback = jest.fn();
    signature.setCallback(callback);
    signature.save();
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(signature.canvas.toDataURL());
  });
});
