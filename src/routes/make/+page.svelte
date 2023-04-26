<script lang="ts">
    let editor: HTMLDivElement
    let codeEditor: HTMLDivElement
    let codeInput: HTMLTextAreaElement
    let codeCode: HTMLElement
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
        codeWidth = codeEditor.clientWidth
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
        codePercent = ((codeWidth + dx) * 100) / editor.clientWidth;
		return
	}
    const json = {
        replacer: (match: any, pIndent: string, pKey: string, pVal: string | string[], pEnd: any) => {
            const key = '<span style="color: #0088ff;">';
            const val = '<span style="color: navy;">';
            const str = '<span style="color: brown;">';
            let r = pIndent || '';
            if (pKey)
                r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
            if (pVal)
                r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
            return r + (pEnd || '');
        },
        prettyPrint: (obj: object) => {
            const jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
            return JSON.stringify(obj, null, 4)
                .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
                .replace(/</g, '&lt;').replace(/>/g, '&gt;')
                .replace(jsonLine, json.replacer)
                .replaceAll("\n", "<br />")
                .replaceAll("  ", "&nbsp;");
        }
    }
    function showCodeInput() {
        codeInput.style.display = "block"
        codeCode.style.display = "none"
        codeEditor.style.overflow = "hidden"
    }
    function showCodeCode() {
        codeCode.style.display = "block"
        codeInput.style.display = "none"
        codeEditor.style.overflow = "auto"
    }
    function setCodeCode(e: { currentTarget: HTMLTextAreaElement & EventTarget }) {
        try {
            codeCode.innerHTML = json.prettyPrint(JSON.parse(e.currentTarget.value))
        }
        catch (err) {
            codeCode.innerHTML = `<span style="color: #ff0000; font-size: 100px; font-weight: bolder;">파싱 오류!</span>
            <br />
            <span style="color: #ff0000; font-size: 25px; font-weight: bolder;">${err}</span>`
        }
    }
</script>
<svelte:window on:mouseup={expanding ? stopExpand : () => {}} on:mousemove={expanding ? expand : () => {}} />
<main lang="ts">
    <div id="editor" bind:this={editor}>
        <div class="code" style={`width: ${codePercent}%;`} class:expanding bind:this={codeEditor}>
            <code bind:this={codeCode} on:mousedown={(e) => {
                if (e.button === 0) showCodeInput()
            }}></code>
            <textarea bind:this={codeInput} on:focusout={showCodeCode} on:input={setCodeCode}>zzz</textarea>
        </div>
        <div class="divider" class:expanding on:mousedown={startExpand}></div>
        <div class="variables" class:expanding>
             
        </div>
    </div>
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
    .code, .variables {
        min-width: 150px;
        display: inline-block;
        overflow: auto;
        height: auto;
        max-height: 100%;
        position: relative;
    }
    .code {
        background: #eeeeee;
    }
        .code > * {
            width: 100%;
            height: 100%;
            outline: none;
            border: none;
            background: none;
            resize: none;
            position: absolute;
        }

    .variables {
        background-color: #00ff00;
        flex: 1;
    }
    .divider {
        width: 50%;
        width: 2px;
        background: #aaaaaa;
        height: 100%;
        cursor: ew-resize;
    }
    .expanding {
        user-select: none;
        pointer-events: none;
    }
</style>