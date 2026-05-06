import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
export default function Home() {
  const { data: user } = useCurrentUser();
  return (
    <>
      <h1 className="text-green-500 text-2xl">Netflix Clone</h1>
      <p className="text-white">Logged in as: {user?.email}</p>
      <button
        onClick={() => signOut()}
        className="bg-white h-10 w-full rounded-md"
      >
        logout
      </button>
    </>
  );
}
