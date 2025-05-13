import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop'
import { map } from 'rxjs';
import { GifService } from '../../services/gifs.service';
import { GifListComponent } from '../../components/gif-list/gif-list.component';

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

  // query = inject(ActivatedRoute).params.subscribe( (params)=>
  //   console.log(params['query'])
  // );

  query = toSignal( 
    inject(ActivatedRoute).params.pipe( map( params => params['query'] ) )
  );

  gifsByKey = computed(()=>{
    return this.gifsService.getHistoryGifs(this.query())
  })

}
