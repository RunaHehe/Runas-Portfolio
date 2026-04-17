<script lang="ts">
	import Window from '../window.svelte';
	import './textStyle.css';

	const links = [
		{
			name: 'Github',
			url: 'https://github.com/runahehe',
			description: 'This is where I post all of my code, check out some of my work!!'
		},
		{
			name: 'Discord',
			url: 'https://discord.gg/sm6eqAcNh9',
			description: "This is my discord server! I'm here everyday, free to talk :3"
		},
		{
			name: 'Twitter',
			url: 'https://twitter.com/runaheheowo',
			description: 'This is where I rant about random things.'
		},
		{
			name: 'Bluesky',
			url: 'https://bsky.app/profile/runaspooki.bsky.social',
			description: 'Wait I have a bluesky?'
		},
		{
			name: 'Youtube',
			url: 'https://youtube.com/@spookupt',
			description: 'This is my youtube! Upload schedule a bit fucked, but I upload when I can!'
		},
		{
			name: 'LastFM',
			url: 'https://www.last.fm/user/spookupt',
			description: "LastFM is where I keep track of my music. It's pretty cool!"
		}
	];
</script>

<Window }>
	{#each links as link (link.url)}
		<a href={link.url} target="_blank" rel="noopener noreferrer" class="socialMainContainer">
			<div class="frame item">
				<div class="socialContainer">
					<div class="socialItem">
						<img src="assets/icons/social/{link.name}.svg" alt={link.name} class="icon" />
					</div>

					<div class="socialItem">
						<span style="font-weight: bold; font-size: 25px;">{link.name}</span> <br />
						<span>{link.description}</span>
					</div>
				</div>
			</div>
		</a>
	{/each}
</Window>

<style>
	.socialContainer {
		display: flex;
		gap: 10px;
	}

	a {
		color: white;
		text-decoration: none;
	}

	.icon {
		filter: invert(1) drop-shadow(0px 5px 5px black);
		width: 50px;
		height: 50px;
	}

	.frame {
		margin-top: 10px;
	}
</style>
