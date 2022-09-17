<script>
	import logo from '$svg/logo.svg';
</script>

<footer class="footer">
	<div class="footer__logo__icon">
		<a href="https://ohmychart.com">{@html logo}</a>
	</div>
</footer>

<style>
	.footer {
		background-color: var(--color-black-0);
		height: 3em;
		width: 100%;
		padding: 1em;
		display: flex;
		flex-direction: row;
		line-height: 0;
		align-items: center;
		justify-content: center;
	}

	.footer__logo__icon {
		width: 1rem;
		margin: 1em;
		display: inline-block;
	}

	.footer__logo__icon a {
		fill: var(--color-white);
		transition: all 0.3s ease;
	}

	.footer__logo__icon a:hover {
		fill: var(--color-primary);
	}
</style>
