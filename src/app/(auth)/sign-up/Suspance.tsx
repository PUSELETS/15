// app/login/GoogleCallbackHandler.tsx  ("use client" – tiny, focused)
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { parseAsString, useQueryStates } from "nuqs";
import { trpc } from "@/app/_trpc/client";
import { toast } from "sonner";

const searchParams = {
  code: parseAsString.withDefault(""),
  state: parseAsString.withDefault(""),
};

export default function GoogleCallbackHandler() {
    const router = useRouter()
  const [params, setParams] = useQueryStates(searchParams);
  
      const exchangeCode = trpc.oauth2.exchangeCode.useMutation({
          onSuccess: () => {
              
              toast.success('Welcome!')
          },
          onError: (error) => console.error('Exchange Error:', error),
      });
  
      useEffect(() => {
          
          if (params.code) {
  
              let code = params.code as string
  
              exchangeCode.mutate({ code }) ;
              
              router.refresh();  // refresh server data
  
              // Clean the URL (remove ?code=...&scope=...)
              const cleanUrl = new URL(window.location.href);
              ["code", "scope", "authuser", "prompt", "state"].forEach((p) =>
                  cleanUrl.searchParams.delete(p)
              );
              router.replace(cleanUrl.pathname + cleanUrl.search, { scroll: false });
          }
      }, [params.code]);

  return null;  // Invisible
}