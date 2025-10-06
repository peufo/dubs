import type { PageLoad } from "./$types";
import { useApi } from "$lib/api";

export const load = (async ({ fetch }) => {
    const api = useApi(fetch);
    const landing = await api.getGlobal("landing");
    return { landing };
}) satisfies PageLoad;
