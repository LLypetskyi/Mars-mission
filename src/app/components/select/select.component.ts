import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  rovers: string[] = ["Curiosity", "Opportunity", "Spirit"];

  constructor() { }

  ngOnInit(): void {
  }


}
