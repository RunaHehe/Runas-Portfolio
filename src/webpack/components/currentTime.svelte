<script lang="ts">
	import { onMount } from 'svelte';

	export let blueColor = '#4dabf7';
	export let yellowColor = '#ffd43b';
	export let greenColor = '#69db7c';
	export let defaultColor = '#ffffff';

	let timeText = '';
	let currentColor = defaultColor;

	let isOwner = false;
	let yellowOverride = false;

	const tz = 'America/Los_Angeles';

	const displayFormatter = new Intl.DateTimeFormat('en-US', {
		timeZone: tz,
		hour: 'numeric',
		minute: '2-digit',
		second: '2-digit',
		hour12: false
	});

	const compareFormatter = new Intl.DateTimeFormat('en-GB', {
		timeZone: tz,
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	});

	function toMinutes(hhmm: string) {
		const [h, m] = hhmm.split(':').map(Number);
		return h * 60 + m;
	}

	function tick() {
		const now = new Date();
		timeText = displayFormatter.format(now);

		const hhmm = compareFormatter.format(now);
		const total = toMinutes(hhmm);

		const t0230 = toMinutes('02:30');
		const t1000 = toMinutes('10:00');

		const isBlue = total >= t0230 && total < t1000;

		if (yellowOverride) {
			currentColor = yellowColor;
		} else if (isBlue) {
			currentColor = blueColor;
		} else {
			currentColor = greenColor;
		}
	}

	function toggleYellow() {
		yellowOverride = !yellowOverride;
	}

	onMount(() => {
		let interval: ReturnType<typeof setInterval>;

		(async () => {
			try {
				const res = await fetch('/isOwner');
				const data = await res.json();
				isOwner = data.isOwner;
			} catch {
				isOwner = false;
			}

			tick();
			interval = setInterval(tick, 1000);
		})();

		return () => clearInterval(interval);
	});
</script>

<span class="clock">
	Local Time:
	<div class="timeTooltip">
		<b style={`color: ${currentColor};`}>{timeText}</b>

		{#if isOwner}
			<button on:click={toggleYellow} class="yellowToggle">
				{yellowOverride ? 'Disable Yellow' : 'Enable Yellow'}
			</button>
		{/if}

		<section class="tooltipText frame">
			<div>
				<span style="color: green; font-size: 20px;">Green</span><br />
				• I'm available to talk! You can talk to me freely whenever it's green :)<br />
				• I might be afk, not responding or busy. But I'll try to respond!
			</div>

			<div style="margin-top: 10px;">
				<span style="color: yellow; font-size: 20px;">Yellow</span><br />
				• I'm either at work, busy, or doing something important.
			</div>

			<div style="margin-top: 10px;">
				<span style="color: blue; font-size: 20px;">Blue</span><br />
				• Sleeping!!!
			</div>

			<div style="margin-top: 10px;">
				<span style="color: white; font-size: 20px;">White</span><br />
				• Probably doing something else.
			</div>

			<div style="margin-top: 10px; font-size: 20px;">
				<b>GMT-8 (America/Los_Angeles)</b>
			</div>
		</section>
	</div>
</span>

<style>
	.clock {
		transition: color 200ms ease-in-out;
	}

	.timeTooltip {
		position: relative;
		display: inline-block;
	}

	.tooltipText {
		position: absolute;
		top: calc(100% + 10px);
		left: 100%;
		transform: translateX(-50%) translateY(-5px);

		opacity: 0;
		pointer-events: none;

		transition:
			opacity 120ms ease-in-out,
			transform 120ms ease-in-out;

		z-index: 9999;

		color: #fff;
		padding: 10px;
		border-radius: 10px;

		font-size: 0.75rem;
		max-width: 280px;

		backdrop-filter: blur(10px);
	}

	.timeTooltip:hover .tooltipText {
		opacity: 1;
		transform: translateX(-50%) translateY(0);
		pointer-events: auto;
	}

	.yellowToggle {
		margin-left: 10px;
		font-size: 12px;
		padding: 2px 6px;
		cursor: pointer;
	}

	@media (max-width: 768px) {
		.tooltipText {
			position: fixed;
			transform: translateX(-50%) translateY(100%);
		}
	}
</style>
