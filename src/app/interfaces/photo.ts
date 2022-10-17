import { IPhotoCamera } from './photo-camera';
import { IPhotoRover } from './photo-rover';

export interface IPhoto {
  id: number;
  sol: number;
  camera: IPhotoCamera;
  imgSrc: string;
  earthDate: string;
  rover: IPhotoRover;
}
