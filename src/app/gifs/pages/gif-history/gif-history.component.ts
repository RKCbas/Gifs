import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop'
import { map } from 'rxjs';
import { GifService } from '../../services/gifs.service';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

@Component({
  selector: 'gif-history',
  imports: [
    GifListComponent
  ],
  templateUrl: './gif-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GifHistoryComponent { 
  
  gifsService = inject(GifService);
  scrollStateService = inject(ScrollStateService)
  loadingGifs = signal(false);

  // query = inject(ActivatedRoute).params.subscribe( (params)=>
  //   console.log(params['query'])
  // );

  query = toSignal( 
    inject(ActivatedRoute).params.pipe( map( params => params['query'] ) )
  );

  gifsByKey = computed(()=>{
    return this.gifsService.getHistoryGifs(this.query())
  })

  gifPage = signal( (this.gifsByKey().length/8) - 1 );

  handleScroll( scrollTop:number ){
    this.scrollStateService.historyScrollState.update(state=>({
      ...state,
      [this.query()]: scrollTop
    }))
  }

  handleIsAtBottom( isAtBottom:boolean ){
    if (isAtBottom){
      this.onSearch(this.query())
    }
  }

  onSearch( query:string ){

    if (this.loadingGifs()) return;

    this.loadingGifs.set(true)
    
    this.gifsService.searchGifs(query, this.gifPage()).subscribe( (resp)=>{
      this.gifPage.update(current=>current+1)
      this.loadingGifs.set(false)
    });

  }

}
