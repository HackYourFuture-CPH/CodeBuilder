import { useSession, signIn, signOut, SessionProvider } from "next-auth/react";
import SnippetGallery from "./components/SnippetsGalleryComponent";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <SessionProvider session={session}>
          <SnippetGallery />
        </SessionProvider>
      </>
    );
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}