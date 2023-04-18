import { useEffect } from "react";
import NonnySignature from "../src/index";

export default function SignaturePad({idSelector, children, onSave }) {
  useEffect(() => {
    const signaturePad = new NonnySignature(`#${idSelector}`, children?? false);
    signaturePad.onSave(onSave);
    console.log(document.querySelector(`#${idSelector}`));
    signaturePad.watch();
  },[]);

  return <div id={idSelector}>
    {children}
  </div>;
}