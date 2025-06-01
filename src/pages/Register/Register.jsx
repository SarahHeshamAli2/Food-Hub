import { SignUp } from "@clerk/clerk-react";

export default function Register() {

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <SignUp routing="path" path="/register" />
    </div>
  );
}
