import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { TmdConfigService } from "./tmd-config.service";

@Injectable({
    providedIn: 'root'
})
export class ScreenService {
    private resizeSubject = new Subject<null | UIEvent>();
    resize$ = this.resizeSubject.asObservable();
    isMedium: boolean = false;

    constructor(private tmdService: TmdConfigService) {
        try {
            this.detectScreenSize();
            window.addEventListener('resize', event => this.resizeWindow(event))
        } catch (error) {
            //ignored
        }
    }

    resizeWindow(event: UIEvent) {        
        this.detectScreenSize();
        this.resizeSubject.next(event);
    }

   private detectScreenSize() {
        this.isMedium = false;      
        if (window.matchMedia(`(min-width: ${this.tmdService.mediumScreenBreakpoint}px)`).matches) {
            this.isMedium = true;
        }
    }
}