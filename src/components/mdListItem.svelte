<script lang="ts">
    export let key = "키"
    export let value = "값"
    export let onKeyChange: (e: Event & {currentTarget: HTMLInputElement & EventTarget}) => void;
    export let onValueChange: (e: Event & {currentTarget: HTMLTextAreaElement & EventTarget}) => void;
</script>

<div class="container">
    <input class="key" value={key} on:input={onKeyChange}>
    <textarea class="value" on:input={onValueChange}>{value}</textarea>
</div>

<style>
    .container {
        display: grid;
        grid-template-columns: 150px 1fr;
        gap: 10px;
        padding: 10px;
        border-bottom: #000000 solid 1px;
    }
    .key {
        font-size: 18px;
        font-weight: bold;
        border-radius: 999px;
        padding: 5px 10px;
        height: fit-content;
        border-color: #000000;
    }
    .value {
        font-size: 15px;
        outline: none;
        border-color: #000000;
        resize: vertical;
        /* height: calc(100% + 10px); */
        padding: 10px;
    }
</style>