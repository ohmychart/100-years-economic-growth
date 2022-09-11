<header>
	<div class="top-bar">= OHMYCHART!COM</div>
	<div class="content">
		<p class="subheader">Visualizing change in GDP per capita since 1909</p>
		<h1 class="header">Economic growth: XX century</h1>
		<p class="intro">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rhoncus orci sed gravida
			ultrices. Phasellus rutrum est at lectus pharetra, at posuere tellus rhoncus. Nulla mattis est
			id arcu tincidunt, quis scelerisque nisi imperdiet.
		</p>
	</div>
</header>

<style lang="postcss">
	header {
		border-left: none;
		border-right: none;
		border-top: none;
		border-bottom: 2px solid;
		border-image: linear-gradient(to right, rgba(0, 0, 0, 0), var(--color-primary)) 1;
	}

	.top-bar {
		background-color: var(--color-white);
		color: var(--color-black);
		font-size: 0.6rem;
		font-weight: 600;
		line-height: 1em;
		padding: 0.3em 0.8em;
	}

	.content {
		max-width: var(--content-width);
		margin: 3rem auto;
        padding: 0 0.5em;
	}

	h1.header {
		text-transform: uppercase;
		color: var(--color-primary);
		transition: transform 10s ease;
		filter: drop-shadow(4px 2px 0 #000);
	}

	p.subheader {
		text-transform: uppercase;
		font-size: 1.2rem;
		font-weight: 500;
		margin-bottom: 0;
	}
</style>
