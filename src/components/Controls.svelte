<script>
	const buttons = ['All', 'GDPPC 1909', 'GDPPC 2018', 'Change'];

	export let activeIdx;
	const switchIdx = (idx) => {
		activeIdx = idx;
	};
</script>

<div class="controls">
	{#each buttons as button, idx}
		<button class:active={idx == activeIdx} on:click={() => switchIdx(idx)}>{button}</button>
	{/each}
</div>

<style lang="postcss">
	.controls {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
		column-gap: 0.5rem;
		max-width: var(--content-width);
	}

	button {
		width: 100%;
		color: var(--color-white);
		background-color: transparent;
		font-size: min(0.7em, 22px);
		line-height: 1;
		text-transform: uppercase;
		border: none;
		border-bottom: 0.25rem solid var(--color-dark-grey);
		cursor: pointer;
		text-align: center;
		padding: 0.25rem 0;
		transition: all 0.3s ease;

		&:hover,
		&.active {
			border-bottom: 0.3em solid var(--color-white);
		}

		&:active {
			transform: scale(0.98);
		}
	}
</style>
