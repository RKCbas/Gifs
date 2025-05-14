import { ChangeDetectionStrategy, Component, ElementRef, input, viewChild } from '@angular/core';
import { GifListItemComponent } from "./gif-list-item/gif-list-item.component";
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gif-list',
  imports: [GifListItemComponent],
  templateUrl: './gif-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifListComponent {
  groups = input.required<Gif[][]>(); 

  scrollDivRef = viewChild<ElementRef>('groupDiv')

  onScroll( event:Event ){
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    // console.log(scrollDiv);
  }

}
