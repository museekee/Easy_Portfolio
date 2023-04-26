<script lang="ts">
    export let name = "지정 안 함"
    export let href = "/"
</script>

<a href={href}>{name}</a>

<style>
    a {
        display: inline-flex;
        text-decoration: none;
        color: #000000;
        padding: 0px 20px;
        font-size: 18px;
        font-weight: bold;
        height: 100%;
        align-items: center;
    }
</style>