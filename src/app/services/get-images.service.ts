import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IPhoto } from '../interfaces/photo';

@Injectable({
  providedIn: 'root'
})
export class GetImagesService {

  constructor(private http: HttpClient) { }

  public getImages(): Observable<any> {
    const url =
      'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=DEMO_KEY';
    return this.http.get(url)
      .pipe(map((res: any) => res.map((item: any) => <IPhoto>{
        id: item.id,
        sol: item.sol,
        camera: {
          id: number,
          name: string,
          rover_id: number,
          full_name: string
        },
        img_src: string,
        earth_date: string,
        rover: {
          id: number,
          name: string,
          landing_date: string,
          launch_date: string,
          status: string
        }

      })))

  }
