<script lang="ts">
	import { onMount } from 'svelte';
	import LastFM from '@components/lastfm.svelte';

	let x = 300;
	let y = 200;

	let vx = 0;
	let vy = 0;

	let rot = 0;
	let rotSpeed = 0;

	let card: HTMLDivElement;

	let w = 0;
	let h = 0;

	onMount(() => {
		vx = (Math.random() - 0.5) * 1.2;
		vy = (Math.random() - 0.5) * 1.2;

		rotSpeed = (Math.random() - 0.5) * 1.5;

		const tick = () => {
			if (card) {
				w = card.offsetWidth;
				h = card.offsetHeight;
			}

			x += vx;
			y += vy;

			rot += rotSpeed;

			const maxX = window.innerWidth - w;
			const maxY = window.innerHeight - h;

			if (x < 0 || x > maxX) vx *= -1;
			if (y < 0 || y > maxY) vy *= -1;

			requestAnimationFrame(tick);
		};

		tick();
	});
</script>

<div bind:this={card} class="card" style="transform: translate({x}px, {y}px) rotate({rot}deg);">
	<LastFM />
</div>

<style>
	.card {
		position: absolute;
		padding: 10px 14px;
		border-radius: 12px;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		color: white;
		pointer-events: none;
	}
</style>
