<script lang="ts">
    import HeaderItem from "../components/headerItem.svelte";
</script>

<header>
    <a href="/" id="logo"><img src="/logo.svg" alt="logo"></a>
    <div id="right">
        <HeaderItem href="/portfolio/list" name="작품목록" />
    </div>
</header>

<style>
    header {
        height: 50px;
        display: grid;
        grid-template-columns: auto 1fr auto;
        justify-content: center;
        margin: 0px 30px;
        align-items: center;
    }
    #logo {
        justify-self: left;
        height: 45px;
    }
        #logo > img {
            height: 100%;
        }
    #right {
        grid-column: 3;
    }
</style>

<slot></slot>