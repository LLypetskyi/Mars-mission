import { Component, OnInit } from '@angular/core';
import { NasaDataService } from '../../services/nasa-data.service';


@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {


  constructor(private dataService: NasaDataService) { }

  public items$ = this.dataService.photos$;

ngOnInit(): void {
}

loadMore() {
  this.dataService.loadMore();
}

}
