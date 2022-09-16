<script>
	import Header from '$components/Header.svelte';
	import Controls from '$components/Controls.svelte';
	import Chart from '$components/Chart.svelte';

	let activeIdx = 0;
	const buttons = ['All', 'GDPPC 1909', 'GDPPC 2018', 'Change'];
	const tabs = [
		{ show: ['GDPPCT0', 'GDPPCT1', 'yAxisRight', 'arrows'], sort: 'GDPPCT0', title: 'All' },
		{ show: ['GDPPCT0'], sort: 'GDPPCT0', title: 'GDP Per Capita in 1909' },
		{ show: ['GDPPCT0', 'GDPPCT1'], sort: 'GDPPCT1', title: 'GDP Per Capita in 2018' },
		{ show: ['DiffT1'], sort: 'DiffT1', title: 'GDP Per Capita Change, 1909 - 2018' }
	];
</script>


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

<style lang="postcss">

    .header {
        margin-bottom: 3em;
    }

    .controls, .title {
        max-width: var(--content-width);
        margin: 0 auto 1.5em auto;
        padding: 0 1.5em;
    }

    .chart {
        padding: 0 1.5em;
    }

    .title {
        margin-bottom: 1.5em;
        font-size: 0.8rem;
        color: var(--color-grey);
        text-align: center;
    }
</style>