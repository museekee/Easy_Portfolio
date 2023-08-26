<script lang="ts">
    export let key: string
    export let value: string
</script>

<div id="row">
    <span id="key">{key}</span>
    <span id="value">{value}</span>
</div>

<style lang="scss">
    #row {
        display: grid;
        font-size: 1.17em;
        font-weight: bold;
        grid-template-columns: 175px 1fr;
        column-gap: 10px;
    }
        #key {
            display: inline-grid;
            border-right: 1px solid #000000;
            text-align: center;
            align-items: center;
            font-family: "Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Dodum";
        }
        #value {
            display: inline-flex;
            align-items: center;
            font-family: "Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Dodum";
            flex-direction: row;
            flex-wrap: wrap;
        }
</style>