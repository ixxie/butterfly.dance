import * as knobby from 'svelte-knobby';

export default knobby.panel({
    animation: {
        speed: {
            value: 30,
            min: 0,
            max: 100,
            step: 1
        },
        freq: {
            value: 100,
            min: 1,
            max: 10000,
            step: 1
        },
        trailCount: {
            value: 3,
            min: 1,
            max: 100,
            step: 1
        },
        trailLength: {
            value: 50,
            min: 1,
            max: 2500,
            step: 1
        }
    },
    model: {
        sigma: {
            value: 10,
            min: 0,
            max: 20,
            step: 0.1
        },
        rho: {
            value: 28,
            min: 0,
            max: 100,
            step: 0.1
        },
        beta: {
            value: 8 / 3,
            min: 0,
            max: 10,
            step: 0.1
        }
    }
});