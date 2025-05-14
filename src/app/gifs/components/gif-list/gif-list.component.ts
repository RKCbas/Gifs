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

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv')

  onScroll( event:Event ){
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if ( !scrollDiv )return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    const isAtBottom = scrollTop+clientHeight >= scrollHeight*0.85;
    
    if(isAtBottom){
      //TODO Logic to charge more gifs
    }

  }

}
