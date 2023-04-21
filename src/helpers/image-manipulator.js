export default class ImageManipulator{
    canva = null;

    constructor(canva){
        this.canva = canva;
    }
    toImage(imageType, quality = 0.5){
        const imgType = Array("webp","jpeg","png");
        if(!imgType.includes(imageType.toLowerCase()))
        throw new Error("inavlid image type");
        return this.canva.toDataURL(`image/${imageType}`, quality);
    }
    toSvg(){
        
    }
}