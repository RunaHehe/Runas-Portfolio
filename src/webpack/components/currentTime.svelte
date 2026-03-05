<script lang="ts">
	import { onMount } from 'svelte';

	export let blueColor = '#4dabf7';
	export let yellowColor = '#ffd43b';
	export let greenColor = '#69db7c';
	export let defaultColor = '#ffffff';

	let timeText = '';
	let currentColor = defaultColor;

	const tz = 'America/Los_Angeles'; // GMT-8
	const displayFormatter = new Intl.DateTimeFormat('en-US', {
		timeZone: tz,
		hour: 'numeric',
		minute: '2-digit',
		second: '2-digit',
		hour12: true
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

		const t0200 = toMinutes('02:00');
		const t0600 = toMinutes('06:00');
		const t1630 = toMinutes('16:30');

		if (total >= t0200 || total < t0600) {
			currentColor = blueColor;
		} else if (total >= t0600 && total < t1630) {
			currentColor = yellowColor;
		} else if (total >= t1630 && total < t0200) {
			currentColor = greenColor;
		} else {
			currentColor = defaultColor;
		}
	}

	onMount(() => {
		tick();
		const interval = setInterval(tick, 1000);
		return () => clearInterval(interval);
	});
</script>

<span class="clock">
	Local Time:
	<span class="timeTooltip">
		<b style={`color: ${currentColor};`}>{timeText}</b>

		<section class="tooltipText frame">
    		<div>
				<span style="color: green; font-size: 20px;">Green</span> <br/>
				• I'm available to talk! You can talk to me freely whenever it's green :) <br/>
				• I might be afk, not responding or busy. But, I'll try to respond!
			</div>

    		<div style="margin-top: 10px;">
				<span style="color: yellow; font-size: 20px;">Yellow</span> <br/>
				• I'm either at work, busy, or just doing something important.
			</div>

    		<div style="margin-top: 10px;">
				<span style="color: blue; font-size: 20px;">Blue</span> <br/>
				• Sleeping!!!
			</div>

    		<div style="margin-top: 10px;">
				<span style="color: white; font-size: 20px;">White</span> <br/>
    			• Probably doing something else. <br/>
			</div>

			<div style="margin-top: 10px; font-size: 20px;">
				<b>GMT-8 (America/Los_Angeles)</b>
			</div>
		</section>
	</span>
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
		bottom: 130%;
		left: 50%;
		transform: translateX(-50%);
		opacity: 0;
		pointer-events: none;
		transition: opacity 120ms ease-in-out;
		color: #fff;
		padding: 4px 8px;
		border-radius: 6px;
		font-size: 0.75rem;
		white-space: nowrap;
		z-index: 1200;
	}

	.timeTooltip:hover .tooltipText {
		opacity: 1;
	}

	@media (max-width: 768px) {
		.tooltipText {
			position: fixed;
			transform:
				translateX(-50%)
				translateY(100%);
		}
	}
</style>
