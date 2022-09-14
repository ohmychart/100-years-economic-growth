<script>
	import Header from '$components/Header.svelte';
	import Controls from '$components/Controls.svelte';
	import Chart from '$components/Chart.svelte';

    let activeIdx = 0;
	const buttons = ['All', 'GDPPC 1909', 'GDPPC 2018', 'Change'];
    const tabs = [
        {show: ['GDPPCT0', 'GDPPCT1', 'yAxisRight', 'arrows'], sort: 'GDPPCT0'},
        {show: ['GDPPCT0'], sort: 'GDPPCT0'},
        {show: ['GDPPCT0', 'GDPPCT1'], sort: 'GDPPCT1'},
        {show: ['Diff'], sort: 'Diff'}
    ]
	
</script>

<Header />
{activeIdx}
<Controls bind:activeIdx {buttons}/>
<Chart options={tabs[activeIdx]}/>