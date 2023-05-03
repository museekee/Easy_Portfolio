<script lang="ts">
    export let key = "키"
    export let value = "값"
    export let index: number;
    export let onDelete: (idx: number) => void;
    export let onKeyChange: (e: Event & {currentTarget: HTMLInputElement & EventTarget}) => void;
    export let onValueChange: (e: Event & {currentTarget: HTMLTextAreaElement & EventTarget}) => void;
</script>

<div class="container">
    <button class="delete" on:click={() => onDelete(index)}>X</button>
    <input class="key" value={key} on:input={onKeyChange}>
    <textarea class="value" on:input={onValueChange}>{value}</textarea>
</div>

<style>
    .container {
        display: grid;
        grid-template-columns: auto 150px 1fr;
        gap: 10px;
        padding: 10px;
        border-bottom: #000000 solid 1px;
    }
    .delete {
        aspect-ratio: 1 / 1;
        background: #ff0000;
        outline: none;
        border: none;
        width: 40px;
        border-radius: 50%;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        transition: all 250ms;
    }
    .delete:hover {
        background: #ff5555;
    }
    .delete:active {
        background: #dd0000;
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
        padding: 10px;
    }
</style>