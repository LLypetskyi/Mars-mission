import { IRoverCamera } from "./rover-camera";

export interface IRover {
    title: string;
    cameras: IRoverCamera[];
}