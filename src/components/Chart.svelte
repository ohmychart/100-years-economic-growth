<script>
	import { scaleLinear, scaleBand } from 'd3-scale';
	import { extent, sort, descending } from 'd3-array';

	import dataset from '$data/dataset.json';

	// Chart dimensions
	let width = 1200;
	$: height = width * 0.8;
	$: marginLeft = Math.max(width * 0.15, 50);
	$: marginRight = Math.max(width * 0.25, 50);
	$: marginTop = Math.max(height * 0.05, 15);
	$: marginBottom = Math.max(height * 0.05, 15);
	$: w = width - marginLeft - marginRight;
	$: h = height - marginTop - marginBottom;

	// Dataset
	const dataSorted = sort(dataset, (a, b) => descending(a.GDPPCT0, b.GDPPCT0));
	const yDomain = dataSorted.map((d) => d.Country);
	const xDomain = extent(dataset, (d) => d.GDPPCT1);
    const yDomainRight = sort(dataset, (a, b) => descending(a.GDPPCT1, b.GDPPCT1))

	// Scales
	$: xScale = scaleLinear().range([0, w]).domain(xDomain).nice();
	$: yScale = scaleBand().range([0, h]).domain(yDomain).padding(0.1);

</script>

<div class="chart-container">
	<svg class="chart" {width} {height}>
		<g transform="translate({marginLeft}, {marginTop})" class="marks">
			{#each dataSorted as data}
				{@const y = yScale(data.Country)}
				{@const gdpT0 = xScale(data.GDPPCT0)}
				<line x2={gdpT0} y1={y} y2={y} class="gdpt0" />
				<line x1={gdpT0} x2={xScale(data.GDPPCT1)} y1={y} y2={y} class="gdpt1" />
			{/each}
		</g>

		<g class="y-axis" transform="translate(0, {marginTop})">
			{#each yDomain as label}
				<text x={marginLeft} y={yScale(label)}>{label}</text>
			{/each}
		</g>
	</svg>
</div>

<style lang="postcss">
	/* .chart {
		border: 1px solid grey;
	} */

	.marks line {
		stroke: var(--color-primary);

		&.gdpt0 {
			stroke-width: 2px;
		}

		&.gdpt1 {
			stroke-width: 8px;
		}
	}

	.y-axis {
		& text {
			fill: var(--color-white);
			font-size: 0.8rem;
			text-anchor: end;
			alignment-baseline: middle;
			transform: translateX(-0.5rem);
		}
	}
</style>
