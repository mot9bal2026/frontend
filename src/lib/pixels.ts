/**
 * Pixel IDs are public (visible in network tab). NEXT_PUBLIC_* is baked at
 * `next build` time — EasyPanel must pass these as build env, or we fall back
 * to the defaults below so production pixels still load.
 */
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
export const TIKTOK_PIXEL_ID =
  process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ?? "D8J13V3C77U48KTDRIEG";
export const SNAP_PIXEL_ID = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID ?? "";
export const ENABLE_PIXELS = process.env.NEXT_PUBLIC_ENABLE_PIXELS !== "false";
