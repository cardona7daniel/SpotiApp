import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {

  artistas: any[] = [];
  urlSpotify:string = "https://api.spotify.com/v1/";
  token:string = "BQAyLI4VVZydMteejBs6bvPtffJlQ6E4vvEOjqOIa0d6dR4b0bUHaMFX4RSCHgXjWqnN08GbGIVD5udjueE"

  constructor(public http: HttpClient) {}

  private getHeaders():HttpHeaders {
    let headers = new HttpHeaders({
      'authorization': 'Bearer ' + this.token
    });

    return headers;
  }

  getTop(id:string){
    const url:string = `${this.urlSpotify}artists/${id}/top-tracks?country=US`

    const headers = this.getHeaders();

    return this.http.get(url, { headers })
    .map((data:any) => {
      return data.tracks;
    })
  }

  getArtista(id:string){
    const url:string = `${this.urlSpotify}artists/${id}`;

    const headers = this.getHeaders();

    return this.http.get(url, { headers });
  }

  getArtistas(termino: string) {
    const url:string = `${this.urlSpotify}search?query=${termino}&type=artist&offset=0&limit=20`;

    const headers = this.getHeaders();

    return this.http.get(url, { headers })
      .map((data: any) => {
        this.artistas = data.artists.items;
        return this.artistas;
      })
  }
}
