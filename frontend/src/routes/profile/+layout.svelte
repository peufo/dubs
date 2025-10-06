<script lang="ts">
    import { fade, slide } from "svelte/transition";
    import type { HttpError } from "@sveltejs/kit";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { getNotificationsContext } from "svelte-notifications";

    import { api } from "$lib/api";
    import type { LayoutData } from "./$types";
    import type { User } from "types";
    import Title from "$lib/Title.svelte";
    import Label from "$lib/material/Label.svelte";
    import TextField from "$lib/material/TextField.svelte";
    import Button from "$lib/material/Button.svelte";

    export let data: LayoutData;

    const { addNotification } = getNotificationsContext();

    let createAccount = false;
    let errorMessage = "";
    let emailSend = false;

    let user = {
        email: "",
        password: "",
        name: "",
        surname: "",
        street: "",
        zipCode: "",
        city: "",
    } satisfies Partial<User>;

    async function handleSubmit() {
        try {
            if (createAccount) await api.create("user", user);

            await api.login(user);
        } catch (error) {
            if (!error) return;
            if (typeof error === "object" && "body" in error)
                errorMessage = (error as HttpError).body.message || "Erreur";
            return;
        }

        errorMessage = "";

        const callback = $page.url.searchParams.get("callback");
        goto(callback || "/profile", { invalidateAll: true });
    }

    async function handleForgotPassword() {
        if (!user.email)
            return addNotification({
                type: "error",
                text: "Veuillez renseigner l'email",
                position: "top-center",
                removeAfter: 3000,
            });

        await api.forgotPassword(user.email);
        emailSend = true;
        addNotification({
            type: "success",
            text: "Un email vous à été envoyé",
            position: "top-center",
            removeAfter: 3000,
        });
    }
</script>

<Title subtitle={data.session?.user ? "Profil" : "Authentification"} />

{#if data.session?.user}
    <slot />
{:else}
    <div class="p-4 sm:grid place-content-center min-h-[500px]">
        <div
            class="p-8 w-full sm:w-[360px] flex flex-col gap-4 border bg-white shadow-md rounded-lg"
        >
            {#if errorMessage}
                <div
                    class="p-2 rounded border border-orange-700 text-orange-700 text-center"
                >
                    {@html errorMessage}
                </div>
            {/if}
            <form
                on:submit|preventDefault={handleSubmit}
                class="flex flex-col gap-4 font-semibold"
            >
                <Label>
                    Email
                    <input
                        type="email"
                        bind:value={user.email}
                        class="w-full px-4 py-2 rounded-md border font-normal"
                    />
                </Label>
                <Label>
                    Mot de passe
                    <input
                        type="password"
                        bind:value={user.password}
                        class="w-full px-4 py-2 rounded-md border font-normal"
                    />
                </Label>

                {#if createAccount}
                    <div transition:slide|local class="flex flex-col gap-4">
                        <hr />
                        <div class="flex gap-4">
                            <TextField
                                name="name"
                                label="Prénom"
                                bind:value={user.name}
                                class="grow"
                            />
                            <TextField
                                name="surname"
                                label="Nom"
                                bind:value={user.surname}
                                class="grow"
                            />
                        </div>
                        <TextField
                            label="Rue et numéro"
                            bind:value={user.street}
                            name="street"
                        />

                        <div class="flex gap-4">
                            <TextField
                                label="Code postal"
                                bind:value={user.zipCode}
                                name="zipCode"
                                minLength={4}
                                maxLength={4}
                                pattern="[1-9][0-9][0-9][0-9]"
                                class="max-w-[90px]"
                            />
                            <TextField
                                label="Ville"
                                bind:value={user.city}
                                name="city"
                                class="grow"
                            />
                        </div>
                    </div>
                {/if}

                <div class="flex gap-4 flex-wrap">
                    {#if !createAccount}
                        <Button
                            primary
                            type="button"
                            on:click={() => (createAccount = true)}
                            class="grow"
                        >
                            Nouveau
                        </Button>
                    {/if}
                    <Button primary type="submit" class="grow">
                        {createAccount ? "Créer un compte" : "Connexion"}
                    </Button>
                </div>

                <div class="flex font-normal">
                    {#if !emailSend}
                        <button
                            transition:fade|local
                            type="button"
                            on:click={handleForgotPassword}
                            on:keyup={handleForgotPassword}
                            class="hover:underline"
                        >
                            Mot de passe oublié
                        </button>
                    {/if}
                    {#if createAccount}
                        <button
                            transition:fade|local
                            type="button"
                            class="hover:underline ml-auto"
                            on:click={() => (createAccount = false)}
                            on:keyup={() => (createAccount = false)}
                        >
                            Déjà un compte
                        </button>
                    {/if}
                </div>
            </form>
        </div>
    </div>
{/if}
