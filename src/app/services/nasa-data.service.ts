import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { NasaApiService } from './nasa-api.service';
import { IRover } from '../interfaces/rover';
import { IPhoto } from '../interfaces/photo';
import { IRoverCamera } from '../interfaces/rover-camera';

@Injectable({
  providedIn: 'root'
})
export class NasaDataService {

  constructor(private nasaApiService: NasaApiService) { }

  private selectedRoverSubject: BehaviorSubject<IRover | null> = new BehaviorSubject<IRover | null>(null);
  private selectedCameraSubject: BehaviorSubject<IRoverCamera | null> = new BehaviorSubject<IRoverCamera | null>(null);
  private selectedSolSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  private photosSubject: BehaviorSubject<IPhoto[]> = new BehaviorSubject<IPhoto[]>([]);
  private pageNumberSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  private showMainLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private showLoadMoreLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private showLoadMoreSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);



  public getSelectedRover$ = this.selectedRoverSubject.asObservable();
  public getSelectedCamera$ = this.selectedCameraSubject.asObservable();
  public getSelectedSol$ = this.selectedSolSubject.asObservable();
  public getPhotos$ = this.photosSubject.asObservable();
  public getPageNumber$ = this.pageNumberSubject.asObservable();
  public showMainLoading$ = this.showMainLoadingSubject.asObservable();
  public showLoadMoreLoading$ = this.showLoadMoreLoadingSubject.asObservable();
  public showLoadMore$ = this.showLoadMoreSubject.asObservable();



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

  public setShowMainLoading(loading: boolean) {
    this.showMainLoadingSubject.next(loading);
  }

  public setShowLoadMoreLoading(loading: boolean) {
    this.showLoadMoreLoadingSubject.next(loading);
  }

  public setShowLoadMore(showLoadMore: boolean) {
    this.showLoadMoreSubject.next(showLoadMore);
  }

  public cleanPhotos() {
    this.setPageNumber(1);
    this.setShowLoadMore(false);
    this.setPhotos([]);
  }


  public getMarsPhotos() {
    let selectedRover = this.selectedRoverSubject.value;
    let selectedCamera = this.selectedCameraSubject.value;
    let selectedSol = this.selectedSolSubject.value;
    let pageNumber = this.pageNumberSubject.value;
    let currentPhotos = this.photosSubject.value;

    if (currentPhotos.length === 0) {
      this.setShowMainLoading(true);
    }

    if (selectedRover == null || selectedCamera == null || selectedSol == null) {
      console.log('Values are null. Can\'t make http request.')
      return;
    }

    this.nasaApiService.getMarsPhotos(selectedRover, selectedCamera, selectedSol, pageNumber)
      .subscribe({
        next: (photos) => {
          if (photos.length > 0) {
            this.setShowLoadMore(true);
          }

          if (photos.length < 25) {
            this.setShowLoadMore(false);
          }

          this.setPhotos([...currentPhotos, ...photos]);
          this.setShowMainLoading(false);
          this.setShowLoadMoreLoading(false);
        },
        error: (error) => {
          this.setShowMainLoading(false);
          this.setShowLoadMoreLoading(false);
        },
      }
      );
  }

  public loadMore() {
    this.setShowLoadMoreLoading(true);
    let currentPageNumber = this.pageNumberSubject.value;
    let nextPageNumber = currentPageNumber + 1;
    this.setPageNumber(nextPageNumber);
    this.getMarsPhotos();
  }
}
