<script>
    import Header from "$components/Header.svelte";
    import Controls from "$components/Controls.svelte";
    import Chart from '$components/Chart.svelte';

    let activeIdx = 0;
</script>

<Header />
<Controls bind:activeIdx={activeIdx}/>
<Chart />
