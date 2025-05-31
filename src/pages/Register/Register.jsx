import { SignUp } from "@clerk/clerk-react";

export default function Register() {
  return (
    <div>
      <SignUp routing="path" path="/register"></SignUp>
    </div>
  )
}
