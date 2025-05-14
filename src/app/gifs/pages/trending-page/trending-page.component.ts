import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifService } from '../../services/gifs.service';


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

  handleIsAtBottom( isAtBottom:boolean ){
    if (isAtBottom) {
      this.gifService.loadTrendingGifs()
    }
  }
}
