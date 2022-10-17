import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NasaApiService } from './nasa-api.service';
import { BehaviorSubject } from 'rxjs';
import { IRover } from '../interfaces/rover';
import { IPhoto } from '../interfaces/photo';
import { IRoverCamera } from '../interfaces/rover-camera';

@Injectable({
  providedIn: 'root'
})
export class NasaDataService {

  constructor(private http: HttpClient, private NasaApiService: NasaApiService) { }

  private pageNumber = 1;
  private photosSubject = new BehaviorSubject<IPhoto[]>([]);
  public photos$ = this.photosSubject.asObservable();


  private selectedRoverSubject: BehaviorSubject<IRover | null> = new BehaviorSubject<IRover | null>(null);
  public selectedRover$ = this.selectedRoverSubject.asObservable();

  private selectedCameraSubject: BehaviorSubject<IRoverCamera | null> = new BehaviorSubject<IRoverCamera | null>(null);
  public selectedCamera$ = this.selectedCameraSubject.asObservable();

  private selectedSolSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  public selectedSol$ = this.selectedSolSubject.asObservable();

  public getMarsPhoto(): void {
    let oldPhotos = this.photosSubject.value;
    let selectedRover = this.selectedRoverSubject?.value;
    let selectedCamera = this.selectedCameraSubject?.value;
    let selectedSol = this.selectedSolSubject?.value;

    if (selectedCamera == null || selectedRover == null || selectedSol == null) {
      console.log("The values are null. Can't make http request");
      return;
    }
    this.NasaApiService.getMarsPhotos(selectedRover, selectedCamera, this.pageNumber, selectedSol)
      .subscribe((photos) => {
        this.setMarsPhotos([...oldPhotos, ...photos]);
      });
  }

  public loadMore() {
    this.pageNumber = this.pageNumber + 1;
    this.getMarsPhoto();
  }

  public cleanPhotos() {
    this.pageNumber = 1;
    this.setMarsPhotos([]);
  }

  public setMarsPhotos(photos: IPhoto[]) {
    this.photosSubject.next(photos);
  }

  public selectRover(rover: IRover) {
    this.selectedRoverSubject.next(rover);
    this.cleanPhotos();
  }

  public selectCamera(roverCamera: IRoverCamera) {
    this.selectedCameraSubject.next(roverCamera);
    this.cleanPhotos();
  }

  public selectSol(sol: number) {
    this.selectedSolSubject.next(sol);
    this.cleanPhotos();

  }


}
