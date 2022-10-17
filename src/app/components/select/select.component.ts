import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";

import { rovers } from 'src/app/data/rovers';
import { IRoverCamera } from 'src/app/interfaces/rover-camera';
import { IRover } from '../../interfaces/rover';
import { NasaDataService } from '../../services/nasa-data.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  rovers = rovers;
  public selectedRover$ = this.dataService.selectedRover$;
  public selectedCamera$ = this.dataService.selectedCamera$;
  public selectedSol$ = this.dataService.selectedSol$;

  constructor(private dataService: NasaDataService) { }

  onRoverSelected(rover: IRover) {
    console.log("rover =>", rover);
    this.dataService.selectRover(rover);
  }

  onSelectedCamera(selectedCamera: IRoverCamera) {
    console.log("selected camera is =>", selectedCamera);
    this.dataService.selectCamera(selectedCamera);

  }
  onSelectedSol(num: number) {
    console.log("selectedSol =>", num);
    this.dataService.selectSol(num);
  }

  solFormControl = new FormControl('', Validators.min(1));

  getMarsPhotos() {
    this.dataService.getMarsPhoto();
  }

  ngOnInit(): void {
  }

}
