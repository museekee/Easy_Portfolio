<script lang="ts">
    export let data: string
    export let style: string
    let textBox: HTMLTextAreaElement
    let jsonViewer: HTMLElement

    const jsonManager = {
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
                .replace(jsonLine, jsonManager.replacer)
                .replaceAll("\n", "<br />")
                .replaceAll("  ", "&nbsp;&nbsp;");
        }
    }


    function showTextBox() {
        textBox.style.display = "block"
        jsonViewer.style.display = "none"
    }
    function showJsonViewer() {
        jsonViewer.style.display = "block"
        textBox.style.display = "none"
    }
    export function setJson(e: { currentTarget: HTMLTextAreaElement & EventTarget } | string) {
        if (typeof e === "string")
            data = e
        else
            data = e.currentTarget.value
        console.log(data)
        try {
            const jsoncode = JSON.parse(data) // json화를 시켜봄
            console.log(jsoncode)
            jsonViewer.innerHTML = jsonManager.prettyPrint(jsoncode) // 되면 이쁘게 출력
            textBox.value = JSON.stringify(jsoncode, null, 4) // 입력부분도 정리해줌
        }
        catch (err) {
            textBox.value = data // 그대로 놔둠
            jsonViewer.innerHTML = `<span style="color: #ff0000; font-size: 100px; font-weight: bolder;">파싱 오류!</span>
            <br />
            <span style="color: #ff0000; font-size: 25px; font-weight: bolder;">${err}</span>` // json아니라고 오류 내뿜음
        }
    }
</script>

<div style={style}>
    <code style="display: none;" bind:this={jsonViewer} on:mousedown={(e) => {
        if (e.button === 0) showTextBox()
    }}></code>
    <textarea bind:this={textBox} on:focusout={showJsonViewer} on:input={setJson}></textarea>
</div>

<style lang="scss">
    div > * {
        width: 100%;
        height: calc(100% - 60px);
        outline: none;
        border: none;
        background: none;
        resize: none;
        position: absolute;
        white-space: pre-wrap;
    }
</style>