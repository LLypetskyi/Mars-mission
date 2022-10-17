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

  constructor(private http: HttpClient, private nasaApiService: NasaApiService) { }

  private selectedRoverSubject: BehaviorSubject<IRover | null> = new BehaviorSubject<IRover | null>(null);
  private selectedCameraSubject: BehaviorSubject<IRoverCamera | null> = new BehaviorSubject<IRoverCamera | null>(null);
  private selectedSolSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  private photosSubject: BehaviorSubject<IPhoto[]> = new BehaviorSubject<IPhoto[]>([]);
  private pageNumberSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);



  public getSelectedRover$ = this.selectedRoverSubject.asObservable();
  public getSelectedCamera$ = this.selectedCameraSubject.asObservable();
  public getSelectedSol$ = this.selectedSolSubject.asObservable();
  public getPhotos$ = this.photosSubject.asObservable();
  public getPageNumber$ = this.pageNumberSubject.asObservable();




  public setSelectedRover(rover: IRover) {
    this.selectedRoverSubject.next(rover);
    this.cleanPhotos();
  }
  
  public setSelectedCamera(camera: IRoverCamera) {
    this.selectedCameraSubject.next(camera);
    this.cleanPhotos();
  }

  public setSelectedSol(sol: number) {
    this.selectedSolSubject.next(sol);
    this.cleanPhotos();
  }

  public setPhotos(photos: IPhoto[]) {
    this.photosSubject.next(photos);
  }

  public setPageNumber(pageNumber: number) {
    this.pageNumberSubject.next(pageNumber);
  }



  public cleanPhotos() {
    this.setPageNumber(1);
    this.setPhotos([]);
  }


  public getMarsPhotos() {
    let selectedRover = this.selectedRoverSubject.value;
    let selectedCamera = this.selectedCameraSubject.value;
    let selectedSol = this.selectedSolSubject.value;
    let pageNumber = this.pageNumberSubject.value;
    let currentPhotos = this.photosSubject.value;

    if (selectedRover == null || selectedCamera == null || selectedSol == null) {
      console.log('Values are null. Can\'t make http request.')
      return;
    }

    this.nasaApiService.getMarsPhotos(selectedRover, selectedCamera, selectedSol, pageNumber).subscribe((photos: IPhoto[]) => this.setPhotos([...currentPhotos, ...photos]));
  }

  public loadMore() {
    let currentPageNumber = this.pageNumberSubject.value;
    let nextPageNumber = currentPageNumber + 1;
    this.setPageNumber(nextPageNumber);
    this.getMarsPhotos();
  }
}
