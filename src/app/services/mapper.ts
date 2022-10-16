import { IPhoto } from "../interfaces/photo";
import { IPhotoCamera } from "../interfaces/photo-camera";
import { IPhotoRover } from "../interfaces/photo-rover";

export class Mapper {
    public static mapPhotosToIPhotos(items: any[]): IPhoto[] {
        return items.map((item) => this.mapPhotoToIPhoto(item));
    }

    public static mapPhotoToIPhoto(item: any): IPhoto {
        return <IPhoto>{
            id: item['id'],
            sol: item['sol'],
            camera: this.mapPhotoCameraToIPhotoCamera(item['camera']),
            imgSrc: item['img_src'],
            earthDate: item['earth_date'],
            rover: this.mapPhotoRoverToIPhotoRover(item['rover'])
        }
    }

    public static mapPhotoCameraToIPhotoCamera(item: any): IPhotoCamera {
        return <IPhotoCamera>{
            id: item['id'],
            name: item['name'],
            roverId: item['rover_id'],
            fullName: item['full_name'],
        }
    }

    public static mapPhotoRoverToIPhotoRover(item: any): IPhotoRover {
        return <IPhotoRover>{
            id: item['id'],
            name: item['name'],
            landingDate: item['landing_date'],
            launchDate: item['launch_date'],
            status: item['status'],
        }
    }
}
