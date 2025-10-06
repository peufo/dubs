<script lang="ts">
    import type { LayoutData } from "./$types";
    import Notifications from "svelte-notifications";

    import "../app.css";
    import Footer from "./Footer.svelte";
    import Menu from "$lib/Menu.svelte";
    import Order from "$lib/Order.svelte";

    import Watermark from "$lib/material/Watermark.svelte";

    export let data: LayoutData;
</script>

<Notifications>
    <div class="min-h-screen flex flex-col">
        <header>
            <Menu
                items={[
                    { label: "Accueil", href: "/" },
                    { label: "Boutique", href: "/shop" },
                    { label: "Galerie", href: "/#gallery" },
                    {
                        label: data.session?.user?.name || "Connexion",
                        href: "/profile",
                    },
                ]}
            />
        </header>

        <main class="grow">
            <Watermark />
            <slot />
        </main>

        <Footer links={data.links || []} />
    </div>

    <Order />
</Notifications>
