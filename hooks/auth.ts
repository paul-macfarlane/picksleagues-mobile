import { useState } from "react";
import { signIn as signInApi, signUp as signUpApi } from "~/api/auth";
import { SignInSchema, SignUpSchema } from "~/models/auth";

export const useSignIn = () => {
  const [signInError, setSignInError] = useState<string | null>(null);
  const [signInLoading, setSignInLoading] = useState<boolean>(false);

  const signIn = async (data: SignInSchema) => {
    try {
      setSignInError(null);
      setSignInLoading(true);
      const result = await signInApi(data);

      // TODO save result to storage
      // TODO navigate to homeå
    } catch (e) {
      if (e instanceof Error) {
        setSignInError(e.message);
        return;
      }

      setSignInError("An unknown error occurred");
    } finally {
      setSignInLoading(false);
    }
  };

  return {
    signIn,
    signInError,
    signInLoading,
  };
};

export const useSignUp = () => {
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const [signUpLoading, setSignUpLoading] = useState<boolean>(false);

  const signUp = async (data: SignUpSchema) => {
    try {
      setSignUpError(null);
      setSignUpLoading(true);

      await signUpApi(data);

      // todo trigger email/phone verification
      // TODO navigate to home
    } catch (e) {
      if (e instanceof Error) {
        setSignUpError(e.message);
        return;
      }

      setSignUpError("An unknown error occurred");
    } finally {
      setSignUpLoading(false);
    }
  };

  return {
    signUp,
    signUpError,
    signUpLoading,
  };
};
