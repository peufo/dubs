import { CollectionConfig } from "payload/types";
import { env } from "../env";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
  fields: [{ type: "text", name: "title" }],
  upload: {
    staticURL: "/media",
    staticDir: env.MEDIA_DIR,
    imageSizes: [
      {
        name: "thumbnail",
        width: 300,
        height: 300,
        position: "centre",
      },
      {
        name: "card_w",
        width: 400,
        height: null,
        position: "centre",
      },
      {
        name: "card_h",
        width: null,
        height: 400,
        position: "centre",
      },
      {
        name: "mini",
        width: 200,
        height: null,
        position: "centre",
      },
      {
        name: "medium",
        width: 700,
        height: null,
        position: "centre",
      },
      {
        name: "large",
        width: 1024,
        height: null,
        position: "centre",
      },
    ],
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*"],
  },
};
