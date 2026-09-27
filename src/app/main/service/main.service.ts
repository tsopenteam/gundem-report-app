import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private API_URL: string = "https://raw.githubusercontent.com/tsopenteam/gundem/master/gundem.json";
  private YOUTUBE_MAIN_API_URL: string = "https://raw.githubusercontent.com/tsopenteam/content/master/datas/ytmaindata.json";
  private YOUTUBE_DATA_API_URL: string = "https://raw.githubusercontent.com/tsopenteam/content/master/datas/ytdata.json";


  constructor(private http: HttpClient) { }

  public GetData() {
    return this.http.get(this.API_URL);
  }

  public GetYoutubeMainData() {
    return this.http.get(this.YOUTUBE_MAIN_API_URL);
  }

  public GetYoutubeData() {
    return this.http.get(this.YOUTUBE_DATA_API_URL);
  }
}