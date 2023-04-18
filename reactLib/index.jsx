import { useEffect } from "react";
import NonnySignature from "../src/index";

export default function SignaturePad({idSelector, children = false, onSave }) {
  useEffect(() => {
    const signaturePad = new NonnySignature(`#${idSelector}`, children);
    signaturePad.onSave(onSave);
    console.log(document.querySelector(`#${idSelector}`));
    signaturePad.watch();
  },[]);

  return <div id={idSelector}>
   <canvas width={400} height={400} style={{cursor: "crosshair"}}></canvas>
   <button className="nonny-save">save</button>
  </div>;
}