import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div>
      <SignIn path={import.meta.env.VITE_CLERK_SIGNIN_PATH} />
    </div>
  );
};

export default SignInPage;
