import { AdapterUser } from "next-auth/adapters";

export interface CredentialsUser extends AdapterUser {
  error?: string;
}
