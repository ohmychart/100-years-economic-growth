<script>
	import { base } from '$app/paths';
	import '../app.postcss';
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>100 Years of Economic Growth — Oh My Chart!</title>
	<meta
		name="description"
		content="Visualization of GDP Per Capita change by country from 1909 to 2018"
	/>

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="author" content="ohmychart.com" />
	<link rel="apple-touch-icon" sizes="180x180" href="{base}/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="{base}/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="{base}/favicon-16x16.png" />
	<link rel="manifest" href="{base}/site.webmanifest" />
</svelte:head>

<slot />
