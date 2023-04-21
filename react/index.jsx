import { useEffect } from "react";
import NonnySignature from "../src/index";

export default function SignaturePad({id, children, onSave }) {
  useEffect(() => {
    const signaturePad = new NonnySignature(`#${id}`, children?? false);
    signaturePad.onSave(onSave);
    console.log(document.querySelector(`#${id}`));
    //signaturePad.watch();
  },[]);

  return <div id={id}>
    {children}
  </div>;
}