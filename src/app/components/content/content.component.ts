import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';

import { rovers } from 'src/app/data/rovers';
import { IPhoto } from 'src/app/interfaces/photo';
import { IRover } from 'src/app/interfaces/rover';
import { IRoverCamera } from 'src/app/interfaces/rover-camera';
import { NasaDataService } from 'src/app/services/nasa-data.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  rovers = rovers;
  public solFormControl = new FormControl('', Validators.min(1));
  
  public selectedRover$ = this.dataService.getSelectedRover$;
  public photos$: Observable<IPhoto[]> = this.dataService.getPhotos$;
  public showMainLoading$: Observable<boolean> = this.dataService.showMainLoading$;
  public showLoadMoreLoading$: Observable<boolean> = this.dataService.showLoadMoreLoading$;

  public showLoadMore$: Observable<boolean> = this.dataService.showLoadMore$;
  public color: ThemePalette = 'primary';
  public mode: ProgressSpinnerMode = 'indeterminate';
  public value = 50;


  constructor(private dataService: NasaDataService) { }

  public onRoverSelected(rover: IRover) {
    console.log("rover =>", rover);
    this.dataService.setSelectedRover(rover);
  }

  public onSelectedCamera(selectedCamera: IRoverCamera) {
    console.log("selected camera is =>", selectedCamera);
    this.dataService.setSelectedCamera(selectedCamera);

  }
  public onSelectedSol(num: number) {
    console.log("selectedSol =>", num);
    this.dataService.setSelectedSol(num);
  }

  public ngOnInit(): void {
  }

  public getMarsPhotos(): void {
    this.dataService.getMarsPhotos();
  }

  public loadMore() {
    this.dataService.loadMore();
  }

}
