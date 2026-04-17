<script lang="ts">
	import CurrentTime from '@components/currentTime.svelte';
	import Dock from '@components/dock.svelte';

	import About from '@components/windows/about.svelte';
	import Contributions from '@components/windows/contributions.svelte';
	import Links from '@components/windows/links.svelte';
	import Ask from '@components/windows/ask.svelte';

	import ProfileFloat from '@components/floating/profileFloat.svelte';
	import LastFMFloat from '@components/floating/lastfmFloat.svelte';
	import ParticleField from '@components/floating/particleField.svelte';

	type WindowType = 'about' | 'contributions' | 'links' | 'ask' | null;

	let activeWindow: WindowType = null;
	let closingWindow: WindowType = null;

	type Vec2 = { x: number; y: number };

	let origins: Record<string, Vec2 | null> = {
		about: null,
		contributions: null,
		links: null,
		ask: null
	};

	function toggleWindow(win: WindowName, pos: Vec2) {
		origins = {
			...origins,
			[win]: pos
		};

		if (activeWindow === win) {
			closingWindow = win;
			activeWindow = null;
			return;
		}

		closingWindow = null;
		activeWindow = win;
	}

	type WindowState = 'open' | 'closing' | 'closed';
	type WindowName = 'about' | 'contributions' | 'links' | 'ask';

	function getState(win: WindowName): WindowState {
		if (activeWindow === win) return 'open';
		if (closingWindow === win) return 'closing';
		return 'closed';
	}
</script>

<main>
	<div class="scene {activeWindow ? 'blurred' : ''}">
		<div class="pageLayer">
			<CurrentTime />
		</div>

		<div class="floatingLayer">
			<ProfileFloat />
			<LastFMFloat />
			<ParticleField />
		</div>
	</div>

	<div class="fixOff {activeWindow ? 'blurred' : ''}">
		<a href="/portfolio" class="frame portfolio">
			<img src="/assets/icons/navi/briefcase.svg" alt="Portfolio" class="icon" />
			<span style="font-size: 18px; color: white;">Portfolio</span>
		</a>
	</div>

	<div class="windowLayer">
		<About state={getState('about')} origin={origins.about} />
		<Contributions state={getState('contributions')} origin={origins.contributions} />
		<Links state={getState('links')} origin={origins.links} />
		<Ask state={getState('ask')} origin={origins.ask} />
	</div>

	<Dock
		onAboutClick={(pos) => toggleWindow('about', pos)}
		onLinksClick={(pos) => toggleWindow('links', pos)}
		onContributionsClick={(pos) => toggleWindow('contributions', pos)}
		onAskClick={(pos) => toggleWindow('ask', pos)}
	/>
</main>

<style>
	.pageLayer {
		position: relative;
		z-index: 0;
		transition:
			filter 0.3s ease,
			opacity 0.3s ease;
	}

	.scene {
		position: fixed;
		inset: 0;
	}

	.scene.blurred {
		filter: blur(8px) brightness(0.6);
	}

	.windowLayer {
		position: fixed;
		inset: 0;
		z-index: 1000;
		pointer-events: auto;
	}

	.floatingLayer {
		position: fixed;
		inset: 0;
		z-index: 500;
		pointer-events: none;
		overflow: hidden;
	}

	.fixOff {
		position: fixed;
		top: 20px;
		right: 20px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		z-index: 1500;
	}

	.fixOff.blurred {
		filter: blur(8px) brightness(0.6);
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
