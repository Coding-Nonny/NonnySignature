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
      const svgXml = new XMLSerializer().serializeToString(this.canva+".svg");
      const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgXml)}`;
      return svgDataUrl;
    }
  }
  