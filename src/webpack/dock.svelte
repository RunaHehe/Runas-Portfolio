<script>
	export let onAboutClick;
	export let onLinksClick;
	export let onContributionsClick;
	export let onAskClick;

	let visible = false;

	function handleMouseMove(e) {
		visible = window.innerHeight - e.clientY < 80;
	}

	window.addEventListener('mousemove', handleMouseMove);
</script>

<div class="dock {visible ? 'visible' : ''}">
	<button class="item" on:click={onAboutClick}>📖</button>
	<button class="item" on:click={onLinksClick}>🔗</button>
	<button class="item" on:click={onContributionsClick}>📊</button>
	<button class="item" on:click={onAskClick}>❓</button>
</div>

<style>
	.dock {
		position: fixed;
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

	.dock.visible {
		bottom: 20px;
	}
</style>
