import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <div>
      <SignIn routing="path" path="/login"></SignIn>
    </div>
  )
}
