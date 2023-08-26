<script lang="ts">
    export let data: { portfolios: {TYPE: string, ID: string, CREATED_AT: number, LAST_UPDATED: number, MAKER: string, MD: object, DATA: object}[] }
</script>

<main>
    <a href="/portfolio/make">만들기</a>
    <div id="list">
        {#each data.portfolios as item}
            <a href={`/portfolio/${item.ID}`}>{item.ID}</a>
        {/each}
    </div>
</main>

<style>
    #list {
        display: flex;
        flex-direction: column;
    }
</style>