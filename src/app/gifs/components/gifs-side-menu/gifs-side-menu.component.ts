import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GifsSideMenuHeaderComponent } from './gifs-side-menu-header/gifs-side-menu-header.component';
import { GifsSideMenuOptionsComponent } from './gifs-side-menu-options/gifs-side-menu-options.component';
import { NgClass } from '@angular/common';
import { MenuService } from '../../services/menu.service';
import { GifsSideMenuButtonComponent } from './gifs-side-menu-button/gifs-side-menu-button.component';

@Component({
  selector: 'gifs-side-menu',
  imports: [
    GifsSideMenuHeaderComponent,
    GifsSideMenuOptionsComponent,
    GifsSideMenuButtonComponent,
    NgClass
  ],
  templateUrl: './gifs-side-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsSideMenuComponent {

  menuService = inject(MenuService)

}
