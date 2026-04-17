<script lang="ts">
	import Navi from '@components/navi.svelte';
	import LastFM from '@components/lastfm.svelte';
	import CurrentTime from '@components/currentTime.svelte';
	import Dock from '@components/dock.svelte';

	import About from '@components/windows/about.svelte';
	import Contributions from '@components/windows/contributions.svelte';
	import Links from '@components/windows/links.svelte';
	import Ask from '@components/windows/ask.svelte';
	let showAbout = false;
	let showContributions = false;
	let showLinks = false;
	let showAsk = false;

	$: anyWindowOpen = showAbout || showContributions || showLinks || showAsk;
</script>

<main>
	<div class="page {anyWindowOpen ? 'blurred' : ''}">
		<img class="me" src="assets/misc/Runa.png" width="150" height="150" alt="HIIIII" />
		<span class="bigText meText" style="text-shadow: 0px 5px 5px black;"
			>Hiya! I'm <b>Runa</b>!</span
		>
		<CurrentTime />

		<div class="fixOff">
			<Dock
				onAboutClick={() => (showAbout = true)}
				onLinksClick={() => (showLinks = true)}
				onContributionsClick={() => (showContributions = true)}
				onAskClick={() => (showAsk = true)}
			/>

			<a href="/portfolio" class="frame portfolio">
				<img src="/assets/icons/navi/briefcase.svg" alt="Portfolio" class="icon" />
				<span style="font-size: 18px; color: white;">Portfolio</span>
			</a>
		</div>
	</div>

	<div class="bottom">
		<LastFM />
	</div>

	{#if showAbout}
		<About onClose={() => (showAbout = false)} />
	{/if}
	{#if showContributions}
		<Contributions onClose={() => (showContributions = false)} />
	{/if}
	{#if showLinks}
		<Links onClose={() => (showLinks = false)} />
	{/if}
	{#if showAsk}
		<Ask onClose={() => (showAsk = false)} />
	{/if}
</main>

<style>
	.page {
		transition:
			filter 0.3s ease,
			opacity 0.3s ease;
	}

	.page.blurred {
		filter: blur(8px);
		opacity: 0.6;
	}

	.bigText {
		font-size: 35px;
		/* font-weight: bold; */
	}

	.fixOff {
		margin-right: 15px;

		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.bottom {
		position: absolute;
		bottom: 0px;
		left: 50%;
		transform: translateX(-50%);

		display: flex;
		justify-content: center;
		gap: 5px;
	}

	.me {
		transform: rotate(0deg) scale(1);
		transition: transform 150ms ease-out;
		border-radius: 50%;
		border: 3px solid white;
	}
	.me:hover {
		transform: rotate(5deg) scale(1.1);
	}

	.meText {
		text-align: center;
		white-space: nowrap;
	}

	.icon {
		filter: invert(1) drop-shadow(0px 5px 5px black);
	}

	.portfolio {
		margin-top: 10px;

		display: flex;
		justify-content: center;
		justify-items: center;
		gap: 5px;

		transition: transform 150ms ease-out;
	}
	.portfolio:hover {
		transform: scale(1.1);
	}

	/*@media screen and (max-width: 768px) {
		main {

		}
	}*/
</style>
