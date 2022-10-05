<script>
	import { slide, fade } from 'svelte/transition';
	import howToRead from '$svg/how-to-read.svg';
	let show = false;
</script>

<aside class="how-to-read">
	<div class="title">
		<span on:click={() => (show = !show)} class:active={show}>How to read this chart?</span>
	</div>
	{#if show}
		<div class="legend" in:slide={{ duration: 300 }} out:slide={{ duration: 200 }}>
			<div in:fade={{ duration: 300 }} out:fade={{ duration: 200 }}>
				{@html howToRead}
			</div>
		</div>
	{/if}
</aside>

<style lang="postcss">
	.how-to-read {
		display: flex;
		flex-direction: column;
		gap: 0.8em;
		border-radius: 2px;
		width: 22em;
	}

	.legend {
		padding: 0.4em 0.8em;
	}

	.title {
		font-size: 0.8rem;
		color: var(--color-grey);

		& span {
			cursor: pointer;
			border-bottom: 2px solid var(--color-dark-grey);
            padding-bottom: 2px;

			&:hover {
				color: var(--color-white);
			}

			&.active {
				color: var(--color-white);
			}
		}
	}
</style>
