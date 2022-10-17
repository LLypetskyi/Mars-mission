import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";

import { rovers } from 'src/app/data/rovers';
import { IRoverCamera } from 'src/app/interfaces/rover-camera';
import { NasaDataService } from 'src/app/services/nasa-data.service';
import { IRover } from '../../interfaces/rover';

@Component({ 
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  rovers = rovers;

  constructor(private dataService: NasaDataService) { }

  selectedRover$ = this.dataService.getSelectedRover$;

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

  public getMarsPhotos():void {
    this.dataService.getMarsPhotos();
  }

  solFormControl = new FormControl('', Validators.min(1));

}
