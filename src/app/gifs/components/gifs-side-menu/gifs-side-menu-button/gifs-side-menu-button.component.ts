import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MenuService } from 'src/app/gifs/services/menu.service';

@Component({
  selector: 'gifs-side-menu-button',
  imports: [
    NgIf
  ],
  templateUrl: './gifs-side-menu-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsSideMenuButtonComponent { 
  menuService = inject(MenuService)
  
}
