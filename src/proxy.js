import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    const pathname = request.nextUrl.pathname;

    
    if (!session?.user) {
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect("/login");
    }

    
    return NextResponse.next();
}

export const config = {
    matcher: ["/my-profile", "/update-profile", "/details-page/:path*"],
};