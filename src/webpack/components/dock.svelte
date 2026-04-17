<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let onAboutClick;
	export let onLinksClick;
	export let onContributionsClick;
	export let onAskClick;

	let visible = false;
	let mouseX = 0;
	let forceOpen = false;

	let aboutBtn: HTMLButtonElement;
	let linksBtn: HTMLButtonElement;
	let contribBtn: HTMLButtonElement;
	let askBtn: HTMLButtonElement;

	function getPos(el: HTMLElement) {
		if (!browser) return { x: 0, y: 0 };

		const rect = el.getBoundingClientRect();
		return {
			x: rect.left + rect.width / 2,
			y: rect.top + rect.height / 2
		};
	}

	function handleMouseMove(e: MouseEvent) {
		mouseX = e.clientX;
		visible = window.innerHeight - e.clientY < 80;
	}

	onMount(() => {
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	});

	function scaleFor(btn: HTMLElement) {
		if (!btn) return 1;

		const rect = btn.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;

		const dist = Math.abs(mouseX - centerX);

		const maxDist = 120;
		const minScale = 1;
		const maxScale = 1.8;

		const t = Math.max(0, 1 - dist / maxDist);

		return minScale + t * (maxScale - minScale);
	}

	$: isVisible = forceOpen || visible;
</script>

<div class="dock-hint" class:visible={!isVisible}>
	<img src="/assets/icons/navi/arrow-right.svg" alt="Open dock" />
</div>

<button class="dock-toggle" on:click={() => (forceOpen = !forceOpen)}>
	<img src="/assets/icons/navi/arrow-right.svg" alt="Toggle dock" />
</button>

<div class="dock {isVisible ? 'visible' : ''}">
	<button
		class="item"
		bind:this={aboutBtn}
		on:click={() => onAboutClick(getPos(aboutBtn))}
		style="transform: scale({scaleFor(aboutBtn)}) translateY({scaleFor(aboutBtn) > 1 ? -6 : 0}px);"
	>
		<img src="/assets/icons/navi/home.svg" alt="About" /></button
	>
	<button
		class="item"
		bind:this={linksBtn}
		on:click={() => onLinksClick(getPos(linksBtn))}
		style="transform: scale({scaleFor(linksBtn)}) translateY({scaleFor(linksBtn) > 1 ? -6 : 0}px);"
	>
		<img src="/assets/icons/navi/link.svg" alt="About" /></button
	>
	<button
		class="item"
		bind:this={contribBtn}
		on:click={() => onContributionsClick(getPos(contribBtn))}
		style="transform: scale({scaleFor(contribBtn)}) translateY({scaleFor(contribBtn) > 1
			? -6
			: 0}px);"
	>
		<img src="/assets/icons/navi/book-open.svg" alt="About" /></button
	>
	<button
		class="item"
		bind:this={askBtn}
		on:click={() => onAskClick(getPos(askBtn))}
		style="transform: scale({scaleFor(askBtn)}) translateY({scaleFor(askBtn) > 1 ? -6 : 0}px);"
	>
		<img src="/assets/icons/navi/brush.svg" alt="About" />
	</button>
</div>

<style>
	.dock {
		position: fixed;
		z-index: 2000;
		bottom: -100px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 12px;
		padding: 12px;
		border-radius: 16px;

		background: rgba(255, 255, 255, 0.15);
		backdrop-filter: blur(10px);

		transition: bottom 0.3s ease;
	}

	.item img {
		width: 24px;
		height: 24px;
		filter: invert(1) drop-shadow(0px 3px 5px black);
		pointer-events: none;
	}

	.item {
		transform-origin: bottom center;
		transition: transform 120ms ease-out;
	}

	.dock.visible {
		bottom: 20px;
	}

	.dock-hint {
		position: fixed;
		bottom: 5px;
		left: 50%;
		transform: translateX(-50%) rotate(-90deg);
		opacity: 0;
		transition:
			opacity 0.3s ease,
			transform 0.3s ease;
		pointer-events: none;
		z-index: 2001;
	}

	.dock-hint.visible {
		opacity: 0.6;
		transform: translateX(-50%) translateY(0px) rotate(-90deg);
	}

	.dock-toggle {
		position: fixed;
		bottom: 10px;
		left: 50%;
		transform: translateX(-50%) rotate(-90deg);
		z-index: 2001;

		background: rgba(255, 255, 255, 0.15);
		backdrop-filter: blur(10px);
		border-radius: 12px;
		padding: 8px;

		border: none;
	}

	@media (min-width: 768px) {
		.dock-toggle {
			display: none;
		}
	}
</style>
