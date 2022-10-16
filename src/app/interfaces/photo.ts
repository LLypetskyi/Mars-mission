import { IPhotoCamera } from './photo-camera';
import { IPhotoRover } from './photo-rover';

export interface IPhoto {
  id: number;
  sol: number;
  camera: IPhotoCamera;
  img_src: string;
  earth_date: string;
  rover: IPhotoRover;
}
