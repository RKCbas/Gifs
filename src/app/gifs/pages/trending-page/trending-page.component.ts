import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';


@Component({
  selector: 'app-trending-page',
  imports: [
    GifListComponent
  ],
  templateUrl: './trending-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrendingPageComponent {
  // gifs = signal(imageUrls);

  gifService = inject( GifService )
  scrollStateService = inject(ScrollStateService)

  handleIsAtBottom( isAtBottom:boolean ){
    if (isAtBottom) {
      this.gifService.loadTrendingGifs()
    }
  }

  handleScroll( scrollTop:number ){
    this.scrollStateService.pagesScrollState.update(state=>({
      ...state,
      ["trendingPage"]: scrollTop
    }))
  }

}
