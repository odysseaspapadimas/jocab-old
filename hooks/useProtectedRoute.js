//https://dev.to/shubhamverma18/implement-protected-routes-in-nextjs-37ml
import { useRouter } from "next/dist/client/router";

const useProtectedRoute = (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const router = useRouter();

      const authUser = localStorage.getItem("authUser");
      // If there is a user we redirect to "/" page.
      if (!authUser) {
        router.replace("/");
        return null;
      }

      // If this is user we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default useProtectedRoute;
