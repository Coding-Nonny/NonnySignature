const { JSDOM } = require('jsdom');
const { createCanvas } = require('canvas');
const NonnySignature = require('./test');

const dom = new JSDOM('<!DOCTYPE html><html><body><div class="nonnysignature"><canvas></canvas></div></body></html>', {
  url: 'http://localhost'
});
global.document = dom.window.document;
global.window = dom.window;

describe('NonnySignature', () => {
  let container;
  let signatureContainer;

  beforeEach(() => {
    container = document.createElement('div');
    signatureContainer = document.createElement('div');
    signatureContainer.setAttribute("id", 'nonnysignature'); 
    container.innerHTML = signatureContainer;
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  test('instantiates NonnySignature', () => {
    const nonnySignature = new NonnySignature(signatureContainer);

    expect(nonnySignature).toBeInstanceOf(NonnySignature);
  });

  test('initializes the canvas and buttons', () => {
    const nonnySignature = new NonnySignature(signatureContainer);

    expect(nonnySignature.container).toBe(signatureContainer);
    expect(nonnySignature.canvas).toEqual(signatureContainer.querySelector('canvas'));
    expect(nonnySignature.context).toBe(nonnySignature.canvas.getContext('2d'));
    expect(nonnySignature.buttons.clear).toEqual(signatureContainer.querySelector('.nonny-clear'));
    expect(nonnySignature.buttons.save).toEqual(signatureContainer.querySelector('.nonny-save'));
    expect(nonnySignature.buttons.undo).toEqual(signatureContainer.querySelector('.nonny-undo'));
    expect(nonnySignature.buttons.redo).toEqual(signatureContainer.querySelector('.nonny-redo'));
    expect(nonnySignature.buttons.color).toEqual(signatureContainer.querySelector('.nonny-color'));
    expect(nonnySignature.buttons.bgColor).toEqual(signatureContainer.querySelector('.nonny-bgColor'));
    expect(nonnySignature.buttons.sizeUp).toEqual(signatureContainer.querySelector('.nonny-sizeup'));
    expect(nonnySignature.buttons.sizeDown).toEqual(signatureContainer.querySelector('.nonny-sizedown'));
  });
});
