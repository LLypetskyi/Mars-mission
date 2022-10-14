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
    const demo_key: string = "icVUpn1Ry49jsBLmHF94nB4d4GrnMWpnfQg0ZNtk";
    const url =
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=${demo_key}`;
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
        img_src: item.img_src,
        earth_date: item.earth_date,
        rover: {
          id: number,
          name: string,
          landing_date: string,
          launch_date: string,
          status: string
        }

      })))

  }
