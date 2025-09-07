import path from "path";

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";

import { User, Account, Session } from "./collections/user";
import { Action } from "./collections/action";
import { Tag } from "./collections/tag";
import { Media } from "./collections/media";
import { Product } from "./collections/product";
import { Order } from "./collections/order";

import { Landing } from "./globals/landing";
import { Footer } from "./globals/footer";
import { Process } from "./globals/process";
import { Email } from "./globals/email";

import { Logo, Icon } from "./components/Graphics";
import { BeforeNavLinks } from "./components/BeforeNavLinks";
import { env } from "./env";

export default buildConfig({
  admin: {
    user: User.slug,
    meta: {
      ogImage: "/img/logo.png",
      titleSuffix: "- Dubs Apiculture",
      favicon: "/favicon.ico",
    },
    components: {
      graphics: {
        Logo,
        Icon,
      },
      beforeNavLinks: [BeforeNavLinks],
    },
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [User, Account, Session, Action, Tag, Media, Product, Order],
  globals: [Landing, Footer, Process, Email],
  typescript: {
    outputFile: path.resolve(__dirname, "../../types/collections.ts"),
  },
  db: mongooseAdapter({
    url: env.MONGODB_URL,
  }),
  cors: "*",
});
