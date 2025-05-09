import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
// add *type* with interfaces

@Injectable({providedIn: 'root'})
export class GifService {

    private readonly http = inject(HttpClient);

    constructor(){
        this.loadTrendingGifs();
    }
    
    loadTrendingGifs(){
        this.http.get<GiphyResponse>(`${ environment.giphyUrl }/trending`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: 24
            }
        })
    }
    
}