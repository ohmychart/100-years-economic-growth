<script>
	import { onMount } from 'svelte';

	import Header from '$components/Header.svelte';
	import Controls from '$components/Controls.svelte';
	import Chart from '$components/Chart.svelte';
	import Footer from '$components/Footer.svelte';

	let activeIdx = 0;
	const buttons = ['Full', 'GDPPC 1909', 'GDPPC 2018', 'Change'];
	const tabs = [
		{
			show: ['GDPPCT0', 'GDPPCT1', 'yAxisRight', 'arrows'],
			sort: 'GDPPCT0',
			title: 'GDP Per Capita in 1909 (ordered by) and in 2018'
		},
		{ show: ['GDPPCT0'], sort: 'GDPPCT0', title: 'GDP Per Capita in 1909' },
		{ show: ['GDPPCT0', 'GDPPCT1'], sort: 'GDPPCT1', title: 'GDP Per Capita in 2018' },
		{ show: ['DiffT1'], sort: 'DiffT1', title: 'GDP Per Capita Change, 1909 - 2018' }
	];

	let isLoaded = false;
	onMount(() => {
		isLoaded = true;
	});
</script>

{#if !isLoaded}
	<div class="preloader">Loading...</div>
{/if}

<div class="header">
	<Header />
</div>

<div class="viz">
	<div class="controls">
		<Controls bind:activeIdx {buttons} />
	</div>
	<div class="title">
		{tabs[activeIdx].title}
	</div>
	<div class="chart">
		<Chart options={tabs[activeIdx]} />
	</div>
</div>

<div class="footer">
	<Footer />
</div>

<style lang="postcss">
	.preloader {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: var(--color-black);
		z-index: 999;

		text-align: center;
		padding-top: 50vh;
		font-size: 0.8rem;
	}

	.header {
		margin-bottom: 3em;
	}

	.controls,
	.title {
		max-width: var(--content-width);
		margin: 0 auto 1.5em auto;
		padding: 0 var(--content-side-padding);
	}

	.chart {
		padding: 0 var(--content-side-padding);
	}

	.viz {
		margin-bottom: 3em;
	}

	.title {
		margin-bottom: 1.5em;
		font-size: 0.8rem;
		color: var(--color-grey);
		text-align: center;
	}
</style>
