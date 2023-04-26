<script lang="ts">
    let editor: HTMLDivElement
    let codeEditor: HTMLDivElement
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
</script>
<svelte:window on:mouseup={expanding ? stopExpand : () => {}} on:mousemove={expanding ? expand : () => {}} />
<main>
    <div id="editor" bind:this={editor}>
        <div class="code" style={`width: ${codePercent}%;`} class:expanding bind:this={codeEditor}><input /></div>
        <div class="divider" class:expanding on:mousedown={startExpand}></div>
        <div class="variables" class:expanding>
             
        </div>
    </div>
</main>

<style>
    main {
        display: grid;
        grid-template-columns: 200px 1fr;
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
        height: 100%;
        display: inline-block;
    }
    .code {
        background: #eeeeee;
        width: 50%;
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