import { Injectable, signal } from '@angular/core';

@Injectable({providedIn: 'root'})
export class MenuService {
    
    isMenuOpen = signal(false);

    changeMenu(){
        this.isMenuOpen.set(!this.isMenuOpen());
    }
    
}