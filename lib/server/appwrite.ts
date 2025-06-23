// src/lib/server/appwrite.ts
"use server";
import { Client, Account, Databases, Storage } from "node-appwrite";
import { cookies } from "next/headers";

interface SessionClient {
  account: Account;
  databases: Databases;
  storage: Storage;
}
interface AdminClient {
  account: Account;
  databases: Databases;
  storage: Storage;
}

export async function createSessionClient(): Promise<SessionClient> {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  const cookieStore = cookies();
  const session = (await cookieStore).get("my-custom-session");
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    account: new Account(client),
    databases: new Databases(client),
    storage: new Storage(client),
  };
}

export async function createAdminClient(): Promise<AdminClient> {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

    return {
      account: new Account(client),
      databases: new Databases(client),
      storage: new Storage(client),
    };
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}
