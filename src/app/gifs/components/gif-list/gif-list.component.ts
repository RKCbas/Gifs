import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, input, Output, viewChild } from '@angular/core';
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

  @Output() isAtBottomChange = new EventEmitter<boolean>();

  onScroll( event:Event ){
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if ( !scrollDiv )return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    const isAtBottom = scrollTop+clientHeight + 300 >= scrollHeight;
    
    if(isAtBottom){
      this.isAtBottomChange.emit(true);
    }else{
      this.isAtBottomChange.emit(false);
    }

  }

}
