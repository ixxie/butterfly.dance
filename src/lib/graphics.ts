import type { Path, Trail, State, View } from "$lib/types";

import * as THREE from 'three';

const SCALE = 2;

export function renderView(state: State): View {
    let trails = state.paths.map((path: Path): Trail => {
        return {
            material: new THREE.LineBasicMaterial({ color: path.color }),
            geometry: new THREE.BufferGeometry().setFromPoints(path.points)
        };
    });
    return { trails };
}

export function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const rand = () => SCALE * 1 * (Math.random() - 0.5);

export function seedPath(length: number): Path {
    return {
        points: [new THREE.Vector3(rand(), rand(), rand())],
        length,
        color: 0x000000
    };
}

const sphere = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshStandardMaterial({ color: 0x000000 });