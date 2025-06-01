import { SignUp, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { isSignedIn, user } = useUser();
  console.log("User in register page:", user);
  console.log("isSignedIn in register page:", isSignedIn);
  const navigate = useNavigate();

  // Assign 'user' role to new signups
  useEffect(() => {
    if (isSignedIn && user) {
      // Only set role if not already set
      if (!user.publicMetadata?.role) {
        user.update({ publicMetadata: { role: "user" } });
      }
      navigate("/unauthorized");
    }
  }, [isSignedIn, user, navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <SignUp routing="path" path="/register" />
    </div>
  );
}
