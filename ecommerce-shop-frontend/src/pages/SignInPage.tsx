import { SignIn } from "@clerk/clerk-react";
import { useSearchParams } from "react-router-dom";

const SignInPage = () => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <SignIn
        path={import.meta.env.VITE_CLERK_SIGNIN_PATH}
        fallbackRedirectUrl={redirectTo}
      />
    </div>
  );
};

export default SignInPage;
