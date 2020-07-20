import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable }   from 'rxjs';
import { Elements } from '../models/elements.model';


@Injectable({
  providedIn: 'root'
})
export class DataSearchService {

  private REST_API_SERVER = "http://localhost:4000";

  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(params): Observable<Elements[]>{
    return this.httpClient.get<Elements[]>(`${this.REST_API_SERVER}/search`, { params: params });
  }
}
