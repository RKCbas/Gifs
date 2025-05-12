import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
// add *type* with interfaces
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';

@Injectable({providedIn: 'root'})
export class GifService {

    private readonly http = inject(HttpClient);

    trendingGifs = signal<Gif[][]>([])
    trendingGifsLoading = signal(true);

    constructor(){
        this.loadTrendingGifs();
    }
    
    loadTrendingGifs(){
        this.http.get<GiphyResponse>(`${ environment.giphyUrl }/trending`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: 24
            }
        }).subscribe( (resp)=>{
            const gifs = GifMapper.mapGiphyItemsToGifArrayOfThrees(resp.data);
            this.trendingGifs.set(gifs);
            this.trendingGifsLoading.set(false);
            // console.log( { gifs } );
        })
    }
    
}