import { useEffect } from "react";
import NonnySignature from "../src/index";

export default function SignaturePad({idSelector, children = true, onSave }) {
  const signaturePad = new NonnySignature(`#${idSelector}`, children);

  useEffect(() => {
    signaturePad.onSave(onSave);
    signaturePad.watch();
  },[]);

  return <div id={idSelector}>
    {children}
  </div>;
}
