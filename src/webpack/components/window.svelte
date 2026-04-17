<script lang="ts">
	import { onMount } from 'svelte';

	export let fixedSize = false;

	export let origin: { x: number; y: number } | null = null;
	export let state: 'open' | 'closing' | 'closed';

	let isMobile = false;

	let startX = 0;
	let startY = 0;

	function updateStart() {
		if (origin) {
			startX = origin.x;
			startY = origin.y;
			return;
		}

		if (typeof window === 'undefined') return;

		startX = window.innerWidth / 2;
		startY = window.innerHeight / 2;
	}

	onMount(() => {
		updateStart();

		const resize = () => {
			if (!origin) updateStart();
		};
		window.addEventListener('resize', resize);
		return () => window.removeEventListener('resize', resize);
	});
</script>

<div
	class="window frame {state} {origin} {fixedSize ? 'fixed' : ''} {isMobile ? 'mobile' : ''}"
	style="--x: {startX}px; --y: {startY}px;"
>
	<div class="mainframe">
		<slot />
	</div>
</div>

<!--
how 2 use

<script lang="ts">
	import Window from '../window.svelte';

	export let onClose: () => void = () => {};
</script>

<Window title="Title Page" {onClose}>
	<p>Meow!!!~</p>
</Window>

<style>
    p, a, span {
        text-decoration: none;
        text-shadow: 0px 5px 5px black;
    } a {
        color: aqua;
    }
</style>

-->

<style>
	.window {
		position: fixed;
		z-index: 1000;

		left: 0;
		top: 0;

		width: max-content;
		max-width: 90vw;
		max-height: 90vh;

		display: flex;
		flex-direction: column;

		box-sizing: border-box;
		overflow: hidden;

		opacity: 0;

		transform: translate(calc(var(--x) * 1px), calc(var(--y) * 1px)) translate(-50%, -50%)
			scale(0.2);

		transition:
			transform 300ms ease,
			opacity 300ms ease;

		pointer-events: none;
	}

	.window.open {
		opacity: 1;

		transform: translate(50vw, 50vh) translate(-50%, -50%) scale(1);

		pointer-events: auto;
	}

	.window.closing {
		opacity: 0;

		transform: translate(calc(var(--x) * 1px), calc(var(--y) * 1px)) translate(-50%, -50%)
			scale(0.2);

		pointer-events: none;
	}

	.window.fixed {
		width: 420px;
		max-width: 420px;
	}

	.window.closed {
		pointer-events: none;
	}

	.mainframe {
		font-size: 0.95rem;
		line-height: 1.4;
		overflow-wrap: anywhere;
		word-break: break-word;
		white-space: normal;
		overflow-y: auto;
		overflow-x: visible;

		padding-bottom: 20px;
		padding-left: 20px;
		padding-right: 20px;

		scrollbar-width: thin;
		scrollbar-color: rgb(255, 255, 255) rgba(0, 0, 0, 0);
	}

	@media (max-width: 768px) {
		.window {
			width: 94vw;
			max-width: 94vw;
			max-height: 70vh;
		}

		.mainframe {
			padding-left: 16px;
			padding-right: 16px;
			padding-bottom: 16px;
		}
	}
</style>
