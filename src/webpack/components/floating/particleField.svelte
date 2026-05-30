<script lang="ts">
	import { onMount } from 'svelte';

	type P = {
		id: number;
		x: number;
		y: number;
		vx: number;
		vy: number;
		size: number;
	};

	let particles: P[] = [];

	const COUNT = 150;

	onMount(() => {
		particles = Array.from({ length: COUNT }, (_, i) => ({
			id: i,
			x: Math.random() * window.innerWidth,
			y: Math.random() * window.innerHeight,
			vx: (Math.random() - 0.5) * 0.3,
			vy: (Math.random() - 0.5) * 0.3,
			size: 3 + Math.random() * 5
		}));

		const tick = () => {
			for (const p of particles) {
				p.x += p.vx;
				p.y += p.vy;

				if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
				if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;
			}

			particles = particles;
			requestAnimationFrame(tick);
		};

		tick();
	});
</script>

{#each particles as p (p.id)}
	<div
		class="particle"
		style="width: {p.size}px; height: {p.size}px; transform: translate({p.x}px, {p.y}px);"
	></div>
{/each}

<style>
	.particle {
		position: absolute;
		width: 3px;
		height: 3px;
		background: white;
		border-radius: 50%;
		opacity: 0.6;
	}
</style>
