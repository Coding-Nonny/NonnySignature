import { useEffect } from "react";
import NonnySignature from "../src/index";

export default function SignaturePad({id, children, onSave }) {
  useEffect(() => {
    const signaturePad = new NonnySignature(`#${id}`, children?? true);
    signaturePad.onSave(onSave);
  },[]);

  return <div id={id}>
    {children}
  </div>;
}