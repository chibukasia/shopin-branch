import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const authRedirect = (router: AppRouterInstance, error: { response: { status: number; }; request: unknown; message: unknown; }) => {
    if (error.response) {
      if (error.response.status === 401) {
        router.push("/signin");
        return;
      }
  
      console.log(error);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
  }