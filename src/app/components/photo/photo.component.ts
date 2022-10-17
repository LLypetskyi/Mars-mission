import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPhoto } from 'src/app/interfaces/photo';
import { NasaDataService } from 'src/app/services/nasa-data.service';


@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {


  constructor(private dataService: NasaDataService) { }

  public photos$: Observable<IPhoto[]> = this.dataService.getPhotos$;

ngOnInit(): void {
}

loadMore() {
  this.dataService.loadMore();
}

}
