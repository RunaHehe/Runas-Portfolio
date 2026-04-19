<script lang="ts">
	import Window from '../window.svelte';
	import { onMount } from 'svelte';

	export let state: 'open' | 'closing' | 'closed';
	export let origin: { x: number; y: number } | null = null;

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	let drawing = false;
	let brushSize = 5;
	let color = '#ffffff';
	let bgColor = '#000000';

	let text = '';
	let last = null;

	let undoStack: ImageData[] = [];
	let redoStack: ImageData[] = [];

	function saveState() {
		if (!ctx) return;
		undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
		redoStack = [];
	}

	function undo() {
		if (!ctx || undoStack.length === 0) return;

		const current = ctx.getImageData(0, 0, canvas.width, canvas.height);
		redoStack.push(current);

		const prev = undoStack.pop();
		if (prev) ctx.putImageData(prev, 0, 0);
	}

	function redo() {
		if (!ctx || redoStack.length === 0) return;

		const current = ctx.getImageData(0, 0, canvas.width, canvas.height);
		undoStack.push(current);

		const next = redoStack.pop();
		if (next) ctx.putImageData(next, 0, 0);
	}

	function getPos(e: PointerEvent) {
		const rect = canvas.getBoundingClientRect();

		const scaleX = canvas.width / rect.width;
		const scaleY = canvas.height / rect.height;

		return {
			x: (e.clientX - rect.left) * scaleX,
			y: (e.clientY - rect.top) * scaleY
		};
	}

	function applyBg() {
		if (!ctx) return;
		saveState();

		ctx.fillStyle = bgColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	function startDraw(e: PointerEvent) {
		drawing = true;
		if (!ctx) return;

		canvas.setPointerCapture(e.pointerId);

		saveState();

		const { x, y } = getPos(e);

		ctx.beginPath();
		ctx.moveTo(x, y);
	}

	function endDraw(e?: PointerEvent) {
		drawing = false;
		last = null;
		if (!ctx) return;

		if (e) canvas.releasePointerCapture(e.pointerId);
		ctx.beginPath();
	}

	function draw(e: PointerEvent) {
		if (!drawing || !ctx) return;

		const { x, y } = getPos(e);

		ctx.lineWidth = brushSize;
		ctx.lineCap = 'round';
		ctx.strokeStyle = color;

		if (last) {
			ctx.beginPath();
			ctx.moveTo(last.x, last.y);
			ctx.lineTo(x, y);
			ctx.stroke();
		}

		last = { x, y };
	}

	function clearCanvas() {
		if (!ctx) return;
		saveState();

		ctx.fillStyle = bgColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	async function send() {
		const image = canvas.toDataURL('image/png');

		const blank = document.createElement('canvas');
		blank.width = canvas.width;
		blank.height = canvas.height;

		const isBlank = canvas.toDataURL() === blank.toDataURL();

		if (!text && isBlank) {
			alert("can't send empty!!");
			return;
		}

		await fetch('/api/ask', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				text,
				image: isBlank ? null : image
			})
		});

		location.reload();
	}

	onMount(() => {
		if (!canvas) return;
		const context = canvas.getContext('2d');
		if (!context) return;

		ctx = context;

		ctx.fillStyle = bgColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		saveState();
	});
</script>

<Window {state} {origin}>
	<div class="container">
		<canvas
			bind:this={canvas}
			width="600"
			height="450"
			on:pointerdown|preventDefault={startDraw}
			on:pointermove|preventDefault={draw}
			on:pointerup={endDraw}
			on:pointercancel={endDraw}
		></canvas>

		<div class="tools">
			<input type="color" bind:value={color} />
			<input type="color" bind:value={bgColor} on:change={applyBg} />
			<input type="range" min="1" max="20" bind:value={brushSize} />

			<button on:click={undo}>Undo</button>
			<button on:click={redo}>Redo</button>

			<button on:click={clearCanvas}>Clear</button>
		</div>

		<textarea bind:value={text} placeholder="ask or say something..."></textarea>

		<button on:click={send}>Send</button>
	</div>
</Window>

<style>
	canvas {
		touch-action: none;
	}
</style>
