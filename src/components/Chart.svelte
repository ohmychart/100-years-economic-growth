<script>
	import { scaleLinear, scaleBand } from 'd3-scale';
	import { extent, sort, descending } from 'd3-array';

	import dataset from '$data/dataset.json';

	// Chart dimensions
	let width = 1200;
	$: height = width * 0.9;
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
	const yDomainRight = sort(dataset, (a, b) => descending(a.GDPPCT1, b.GDPPCT1)).map(
		(d) => d.Country
	);

	// Scales
	$: xScale = scaleLinear().range([0, w]).domain(xDomain).nice();
	$: yScale = scaleBand().range([0, h]).domain(yDomain).padding(0.1);
	$: yScaleRight = scaleBand().range([0, h]).domain(yDomainRight).padding(0.1);
</script>

<div class="chart-container" bind:clientWidth={width}>
	<svg class="chart" {width} {height}>
		<defs>
			<marker
				id="arrow"
				viewBox="0 0 10 10"
				refX="5"
				refY="5"
				markerWidth="6"
				markerHeight="6"
				orient="auto-start-reverse"
				stroke="#989898"
				stroke-width=2
			>
				<path d="M 0 0 L 10 5 L 0 10" />
			</marker>
		</defs>
		<g transform="translate({marginLeft}, {marginTop})" class="marks">
			{#each dataSorted as data}
				{@const y = yScale(data.Country)}
				{@const gdpT0 = xScale(data.GDPPCT0)}
				{@const gdpT1 = xScale(data.GDPPCT1)}
				<line
					x1={gdpT1}
					x2={w}
					y1={y}
					y2={yScaleRight(data.Country)}
					class="arrow"
					marker-end="url(#arrow)"
				/>
				<line x2={gdpT0} y1={y} y2={y} class="gdpt0" />
				<line x1={gdpT0} x2={gdpT1} y1={y} y2={y} class="gdpt1" />
			{/each}
		</g>

		<g class="y-axis" transform="translate({marginLeft}, {marginTop})">
			{#each yDomain as label}
				<text y={yScale(label)}>{label}</text>
			{/each}
		</g>

		<g class="y-axis right" transform="translate({marginLeft + w}, {marginTop})">
			{#each yDomainRight as label}
				<text y={yScaleRight(label)}>{label}</text>
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
		transition: all 0.3s ease;

		&.gdpt0 {
			stroke-width: 0.2vw;
		}

		&.gdpt1 {
			stroke-width: 0.8vw;
		}

		&.arrow {
			stroke: var(--color-grey);
			stroke-width: 1px;
			stroke-dasharray: 2px;
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

		&.right text {
			text-anchor: start;
			fill: var(--color-grey);
			transform: translateX(0.5rem);
		}
	}
</style>
