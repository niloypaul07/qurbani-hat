import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({

    baseURL: "https://qurbani-hat-zeta.vercel.app"
})

export const { signIn, signUp, useSession } = createAuthClient()