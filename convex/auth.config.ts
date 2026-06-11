export default {
  providers: [
    {
      // Set CLERK_JWT_ISSUER_DOMAIN in your Convex deployment env vars
      // (npx convex env set CLERK_JWT_ISSUER_DOMAIN https://your-app.clerk.accounts.dev)
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN,
      applicationID: "convex",
    },
  ],
};
