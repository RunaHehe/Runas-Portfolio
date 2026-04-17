<script lang="ts">
	import Window from '../window.svelte';
	import './textStyle.css';

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

<Window fixedSize>
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
		I'm also a composer, artist, animator, and modeler! I am currently working on Liminity,
		SendYourFiles, An Ammar Creativity, Discord Annoyer Extended, Spook's Creativity, and a lot
		more.
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
