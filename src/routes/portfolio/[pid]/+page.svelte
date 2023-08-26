<script lang="ts">
    import Facebook from "../../../components/portfolios/facebook.svelte";

    export let data: { data: { TYPE: string, ID: string, CREATED_AT: number, LAST_UPDATED: number, MAKER: string, MD: object, DATA: object } }
    const type = data.data.TYPE
    console.log(data)
</script>
{#if type === "Facebook"}
    <Facebook />
{/if}