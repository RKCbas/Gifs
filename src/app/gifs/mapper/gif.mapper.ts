import { Gif } from "../interfaces/gif.interface";
import { GiphyItem } from "../interfaces/giphy.interfaces";

export class GifMapper{
    static mapGiphyItemToGif( item: GiphyItem): Gif{
        return {
            id: item.id,
            title: item.title,
            url: item.images.original.url
        }
    }

    static mapGiphyItemsToGifArray( items: GiphyItem[] ):Gif[]{
        return items.map( this.mapGiphyItemToGif )
    }

    static mapGiphyItemsToGifArrayOfThrees ( items:GiphyItem[] ):Gif[][]{
        
        const gifItems = items.map( this.mapGiphyItemToGif )

        const result:Gif[][] = []
        for (let i = 0; i < gifItems.length; i +=3 ) {
            result.push(gifItems.slice(i,i+3))
        }
        return result
    }
    
}
