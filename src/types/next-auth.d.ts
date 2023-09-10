import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import { RegistrationStage, UserType } from "@prisma/client";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession{
    id: string | undefined;
    verified?: boolean | false;
    isActive?: boolean;
    registrationStage?: RegistrationStage | null;
    firstName?: string;
    lastName?: string;
    userType?: UserType | null;
    photo?: string | null;
    email?:string
    user: {
      /** The authentication's postal address. */
      verified?: boolean;
      status?: boolean;
      stage?: string;
      id : string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id?: string | undefined;
    idToken?: string;
    verified?: boolean;
    status?: boolean;
    registrationStage?: RegistrationStage | null;
    isActive?: boolean;
    firstName?: string;
    lastName?: string;
    userType?: UserType | null;
    photo?: string | null;
  }
}
declare module "next-auth" {
  interface User extends DefaultUser {
    email?: string;
    isVerified?: boolean;
    isActive?: boolean;
  }
}
