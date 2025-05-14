import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPageComponent { 
  
  gifs = signal<Gif[][]>([])
  loadingGifs = signal(false);
  gifPage = signal(0)

  query = signal("");

  gifsService = inject(GifService);

  handleIsAtBottom( isAtBottom:boolean ){
    if (isAtBottom){
      this.onSearch(this.query())
    }
  }

  onSearch( query:string ){

    if (this.loadingGifs()) return;

    this.loadingGifs.set(true)
    this.query.set(query);

    this.gifsService.searchGifs(query, this.gifPage()).subscribe( (resp)=>{
      this.gifs.update(currentGifs => [
        ...currentGifs,
        ...resp
      ]);
      this.gifPage.update(current=>current+1)
      this.loadingGifs.set(false)
    });

  }

}
