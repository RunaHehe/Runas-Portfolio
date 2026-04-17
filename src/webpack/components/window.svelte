<script lang="ts">
	import { onMount } from 'svelte';

	export let fixedSize = false;

	let isMobile = false;

	function updateIsMobile() {
		isMobile = window.innerWidth <= 768;
	}

	onMount(() => {
		updateIsMobile();
	});
</script>

<div class="window frame {fixedSize ? 'fixed' : ''} {isMobile ? 'mobile' : ''}">
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

		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);

		display: flex;
		flex-direction: column;

		width: max-content;
		max-width: 90vw;
		max-height: 90vh;

		box-sizing: border-box;
		overflow: hidden;
	}

	.window.fixed {
		width: 420px;
		max-width: 420px;
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
