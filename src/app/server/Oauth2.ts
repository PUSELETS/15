import { OAuth2Client } from "google-auth-library";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { cookies , headers } from "next/headers";

const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_IDf,
  process.env.GOOGLE_CLIENT_SECRETf,
  'https://15canary.netlify.app/sign-up',
);

export const oauthRouter = router({

  exchangeCode: publicProcedure
    .input(z.object({ code: z.string() }))
    .mutation(async ({ input }) => {
      
      const { code } = input;

      const { tokens } = await oAuth2Client.getToken(code);

      const token = tokens.id_token as string

      const cookieStore = await cookies()

       cookieStore.set("user-token", token)

      return {success : true};
    }),

})