import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { IPhoto } from '../interfaces/photo';
import { IRover } from '../interfaces/rover';
import { IRoverCamera } from '../interfaces/rover-camera';
import { Mapper } from './mapper';

@Injectable({
  providedIn: 'root',
})
export class NasaApiService {
  constructor(private http: HttpClient) { }

  public getMarsPhotos(
    rover: IRover,
    camera: IRoverCamera,
    sol: number,
    page: number,
  ): Observable<IPhoto[]> {
    const demo_key: string = 'icVUpn1Ry49jsBLmHF94nB4d4GrnMWpnfQg0ZNtk';
    const baseUrl = 'https://api.nasa.gov';
    const endpoint = 'mars-photos/api/v1/rovers';
    const url = `${baseUrl}/${endpoint}/${rover.title}/photos?sol=${sol}&page=${page}&camera=${camera.abbr}&api_key=${demo_key}`;
    return this.http
      .get<any>(url)
      .pipe(map((data) => Mapper.mapPhotosToIPhotos(data.photos)));
  }
}
