<script lang="ts">
	import type { State, Path } from '$lib/types';
	import iterateState from '$lib/maths';
	import { renderView, delay, seedPath } from '$lib/graphics';
	import config from '$lib/controls';

	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';

	let paths = new Array<Path | undefined>($config.animation.trailCount)
		.fill(undefined)
		.map(() => seedPath($config.animation.trailLength));
	let state: State = { paths, time: 0 };
	let view = renderView(state);

	SC.onFrame(async () => {
		await delay(1000 / $config.animation.speed);
		state = iterateState(state, $config);
		view = renderView(state);
	});
</script>

<SC.Canvas antialias background={new THREE.Color(0xffffff)}>
	{#each view.trails as trail}
		<SC.Mesh {...trail} />
	{/each}

	<SC.PerspectiveCamera position={[50, 50, 0]} />
	<SC.OrbitControls target={[0, 0, 0]} enableZoom={true} enablePan={false} enableDamping />

	<SC.AmbientLight intensity={0.8} />
</SC.Canvas>
