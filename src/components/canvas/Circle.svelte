<script>
	import { Layer } from 'svelte-canvas';

	export let cx;
	export let cy;
	export let r;
	export let fill;

	$: render = ({ context }) => {
		context.beginPath();
		context.fillStyle = fill;
		context.arc(cx, cy, r, 0, 2 * Math.PI, true);
		context.fill();
	};
</script>

<Layer {render} />
