<script lang="ts">
	import Window from '../window.svelte';
    import './textStyle.css'

	export let onClose: () => void = () => {};
</script>

<Window title="About Me" {onClose}>
    <blockquote>
        I'm Runa! I'm a 15 year old furry who learnt coding very early on, programming games all the way up to actual programs! I do commissions for free sometimes, and all of my stuff is open sourced! Like Dave said, open source is love, open source is life.
    </blockquote>

    <p> I learnt coding by looking at other people's code and trying stuff until it worked, I am self taught :3 </p>

    <p> I'm also a composer, artist, animator, and modeler! I am currently working on Liminity, SendYourFiles, An Ammar Creativity, Discord Annoyer Extended, Spook's Creativity, and a lot more. (P.S, thanks Dave for letting me use your website source code :p)</p>

    <details>
		<summary class="bigText" style="cursor: pointer; font-weight: bold;">Coding Languages I know</summary>
		<ul>
			<span class="bigText" style="font-weight: bold;">Learnt:</span>
			<li>Lua</li>
			<li>Haxe</li>
			<li>JavaScript</li>
			<li>TypeScript</li>
			<li>Python</li>
			<li>HTML</li>
			<li>CSS</li>
			<li>C++</li>
			<li>C+</li>
			<li>C#</li>
			<li>C++</li>
			<li>Java</li>
			<li>GoLang</li>
			<li>Brainfuck (yes, i'm serious)</li>
			<li>AutoHotkey</li>
			<li>CoffeeScript</li>
			<li>Curl</li>
			<li>R++</li>
			<li>Neko</li>
			<li>UNITY</li>
			<li>UnrealScript</li>
		</ul>
		
		<ul>
			<span class="bigText" style="font-weight: bold;">Learning:</span>
			<li>Rust</li>
		</ul>
	</details>
</Window>