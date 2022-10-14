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

  onRoverSelected(rover: IRover) {
    console.log(rover);
    this.selectedCamera = null;
  }

  solFormControl = new FormControl('', Validators.min(1));

  constructor() { }

  ngOnInit(): void {
  }

}
