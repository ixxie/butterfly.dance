import type * as THREE from 'three';

export type Path = {
    points: THREE.Vector3[];
    color: any;
    length: number;
};

export type Trail = {
    geometry: THREE.BufferGeometry;
    material: THREE.Material;
};

export type State = {
    paths: Path[];
    time: number;
};

export type View = {
    trails: Trail[];
};