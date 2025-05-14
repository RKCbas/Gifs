import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';

import { map, Observable, tap } from 'rxjs';

import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
// add *type* with interfaces
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';


// es lo mismo que: function loadSearchHistoryFromLocalStorage(){ lógica }
const loadSearchHistoryFromLocalStorage = () => {
    const gifsSearchHistory = localStorage.getItem(environment.GIF_LS_KEY);

    return gifsSearchHistory ? JSON.parse(gifsSearchHistory) : {};
}

// {
//     'búsqueda x': [[],[],[]]
// }
// Record<string, Gif[][]>

@Injectable({providedIn: 'root'})
export class GifService {

    private readonly http = inject(HttpClient);

    trendingGifs = signal<Gif[]>([]);
    trendingGifsLoading = signal(true);

    trendingGifGroup = computed<Gif[][]>(()=>{
        const groups = [];
        for(let i = 0;i < this.trendingGifs().length; i+=3 ){
            groups.push(this.trendingGifs().slice(i, i+3));
        }
        return groups;
    })

    searchHistory = signal< Record<string, Gif[][]> >(loadSearchHistoryFromLocalStorage())
    searchHistoryKeys = computed(()=>
        Object.keys(this.searchHistory())
    );

    saveSearchHistoryFromLocalStorage = effect(()=>{
        const historyString = JSON.stringify( this.searchHistory() );
        localStorage.setItem( environment.GIF_LS_KEY, historyString );
    });

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
            const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
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