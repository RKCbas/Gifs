import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop'
import { map } from 'rxjs';

@Component({
  selector: 'gif-history',
  imports: [],
  templateUrl: './gif-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GifHistoryComponent { 
  
  // query = inject(ActivatedRoute).params.subscribe( (params)=>
  //   console.log(params['query'])
  // );

  query = toSignal( 
    inject(ActivatedRoute).params.pipe( map( params => params['query'] ) )
  );


}
