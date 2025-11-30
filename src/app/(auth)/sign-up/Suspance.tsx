// app/login/GoogleCallbackHandler.tsx  ("use client" – tiny, focused)
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { parseAsString, useQueryStates } from "nuqs";

const searchParams = {
    code: parseAsString.withDefault(""),
    state: parseAsString.withDefault(""),
};

export default function GoogleCallbackHandler() {
    const router = useRouter()
    const [params, setParams] = useQueryStates(searchParams);
    useEffect(() => {

        if (params.code) {

            const exchangeWithBackend = async () => {
                try {
                    const res = await fetch("/api/OAuth", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ code: params.code }),
                    });

                    if (!res.ok) {
                        const error = await res.text();
                        console.error("Exchange failed:", error);
                        return;
                    }

                    const data = await res.json();
                    console.log("Exchange success:", data);

                } catch (err) {
                    console.error("Fetch error:", err);
                } finally {
                    // Clean the URL so this effect never runs again
                    const cleanUrl = new URL(window.location.href);
                    ["code", "scope", "authuser", "prompt", "state"].forEach((p) =>
                        cleanUrl.searchParams.delete(p)
                    );
                    router.replace(cleanUrl.pathname + cleanUrl.search, { scroll: false });
                }
            };

            exchangeWithBackend();

        }
    }, [params.code]);

    return null;  // Invisible
}