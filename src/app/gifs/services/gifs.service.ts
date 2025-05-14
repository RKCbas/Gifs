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
    trendingGifsLoading = signal(false);
    private readonly trendingPage = signal(0);

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

        if(this.trendingGifsLoading()) return;

        this.trendingGifsLoading.set(true);

        this.http.get<GiphyResponse>(`${ environment.giphyUrl }/trending`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: 24,
                offset: this.trendingPage() * 24
            }
        }).subscribe( (resp)=>{
            const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
            this.trendingGifs.update(currentGifs => [
                ...currentGifs,
                ...gifs
            ]);
            this.trendingPage.update(current=>current+1)
            
            this.trendingGifsLoading.set(false);
        })
    }
    
    searchGifs( query:string, page:number = 0 ): Observable<Gif[][]> {
        return this.http.get<GiphyResponse>(`${ environment.giphyUrl }/search`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: 24,
                q: query,
                offset: page * 24
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
                    [query.toLowerCase()]: [
                        ...(history[query.toLowerCase()] || [] ),
                        ...items
                    ]
                }))
            })
        );
    }

    getHistoryGifs( query:string ):Gif[][]{
        console.log(this.searchHistory()[query]);
        return this.searchHistory()[query] ?? [];
    }

}