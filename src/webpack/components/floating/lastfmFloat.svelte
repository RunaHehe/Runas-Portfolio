<script lang="ts">
	import { onMount } from 'svelte';
	import LastFM from '@components/lastfm.svelte';

	let x = 300;
	let y = 200;

	let vx = 0;
	let vy = 0;

	let rot = 0;
	let rotSpeed = 0;

	onMount(() => {
		vx = (Math.random() - 0.5) * 1.2;
		vy = (Math.random() - 0.5) * 1.2;

		rotSpeed = (Math.random() - 0.5) * 1.5;

		const tick = () => {
			x += vx;
			y += vy;

			rot += rotSpeed;

			if (x < 0 || x > window.innerWidth - 200) vx *= -1;
			if (y < 0 || y > window.innerHeight - 60) vy *= -1;

			requestAnimationFrame(tick);
		};

		tick();
	});
</script>

<div class="card" style="transform: translate({x}px, {y}px) rotate({rot}deg);">
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
