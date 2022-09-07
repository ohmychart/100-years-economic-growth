<script>
	import { base } from '$app/paths';
	import '../app.postcss';
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Economic Growth in 20th Century</title>
	<meta
		name="description"
		content="Visualization of the world's oil and gas reserves in terms of vulnerability expressed through the Fragile State Index levels."
	/>

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="author" content="ohmychart.com" />
	<link rel="apple-touch-icon" sizes="180x180" href="{base}/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="{base}/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="{base}/favicon-16x16.png" />
	<link rel="manifest" href="{base}/site.webmanifest" />
</svelte:head>

<slot />

<style lang="postcss">
	:global(:root) {
		--color-white: #fafafa;
		--color-black: #212121;
		--color-primary: #00c6cf;

		font-size: calc(0.5em + 1vw);
		box-sizing: border-box;
	}

	:global(*, ::before, ::after) {
		box-sizing: inherit;
		margin: 0;
		padding: 0;
	}

	:global(body) {
		color: var(--color-white);
		background-image: linear-gradient(
			160deg,
			hsl(0deg 0% 13%) 0%,
			hsl(344deg 0% 10%) 17%,
			hsl(344deg 0% 7%) 58%,
			hsl(0deg 0% 0%) 100%
		);
		background-size: cover;
		background-position: top;
		min-height: 100vh;
	}
</style>
