<script lang="ts">
	import Navi from '@components/navi.svelte';
	import LastFM from '@components/lastfm.svelte';
	import CurrentTime from '@components/currentTime.svelte';

	import About from '@components/windows/about.svelte';
	import Contributions from '@components/windows/contributions.svelte';
	import Links from '@components/windows/links.svelte';
	let showAbout = false;
	let showContributions = false;
	let showLinks = false;
</script>

<main>
	<div class="mainContent xyCenter">
		<img class="me" src="assets/misc/Runa.png" width="150" height="150" alt="HIIIII" style="border-radius: 50%;"/>
		<span class="bigText meText" style="text-shadow: 0px 5px 5px black;">Hiya! I'm <b>Runa</b>!</span>
		<CurrentTime/>

		<div class="fixOff">
			<Navi
				onAboutClick={() => (showAbout = true)}
				onLinksClick={() => (showLinks = true)}
				onContributionsClick={() => (showContributions = true)}
			/>
			<LastFM/>
		</div>
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
</main>

<style>
	.mainContent {
		display: flex;
		flex-direction: column;
		align-items: center;
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

	.me {
		transform: rotate(0deg) scale(1);
		transition: transform 150ms ease-out;
	} .me:hover {
		transform: rotate(5deg) scale(1.1);
	}

	.meText {
		text-align: center;
		white-space: nowrap;
	}
</style>
