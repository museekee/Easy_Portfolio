<script lang="ts">
    import PortDownRenderer from "../portDownRenderer.svelte";

    const data: {
        tag: string,
        attributes?: {
            [x: string]: string
        },
        content?: string,
        isCustomTag?: boolean
    }[] = [
        {
            tag: "h1",
            content: "ㅋㅋ"
        },
        {
            tag: "img",
            attributes: {
                src: "https://meetjessicatan.files.wordpress.com/2009/11/testimg.jpg"
            }
        }
    ]
</script>

<main>
    <PortDownRenderer {data} />
</main>

<!-- <style lang="scss">
    img {
        display: block;
        border-radius: 20px;
    }
    h1 {
        font-weight: lighter;
        font-size: 2.5rem;
    }
    h3 img, post-table img {
        display: inline-block !important;
        width: 50px;
        vertical-align: bottom !important;
    }
    main {
        display: flex;
        max-width: 1350px;
        margin: auto;
        flex-direction: column;
        align-items: center;
    }
</style> -->