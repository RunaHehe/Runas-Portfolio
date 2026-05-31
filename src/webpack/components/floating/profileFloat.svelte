<script lang="ts">
	import { onMount } from 'svelte';
	import Page from '../../../routes/+page.svelte';

	let x = 100;
	let y = 100;

	let vx = 0;
	let vy = 0;

	let rot = 0;
	let rotSpeed = 0;

	let dragging = false;
	let lastMouseX = 0;
	let lastMouseY = 0;


	let el: HTMLElement;
	let lastTime = 0;

	onMount(() => {
		vx = (Math.random() - 0.5) * 1.5;
		vy = (Math.random() - 0.5) * 1.5;

		rotSpeed = (Math.random() - 0.5) * 2;

		const tick = () => {
			const friction = 0.985;
			const spinFriction = 0.98;

			if (!dragging) {
				x += vx;
				y += vy;

				rot += rotSpeed;

				rotSpeed += vx * 0.01;

				// make sure there's always decay so it sorta like, feels "alive"? idk

				vx *= friction;
				vy *= friction;
				rotSpeed *= spinFriction;
			}

			const maxX = window.innerWidth - 120;
			const maxY = window.innerHeight - 120;

			if (x < 0) {
				x = 0;
				vx *= -0.6;
			}

			if (x > maxX) {
				x = maxX;
				vx *= -0.6;
			}

			if (y < 0) {
				y = 0;
				vy *= -0.6;
			}

			if (y > maxY) {
				y = maxY;
				vy *= -0.6;
			}

			requestAnimationFrame(tick);
		};

		tick();
	});

	function onPointerDown(e: PointerEvent) {
		dragging = true;
		lastMouseX = e.clientX;
		lastMouseY = e.clientY;

		el.setPointerCapture(e.pointerId);

		window.addEventListener('pointermove', onPointerMove);
		window.addEventListener('pointerup', onPointerUp);
	}

	function onPointerMove(e: PointerEvent) {
		if (!dragging) return;


		const dx = e.clientX - lastMouseX;
		const dy = e.clientY - lastMouseY;

		x += dx;
		y += dy;

		vx = vx * 0.6 + dx * 0.4;
		vy = vy * 0.6 + dy * 0.4;

		rotSpeed = dx * 0.015;

		lastMouseX = e.clientX;
		lastMouseY = e.clientY;

	}

	function onPointerUp(e: PointerEvent) {
		dragging = false;

		el.releasePointerCapture(e.pointerId);

		window.removeEventListener('pointermove', onPointerMove);
		window.removeEventListener('pointerup', onPointerUp);
	}
</script>

<div bind:this={el} class="float" role="button" on:pointerdown={onPointerDown} tabindex="0" style="transform: translate({x}px, {y}px) rotate({rot}deg);">
	<img src="assets/misc/Runa.png" alt="mraowww..." />
</div>

<style>
	.float {
		position: absolute;
		width: 120px;
		height: 120px;
		transition: transform 0.05s linear;
		filter: drop-shadow(0px 10px 10px black);
		pointer-events: auto;
	}

	img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 2px solid white;
	}
</style>
