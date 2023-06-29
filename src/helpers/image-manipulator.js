export default class ImageManipulator {
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
      let svgData = this.canva.toDataURL('image/png');
      let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('xmlns:xlink','http://www.w3.org/1999/xlink');
      let svgImage = document.createElementNS("http://www.w3.org/2000/svg","image");
      svgImage.setAttribute("xlink:href",svgData);
      svg.appendChild(svgImage);
      const svgXml = new XMLSerializer().serializeToString(svg);
      const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgXml)}`;
      return svgDataUrl;
    }
  }
  