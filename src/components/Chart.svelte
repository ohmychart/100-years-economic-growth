<script>
	import { scaleLinear, scaleBand } from 'd3-scale';
	import { extent, sort, descending } from 'd3-array';
	import { flip } from 'svelte/animate';
	import { fade, draw } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import sticky from '$actions/sticky';

	import dataset from '$data/dataset.json';

	export let options;

	// Chart dimensions
	let width = 1200;
	$: height = width * 0.9;
	$: marginLeft = Math.max(width * 0.15, 60);
	$: marginRight = Math.max(width * 0.15, 60);
	$: marginTop = Math.max(height * 0.01, 16);
	$: marginBottom = 0;
	$: w = width - marginLeft - marginRight;
	$: h = height - marginTop - marginBottom;
	$: xAxisHeight = Math.max(height * 0.02, 25);

	// Dataset
	$: dataSorted = sort(dataset, (a, b) => descending(a[options.sort], b[options.sort]));
	$: yDomain = dataSorted.map((d) => d.Country);
	const xDomain = extent(dataset, (d) => d.GDPPCT1);
	const yDomainRight = sort(dataset, (a, b) => descending(a.GDPPCT1, b.GDPPCT1)).map(
		(d) => d.Country
	);

	// Scales
	$: xScale = scaleLinear().range([0, w]).domain(xDomain).nice();
	$: yScale = scaleBand().range([0, h]).domain(yDomain).padding(0.1);
	$: yScaleRight = scaleBand().range([0, h]).domain(yDomainRight).padding(0.1);

	// Ticks
	$: xTicks = xScale.ticks(4).map((tick) => {
		return {
			pos: xScale(tick),
			label: `$${(tick / 1000).toFixed(0)}k`
		};
	});

	let isAxisXStuck = false;
	function handleStuck(e) {
		isAxisXStuck = e.detail.isStuck;
	}
</script>

<div class="chart-container" bind:clientWidth={width}>
	<svg
		class="chart-x-axis"
		class:isStuck={isAxisXStuck}
		{width}
		height={xAxisHeight}
		use:sticky={{ stickToTop: true }}
		on:stuck={handleStuck}
	>
		<g transform="translate({marginLeft}, {xAxisHeight * 0.8})" class="x-axis">
			{#each xTicks as tick}
				<text x={tick.pos} class="tick-label">{tick.label}</text>
				<line x1={tick.pos} x2={tick.pos} y2="5" class="tick" />
			{/each}
			<line x1={0} x2={xTicks.slice(-1)[0].pos} y1={5} y2={5} />
		</g>
	</svg>
	<svg class="chart" {width} {height}>
		<defs>
			<marker
				id="arrow"
				viewBox="0 0 10 10"
				refX="5"
				refY="5"
				markerWidth={width*0.007}
				markerHeight={width*0.007}
				orient="auto-start-reverse"
				stroke="#989898"
				stroke-width="2"
				fill="none"
			>
				<path d="M 0 0 L 10 5 L 0 10" />
			</marker>
		</defs>

		<g transform="translate({marginLeft}, {marginTop})" class="marks">
			{#each dataSorted as data (data.Country)}
				{@const y = yScale(data.Country)}
				{@const gdpT0 = xScale(data.GDPPCT0)}
				{@const gdpT1 = xScale(data.GDPPCT1)}
				{@const diffT1 = xScale(data.DiffT1)}

				{#if options.show.includes('arrows')}
					<line
						x1={gdpT1}
						x2={w}
						y1={y}
						y2={yScaleRight(data.Country)}
						class="arrow"
						marker-end="url(#arrow)"
						in:draw={{ delay: 300, duration: 400 }}
						out:fade={{ duration: 200, easing: quintOut }}
					/>
				{/if}

				{#if options.show.includes('GDPPCT0')}
					<line
						x2={gdpT0}
						y1={y}
						y2={y}
						class="gdpt0"
						in:draw={{ duration: 500 }}
						out:draw={{ duration: 200, easing: quintOut }}
					/>
				{/if}

				{#if options.show.includes('GDPPCT1')}
					<line
						x1={gdpT0}
						x2={gdpT1}
						y1={y}
						y2={y}
						class="gdpt1"
						in:draw={{ duration: 500 }}
						out:draw={{ duration: 200, easing: quintOut }}
					/>
				{/if}

				{#if options.show.includes('DiffT1')}
					<line
						x2={diffT1}
						y1={y}
						y2={y}
						class="diffT1"
						in:draw={{ duration: 500 }}
						out:draw={{ duration: 200, easing: quintOut }}
					/>
				{/if}
			{/each}
		</g>

		<g class="y-axis" transform="translate({marginLeft}, {marginTop})">
			{#each yDomain as label (label)}
				<text y={yScale(label)} animate:flip={{ duration: 1000, easing: quintOut }}>{label}</text>
			{/each}
		</g>

		{#if options.show.includes('yAxisRight')}
			<g class="y-axis right" transform="translate({marginLeft + w}, {marginTop})">
				{#each yDomainRight as label}
					<text y={yScaleRight(label)}>{label}</text>
				{/each}
			</g>
		{/if}
	</svg>
</div>

<style lang="postcss">
	svg {
		display: block;
	}

	.chart-x-axis {
		background-color: transparent;
		position: sticky;
		top: 0;
		transition: background-color 0.2s ease-out;

		&.isStuck {
			background-image: linear-gradient(
				160deg,
				hsl(0deg 0% 13%) 0%,
				hsl(344deg 0% 10%) 17%,
				hsl(344deg 0% 7%) 58%,
				hsl(0deg 0% 0%) 100%
			);
		}
	}

	.marks line {
		stroke: var(--color-primary);

		&.gdpt0 {
			stroke-width: 0.2vw;
		}

		&.gdpt1,
		&.diffT1 {
			stroke-width: 0.8vw;
		}

		&.arrow {
			stroke: var(--color-grey);
			stroke-opacity: 0.4;
			stroke-width: 1px;
			/* stroke-dasharray: 2px; */
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

	.x-axis {
		& text {
			fill: var(--color-grey);
			font-size: 0.65rem;
			text-anchor: middle;
			transform: translateY(-0.25rem);
		}

		& line {
			stroke: var(--color-grey);
			stroke-width: 1px;
		}
	}
</style>
