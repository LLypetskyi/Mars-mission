import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";

import { rovers } from 'src/app/data/rovers';
import { IRoverCamera } from 'src/app/interfaces/rover-camera';
import { IRover } from '../../interfaces/rover';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  rovers = rovers;
  selectedRover?: IRover;
  selectedCamera?: IRoverCamera | null;
  selectedSol?: number;



  onRoverSelected(rover: IRover) {
    console.log(rover);
    this.selectedCamera = null;
  }

  onSelectedCamera(selectedCamera: IRoverCamera) {
    console.log("selected camera is =>", selectedCamera);

  }
  onSelectedSol(num: number) {
    console.log("selectedSol =>", this.selectedSol);
  }

  solFormControl = new FormControl('', Validators.min(1));

  showImages() {

  }

  constructor() { }

  ngOnInit(): void {
  }

}
