<script lang="ts">
    export let data: {
        tag: string,
        attributes?: {
            [x: string]: string
        },
        content?: string,
        isCustomTag?: boolean
    }[]
</script>

{#each data as {tag, content, attributes, isCustomTag}}
    {#if isCustomTag}
        <h1>몰루</h1>
    {:else}
        {@html 
            `<${tag} ${attributes ? Object.entries(attributes).map(([key, value]) => `${key}=${value}`).join(" ") : ""}>${content ?? ""}</${tag}>`
        }
    {/if}
{/each}