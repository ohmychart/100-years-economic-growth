<script>
	import { Layer } from 'svelte-canvas';

	export let offX;
	export let offY;
	export let blur;
	export let color;

	$: render = ({context}) => {
		context.shadowColor = color;
		context.shadowOffsetX = offX;
		context.shadowOffsetY = offY;
		context.shadowBlur = blur;
	}
</script>

<Layer {render} />