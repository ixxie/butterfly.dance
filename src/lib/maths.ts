import type { State, Path } from '$lib/types';

import * as THREE from 'three';

export default function iterateState(state: State, config: any) {
    for (let path of state.paths) {
        let prev = path.points[0].clone();
        let next = update(prev, config);
        path.points.unshift(next);
        if (path.points.length > path.length) {
            path.points.pop();
        }
    }
    state.time += 1;
    return state;
}

function update(prev: THREE.Vector3, config: any): THREE.Vector3 {
    return calcRK4(prev, config.animation.freq, lorenzSystem(config.model));
}

function lorenzSystem(params: any): (prev: THREE.Vector3) => THREE.Vector3 {
    let { sigma, rho, beta } = params;
    return function lorenzEq(prev: THREE.Vector3): THREE.Vector3 {
        let next = new THREE.Vector3(0, 0, 0);
        next.x = sigma * (prev.y - prev.x);
        next.y = prev.x * (rho - prev.z) - prev.y;
        next.z = prev.x * prev.y - beta * prev.z;
        return next;
    };
}

function calcRK4(
    prev: THREE.Vector3,
    freq: number,
    fn: (p: THREE.Vector3) => THREE.Vector3
): THREE.Vector3 {
    let step = 1 / freq;
    let k1 = fn(prev);
    let k2 = fn(prev.add(k1.multiplyScalar(step / 2)));
    let k3 = fn(prev.add(k2.multiplyScalar(step / 2)));
    let k4 = fn(prev.add(k3.multiplyScalar(step)));
    let next = prev.add(
        // (k1 + 2k2 + 2k3 + k4)*step/6
        k1
            .add(k2.multiplyScalar(2))
            .add(k3.multiplyScalar(2))
            .add(k4)
            .multiplyScalar(step / 6)
    );
    return next;
}