import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TmdPopoverService {
    private popOverState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() { }

    getPopoverState(): Observable<boolean> {
        return this.popOverState.asObservable();
    }

    close() {
        this.popOverState.next(true);
    }

    open() {
        this.popOverState.next(false);
    }
}
