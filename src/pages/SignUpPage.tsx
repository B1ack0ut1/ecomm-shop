import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div>
      <SignUp path={import.meta.env.VITE_CLERK_SIGNUP_PATH} />
    </div>
  );
};

export default SignUpPage;
