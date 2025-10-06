<script lang="ts">
    import type { PageData } from "./$types";
    import { serialize } from "$lib/utils/serializeSlate";
    import logo from "$lib/assets/logo.png?w=500&h=500&webp";
    import Galery from "$lib/Galery.svelte";
    import { afterNavigate } from "$app/navigation";

    export let data: PageData;

    const { sections, gallery } = data.landing;

    afterNavigate((event) => {
        const hash = event.to?.url.hash;
        if (hash) {
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 200);
        }
    });
</script>

<svelte:head>
    <meta
        name="description"
        content="La famille Dubey vous propose du miel de production artisanal ajoulote."
    />
    <title>Dubs Apiculture • Miel de Coeuve</title>
</svelte:head>

<div class="max-w-3xl mx-auto flex flex-col gap-10 text-lg sm:text-xl px-4">
    <div class="flex gap-6 justify-between items-center pt-10 md:gap-10">
        <img
            class="w-1/2 rotate-12 max-w-sm"
            src={logo}
            alt="Logo principal miel de Coeuve"
            width="500"
            height="500"
        />
        <div class="w-48 sm:w-72 font-semibold text-3xl sm:text-5xl">
            <h1>
                Dubs<br />
                Apiculture
            </h1>
        </div>
    </div>
    {#if sections}
        {#each sections as section}
            {#if section.title}
                <h2
                    class="text-2xl uppercase tracking-[4px] pt-12 text-secondary-dark"
                >
                    {section.title}
                </h2>
                <div
                    class="h-1 rounded bg-primary w-[70%] -translate-y-6"
                ></div>
            {/if}

            {#if section.text}
                <div
                    class="
                        flex gap-6 sm:gap-10 flex-wrap
                        {section.mode === 'vertical'
                        ? 'flex-col-reverse'
                        : 'sm:flex-nowrap odd:flex-row-reverse items-center'}
                    "
                >
                    <div class="grow">
                        {@html serialize(section.text)}
                    </div>

                    {#if typeof section.image === "object"}
                        <div
                            title={section.image?.title}
                            class="
                                rounded-2xl bg-cover shrink-0 h-72
                                {section.mode === 'vertical'
                                ? 'w-full'
                                : 'w-72 mx-auto'}"
                            style="background-image: url('{encodeURI(
                                section.image?.sizes?.medium?.url || '',
                            )}')"
                        ></div>
                    {/if}
                </div>
            {/if}
        {/each}
    {/if}

    {#if gallery}
        <section>
            <h2 id="gallery" class="text-4xl text-center py-6">
                Galerie photos
            </h2>
            <Galery
                images={gallery?.map((_) => _.image) || []}
                classWrapper=""
                classImageContainer="h-[380px] md:h-[520px]"
                classImage="max-h-[380px] md:max-h-[520px]"
            />
        </section>
    {/if}
</div>
