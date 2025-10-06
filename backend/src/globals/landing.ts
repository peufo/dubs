import { GlobalConfig } from "payload/types";

export const Landing: GlobalConfig = {
    slug: "landing",
    label: "Page d'accueil",
    admin: {
        preview: () => "/",
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: "sections",
            type: "array",
            fields: [
                {
                    name: "title",
                    type: "text",
                },
                {
                    name: "text",
                    type: "richText",
                },
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                },
                {
                    name: "mode",
                    type: "select",
                    options: [
                        { label: "Horizontal", value: "horizontal" },
                        { label: "Vertical", value: "vertical" },
                    ],
                },
            ],
        },
        {
            name: "gallery",
            type: "array",
            fields: [
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                },
            ],
        },
    ],
};
