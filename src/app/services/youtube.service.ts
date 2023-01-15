import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { YoutubeResponse, Video } from '../models/youtube.model';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  
  private youtubeUrl = "https://www.googleapis.com/youtube/v3";
  private apiKey = "AIzaSyCuxTh0UmKq0M3Ei9TGfaL1ZNTwI07Bn7w";
  private playlistId = "UUuaPTYj15JSkETGnEseaFFg";
  private nextPageToken = "";

  constructor(private http: HttpClient) { 

  }

  getVideos() {

    const url = this.youtubeUrl+"/playlistItems";
    const params = new HttpParams()
      .set("part", "snippet")
      .set("maxResults", "10")
      .set("playlistId", this.playlistId)
      .set("key", this.apiKey)
      .set("pageToken", this.nextPageToken);
    
    return this.http.get<YoutubeResponse>(url, { params })
      .pipe(
        map( resp => {
          this.nextPageToken = resp.nextPageToken;
          return resp.items;
        }),
        map(items => items.map( video => video.snippet))
      );
  }

}
