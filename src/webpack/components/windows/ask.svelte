<script lang="ts">
	import Window from '../window.svelte';
	export let onClose: () => void = () => {};

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	let drawing = false;
	let brushSize = 5;
	let color = '#ffffff';
	let bgColor = '#000000';

	let text = '';

	function applyBg() {
		if (!ctx) return;

		ctx.fillStyle = bgColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	function startDraw(e: MouseEvent) {
		drawing = true;
		if (!ctx) return;

		const rect = canvas.getBoundingClientRect();
		const scaleX = canvas.width / rect.width;
		const scaleY = canvas.height / rect.height;

		const x = (e.clientX - rect.left) * scaleX;
		const y = (e.clientY - rect.top) * scaleY;

		ctx.beginPath();
		ctx.moveTo(x, y);
	}

	function endDraw() {
		drawing = false;
		if (!ctx) return;
		ctx.beginPath();
	}

	function draw(e: MouseEvent) {
		if (!drawing || !ctx) return;

		const rect = canvas.getBoundingClientRect();
		const scaleX = canvas.width / rect.width;
		const scaleY = canvas.height / rect.height;

		const x = (e.clientX - rect.left) * scaleX;
		const y = (e.clientY - rect.top) * scaleY;

		ctx.lineWidth = brushSize;
		ctx.lineCap = 'round';
		ctx.strokeStyle = color;

		ctx.lineTo(x, y);
		ctx.stroke();
	}

	function clearCanvas() {
		if (!ctx) return;

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
			body: JSON.stringify({
				text,
				image: isBlank ? null : image
			})
		});

		location.reload();
	}

	import { onMount } from 'svelte';

	onMount(() => {
		const context = canvas.getContext('2d');
		if (!context) return;

		ctx = context;

		ctx.fillStyle = bgColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	});
</script>

<Window title="Ask / Draw" {onClose}>
	<div class="container">
		<canvas
			bind:this={canvas}
			width="400"
			height="300"
			on:pointerdown={startDraw}
			on:pointermove={draw}
			on:pointerup={endDraw}
			on:pointerleave={endDraw}
		></canvas>

		<div class="tools">
			<input type="color" bind:value={color} />
			<input type="color" bind:value={bgColor} on:change={applyBg} />
			<input type="range" min="1" max="20" bind:value={brushSize} />
			<button on:click={clearCanvas}>Clear</button>
		</div>

		<textarea bind:value={text} placeholder="ask or say something..."></textarea>

		<button on:click={send}>Send</button>
	</div>
</Window>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	canvas {
		border: 2px solid white;
		background: black;
	}

	.tools {
		display: flex;
		gap: 5px;
	}
</style>
