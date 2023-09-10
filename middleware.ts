export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/landing/:path*",
    "/dashboard/:path*",
    "/membership/:path*",
    "/beneficiaries/:path*",
    "/dependents/:path*",
    "/upgrade-membership/:path*",
  ],
};
