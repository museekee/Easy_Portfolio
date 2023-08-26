<script lang="ts">
    //#region import
    import JsonEditor from "../../../components/JsonEditor.svelte";
    import MdListItem from "../../../components/mdListItem.svelte"
    import * as svelox from "svelox"
    //#endregion

    //#region FrontendBindings
    const editor: {
        body: HTMLDivElement,
        codeEditor: {
            body: HTMLDivElement
        }
    } = {
        //@ts-ignore
        body: undefined,
        codeEditor: {
            //@ts-ignore
            body: undefined
        }
    }
    export let data: { typeList: string[] }
    //#endregion
    const editorData: {type: string, code: string} = {
        type: "none",
        code: ""
    }
    let setJson: (e: string | { currentTarget: HTMLTextAreaElement & EventTarget; }) => void;
    //#region MdList
    let mdList: svelox.ArrayAddition<{key: string, value: string}[]>;
    $: mdList = svelox.sx([
        {
            key: "defText",
            value: "내용"
        }
    ], (item) => mdList = item)
    //#endregion
    
    //#region 슬라이더
    let codeWidth = 0
    let codePercent = 50;

    let expanding = false
    const mouse = {
        x: 0
    }

	function startExpand(e: {
        clientX: number;
        pageX: number; 
}) {   
		expanding = true
        mouse.x = e.clientX
        codeWidth = editor.body.clientWidth
	}
	
	function stopExpand() {
		expanding = false
	}
	
	function expand(e: {
        clientX: number;
        pageX: number; 
}) {    
		if (!expanding) return
        const dx = e.clientX - mouse.x;
        codePercent = ((codeWidth + dx) * 100) / editor.body.clientWidth;
		return
	}
    //#endregion

    //#region FrontendCode
    //#endregion
    async function setType(e: { currentTarget: HTMLSelectElement & EventTarget }) {
        const res = await fetch(`/api/portfolio/defData/${e.currentTarget.value}`)
        const data = await res.json()
        if (data.code === 200) {
            setJson(JSON.stringify(data.data))
            editorData.type = data.data.type
        }
        else {
            alert("알 수 없는 템플릿입니다.")
            e.currentTarget.value = editorData.type
        }
    }
    function addMdListItem() {
        mdList.push({key: "key", value: "value"})
        // console.log(mdList.copyWithin()[0])
        console.log(editorData, mdList)
    }

    async function save() {
        console.log(editorData.code === "" ? "{}": editorData.code)
        const res = await fetch(`/api/portfolio/upload`, {
            method: "POST",
            body: JSON.stringify({
                mdList,
                code: editorData.code === "" ? "{}": editorData.code,
                type: editorData.type
            })
        })
        console.log(await res.json())
    }
</script>
<svelte:window on:mouseup={expanding ? stopExpand : () => {}} on:mousemove={expanding ? expand : () => {}} />
<main lang="ts">
    <div id="editor" bind:this={editor.body}>
        <div id="code" style={`width: ${codePercent}%;`} class:expanding bind:this={editor.codeEditor.body}>
            <div id="typeSelectorBlock">
                <label for="typeSelector">타입 (변경시 쓰던 내용 삭제) : </label>
                <select id="typeSelector" on:change={setType}>
                    <option selected disabled>템플릿 타입을 선택해주세요</option>
                    {#each data.typeList as value}
                        <option value={value}>{value}</option>
                    {/each}
                </select>
            </div>
            <JsonEditor bind:setJson={setJson} style={`height: 100%;`} data={editorData.code} />
        </div>
        <div id="divider" class:expanding on:mousedown={startExpand}></div>
        <div id="variables" class:expanding>
            <h1>내용 변수 리스트</h1>
            <div class="list">
                {#each mdList as item, i}
                    <MdListItem
                        key={item.key}
                        value={item.value}
                        index={i}
                        onDelete={(idx) => mdList.splice(idx, 1)}
                        onKeyChange={(e) => {mdList[i].key = e.currentTarget.value}}
                        onValueChange={(e) => {mdList[i].value = e.currentTarget.value}} />
                {/each}
                <button class="add" on:click={addMdListItem}>+</button>
            </div>
        </div>
    </div>
    <button id="save" on:click={save}>저장</button>
</main>

<style>
    main {
        display: grid;
        grid-template-columns: 350px 1fr;
        grid-template-rows: 1fr 75px;
        width: 100%;
        height: 100%;
    }
    #editor {
        display: flex;
        grid-column: 2;
        grid-row: 1;
    }
    #code, #variables {
        min-width: 150px;
        display: inline-block;
        overflow: auto;
        height: auto;
        max-height: 100%;
        position: relative;
        background: #eeeeee;
        font-size: 13px;
    }
    #code {
        display: inline-grid;
        grid-template-rows: 60px 1fr;
    }
    #typeSelectorBlock {
        padding: 10px;
    }
        #typeSelector {
            padding: 5px 12.5px;
            border: 1px solid #000000;
            border-radius: 999px;
            font-size: 18px;
            font-weight: bold;
        }
    #divider {
        width: 50%;
        width: 2px;
        background: #aaaaaa;
        height: 100%;
        cursor: ew-resize;
    }

    #variables {
        flex: 1;
    }
    #variables h1 {
        text-align: center;
    }
        #variables .list {
            width: 100%;
            position: absolute;
            overflow: auto;
        }
        #variables .list .add {
            border: none;
            background: #0088ff;
            font-size: 50px;
            width: 100%;
            border-radius: 999px;
            cursor: pointer;
            margin-top: 10px;
        }

    #save {
        grid-column: 2;
        grid-row: 2;
        aspect-ratio: 1 / 1;
        height: 95%;
        margin: auto;
        border-radius: 50%;
        border-color: #0000ff;
        background-color: #00aaff;
        margin-right: 10px;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
    }

    .expanding {
        user-select: none;
        pointer-events: none;
    }
</style>