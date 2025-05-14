import { inject, Injectable, signal } from '@angular/core';
import { GifService } from 'src/app/gifs/services/gifs.service';

@Injectable({providedIn: 'root'})
export class ScrollStateService {
    
    gifService = inject(GifService)

    pagesScrollState = signal<Record<string,number>>({
        "trendingPage": 0
    });

    historyScrollState = signal<Record<string, number>>(
        // reduce is used to convert an array to a object
        this.gifService.searchHistoryKeys().reduce(
            
            (acc, key) => {
                acc[key] = 0;
                return acc;
            },
            {} as Record<string, number>

        )
    );


    
}