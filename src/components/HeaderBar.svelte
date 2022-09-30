<script>
	import { Canvas } from 'svelte-canvas';

	import Circle from '$components/canvas/Circle.svelte';
	import Filter from '$components/canvas/Filter.svelte';

	export let width;
	export let height;
	export let fillRGB;

	function normalize(x, minx, maxx) {
		return (x - minx) / (maxx - minx);
	}

	let gw,
		r,
		gap,
		nx,
		ny;
	let grid = [];

	$: if (width) {
		console.log('if width', width);
		gw = width * 0.007;
		r = gw * 0.5;
		gap = gw * 0.04;
		nx = Math.ceil(width / gw);
		ny = Math.ceil(height / gw);

		grid = [];
		for (let i = 0; i <= ny; i++) {
			console.log('i');
			for (let j = 0; j <= nx; j++) {
				grid.push({
					cx: j * gw,
					cy: i * gw,
					r: r - gap * i,
					fill: `rgba(${fillRGB[0]}, ${fillRGB[1]}, ${fillRGB[2]}, ${normalize(ny - i + 1, 1, ny)})`
				});
			}
		}
	}
</script>

<Canvas {width} {height}>
	<!-- <Filter offX={2} offY={3} blur={0} color="#00c6cf" /> -->
	{#each grid as { cx, cy, r, fill }}
		<Circle {cx} {cy} {r} {fill} />
	{/each}
</Canvas>
