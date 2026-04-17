<script lang="ts">
	import { onMount } from 'svelte';

	let x = 100;
	let y = 100;

	let vx = 0;
	let vy = 0;

	let rot = 0;
	let rotSpeed = 0;

	onMount(() => {
		vx = (Math.random() - 0.5) * 1.5;
		vy = (Math.random() - 0.5) * 1.5;

		rotSpeed = (Math.random() - 0.5) * 2;

		const tick = () => {
			x += vx;
			y += vy;

			rot += rotSpeed;

			const maxX = window.innerWidth - 120;
			const maxY = window.innerHeight - 120;

			if (x < 0 || x > maxX) vx *= -1;
			if (y < 0 || y > maxY) vy *= -1;

			requestAnimationFrame(tick);
		};

		tick();
	});
</script>

<div class="float" style="transform: translate({x}px, {y}px) rotate({rot}deg);">
	<img src="assets/misc/Runa.png" alt="mraowww..." />
</div>

<style>
	.float {
		position: absolute;
		width: 120px;
		height: 120px;
		transition: transform 0.05s linear;
		filter: drop-shadow(0px 10px 10px black);
	}

	img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 2px solid white;
	}
</style>
