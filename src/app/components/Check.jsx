
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function Check() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <main className="bg-light min-vh-100 py-5">
      <>
        <div className="text-center p-5">
          <h3 className="display-4">  {session?.user?.name || "User"}</h3>
          <p className="h5 mt-3">
            : <span className="text-primary">{session?.user?.username || "N/A"}</span>
          </p>
          <p className="h5 mt-3">
            Your user role: <span className="text-info">{session?.user?.id || "N/A"}</span>
          </p>
          <a href="/user" className="btn btn-outline-primary mt-4">User Page</a>
        </div>
      </>
    </main>
  );
}
