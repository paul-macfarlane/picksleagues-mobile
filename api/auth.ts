import { API_URL } from "~/lib/constants";
import { SignInSchema, SignUpSchema } from "~/models/auth";
import { APIErrorFromResponse } from "~/models/errors";

type AccessTokenResponse = {
  access_token: string;
};

export async function signIn(data: SignInSchema): Promise<AccessTokenResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw APIErrorFromResponse(response);
  }

  const result: AccessTokenResponse = await response.json();
  return result;
}

type CreateUserResponse = {
  id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
};

export async function signUp(data: SignUpSchema): Promise<CreateUserResponse> {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw APIErrorFromResponse(response);
  }

  const createUserResponse: CreateUserResponse = await response.json();
  return createUserResponse;
}
