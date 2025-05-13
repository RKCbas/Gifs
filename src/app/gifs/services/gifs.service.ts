import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';

import { map, Observable, tap } from 'rxjs';

import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
// add *type* with interfaces
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';

// {
//     'búsqueda x': [[],[],[]]
// }
// Record<string, Gif[][]>

@Injectable({providedIn: 'root'})
export class GifService {

    private readonly http = inject(HttpClient);

    trendingGifs = signal<Gif[][]>([])
    trendingGifsLoading = signal(true);

    searchHistory = signal< Record<string, Gif[][]> >({})
    searchHistoryKeys = computed(()=>
        Object.keys(this.searchHistory())
    )

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
    
    searchGifs( query:string ): Observable<Gif[][]> {
        return this.http.get<GiphyResponse>(`${ environment.giphyUrl }/search`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: 24,
                q: query
            }
        })
        .pipe(
            map( 
                ({ data }) => data
            ),
            map(
                (items) =>  GifMapper.mapGiphyItemsToGifArrayOfThrees(items)
            ),
            // Historial
            tap( items => {
                this.searchHistory.update( history => ({
                    ...history,
                    [query.toLowerCase()]: items,
                }))
            })
        );
        // .subscribe( (resp)=>{
        //     const gifs = GifMapper.mapGiphyItemsToGifArrayOfThrees(resp.data);
        //     console.log( { gifs } );

        // })
    }

    getHistoryGifs( query:string ):Gif[][]{
        console.log(this.searchHistory()[query]);
        return this.searchHistory()[query] ?? [];
    }

}