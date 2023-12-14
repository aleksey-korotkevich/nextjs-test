"use server";

import { signIn, signUp, signOut } from "@/auth";
import { AuthError } from "next-auth";
import createApolloClient from "../apollo-client";
import { gql } from "@apollo/client";
import { Country } from "./types";

export async function logOut() {
  await signOut();
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function signUpAndAuthenticate(formData: FormData) {
  try {
    await signUp({
      username: String(formData.get("username")),
      password: String(formData.get("password")),
    });
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function getListOfCountries() {
  const client = createApolloClient();

  const { data }: { data: { countries: Country[] } } = await client.query({
    query: gql`
      query Countries {
        countries {
          code
          name
          emoji
        }
      }
    `,
  });

  return data.countries;
}
