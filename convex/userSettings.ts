import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const themeValidator = v.union(
  v.literal("classic"),
  v.literal("metal"),
  v.literal("cyberdeck"),
  v.literal("vhs"),
  v.literal("broderie"),
  v.literal("bon"),
  v.literal("splitflap")
);

const modeValidator = v.union(
  v.literal("light"),
  v.literal("dark"),
  v.literal("system")
);

export const get = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      return null;
    }
    return await ctx.db
      .query("userSettings")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .unique();
  },
});

export const save = mutation({
  args: { theme: themeValidator, mode: modeValidator },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }
    const existing = await ctx.db
      .query("userSettings")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .unique();
    if (existing) {
      await ctx.db.patch(existing._id, args);
    } else {
      await ctx.db.insert("userSettings", {
        userId: identity.subject,
        ...args,
      });
    }
  },
});
