import { SignIn, SignedOut } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/", { replace: true });
    }
  }, [isSignedIn, navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <SignedOut>
        <SignIn routing="path" path="/login" />
      </SignedOut>
    </div>
  );
}
