<script lang="ts">
	import Window from '../window.svelte';
	import './textStyle.css';
	export let state: 'open' | 'closing' | 'closed';
	export let origin: { x: number; y: number } | null = null;

	const birthDate = new Date(2010, 8, 29);

	function getAge() {
		const today = new Date();
		let age = today.getFullYear() - birthDate.getFullYear();

		const hasHadBirthday =
			today.getMonth() > birthDate.getMonth() ||
			(today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

		if (!hasHadBirthday) age--;
		return age;
	}
</script>

<Window {state} {origin} fixedSize>
	<blockquote>
		I'm Runa! I'm a {getAge()} year old furry who learnt coding very early on, programming games all the
		way up to actual programs! I do commissions for free sometimes, and all of my stuff is open sourced!
		Like Dave said, open source is love, open source is life.
	</blockquote>

	<p>
		I learnt coding by looking at other people's code and trying stuff until it worked, I am self
		taught :3
	</p>

	<p>
		I'm also a composer, artist, animator, and modeler! I am currently working on Project: Eclipse,
		An Ammar Creativity, Spook's Creativity, Discord Annoyer Extended, Funkstrap (sorta), RainFunk,
		and a LOT more!
	</p>

	<p>
		A bit more about me, like I said I am currently {getAge()} and a furry!! Being a furry is sorta fun?
		Idk.. Anyways! I am currently taken by my two loving partners Shadow and Kata (love you both so much
		:3), and do not plan to leave them anytime soon. There's a LOT of things I like so I'm just gonna
		list them:
	</p>

	<p class="bigText">Likes</p>

	<ul>
		<li>My partners :3</li>
		<li>Games (I mainly like horror focused games and a bit of asyms :p)</li>
		<li>Music (I don't have a music taste honestly! Although I do really like pop punk bands..)</li>
		<li>Programming! (This is obvious)</li>
		<li>And I LOVE all of my friends, they're what keep me alive and well :3</li>
	</ul>

	<p class="bigText">Dislikes/DNI List</p>

	<ul>
		<li>Toxics</li>
		<li>Homophobes</li>
		<li>Narcs</li>
		<li>Hypocrites</li>
		<li>Egotistical people</li>
		<li>Jerks</li>
		<li>PEOPLE WHO UNIRONICALLY USE ANY OF THOSE NUMBERS. YOU KNOW WHAT.</li>
		<li>People who make uncomfortable jokes about others</li>
	</ul>

	<p>
		There's a lot more stuff I could say about myself, but I think my partners can 100% let you know about me -w- <br />
		You can look at their stuff here!!
		<a href="https://shadoww38.straw.page" target="_blank" rel="noopener noreferrer">Shadow</a>
		|
		<a href="https://katamaribi0.straw.page" target="_blank" rel="noopener noreferrer">Kata</a>
	</p>

	<p class="bigText">Coding Languages I know</p>

	<ul>
		<li>Lua</li>
		<li>Haxe</li>
		<li>JavaScript</li>
		<li>TypeScript</li>
		<li>HTML</li>
		<li>CSS</li>
		<li>C++</li>
		<li>C#</li>
		<li>SvelteKit</li>
		<li>Java</li>
		<li>GoLang</li>
		<li>Curl</li>
	</ul>

	<p class="bigText">Learning</p>

	<ul>
		<li>Rust</li>
	</ul>
</Window>
