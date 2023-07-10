import { Code } from "@/app/api/profile/route";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as actions from "./actions"

type Action = "sign-in" | "sign-up" | "sign-out";
type Response<T> = { message: string; data: T; code: Code };

export default function useAuth<Profile>(action?: Action) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const auth = async (data: Profile) => {
    try {
      setIsLoading(true);
      const response = await api.post<Response<Profile>>("/profile", {
        profile: data,
        action,
      });
      if (response.data.code === "auth-success") {
        router.push("/");
      }
      toast({ title: response.data.message });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    await actions.signOut();
    router.push("/signin")
  } 
  return { isLoading, auth, signOut }
}
