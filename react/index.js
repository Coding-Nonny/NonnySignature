import { useEffect } from "react";
import NonnySignature from "../index";
export default function signaturePad({padName, children, onSave}){
    const newPad = new NonnySignature(`.${classname}`, children ?? false);
    useEffect(() =>{
        newPad.onSave(onSave)
        newPad.watch()
    }, [])
    return (
        <div className={padName}>
            {
                children
            }
        </div>
    )
}