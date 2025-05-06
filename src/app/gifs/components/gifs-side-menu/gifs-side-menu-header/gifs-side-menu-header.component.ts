import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '@environments/environment';
// import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'gifs-side-menu-header',
  imports: [],
  templateUrl: './gifs-side-menu-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsSideMenuHeaderComponent { 
  envs = environment
}
