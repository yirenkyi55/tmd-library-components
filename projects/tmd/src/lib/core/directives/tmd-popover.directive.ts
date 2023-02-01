import {
    Directive,
    OnDestroy,
    Input,
    ElementRef,
    HostListener,
    TemplateRef,
    ViewContainerRef,
    OnInit
} from '@angular/core';

import { Overlay, OverlayRef, ConnectedPosition } from '@angular/cdk/overlay';
import { TmdPopoverService } from '../services/tmd-component.service';
import { TemplatePortal } from '@angular/cdk/portal';


@Directive({
    selector: '[tmdPopover]',
})
export class TmdPopoverDirective implements OnInit, OnDestroy {
    @Input() tmdPopover!: TemplateRef<object>;
    @Input() closeOnClickOutSide: boolean = false;
    @Input() backdropClass: string = '';
    @Input() showOnHover: boolean = false;
    @Input() position: 'top' | 'bottom' | 'left' | 'right' = 'bottom';


    private overlayRef!: OverlayRef;


    get overLayIsAttached() {
        return this.overlayRef.hasAttached();
    }

    constructor(
        private elementRef: ElementRef,
        private overlay: Overlay,
        private viewContainerRef: ViewContainerRef,
        private popOverService: TmdPopoverService) {

    }

    @HostListener("click")
    hostClicked() {
        if (!this.showOnHover) {
            if (!this.overLayIsAttached) {
                this.attachOverlayRef();
            } else {
                this.detachOverlayRef();
            }
        }
    }

    ngOnInit(): void {
        this.createOverlay();
        this.removeOverlayOnBackdropClick();
        this.popOverService.getPopoverState().subscribe(state => {
            if (state) {
                this.detachOverlayRef();
            }
        })

        this.attachHoverEvents();
    }

    private removeOverlayOnBackdropClick() {
        this.overlayRef.backdropClick()
            .subscribe(() => {
                if (this.closeOnClickOutSide) {
                    this.detachOverlayRef();
                }
            });
    }

    private attachHoverEvents() {
        if (this.showOnHover) {
            this.elementRef.nativeElement.addEventListener('mouseenter', () => {
                if (!this.overLayIsAttached) {
                    console.log('mouseenter');
                    this.attachOverlayRef();
                }

            });

            this.elementRef.nativeElement.addEventListener('mouseleave', () => {
                if (this.overLayIsAttached) {
                    this.detachOverlayRef();
                }
            });
        }
    }

    createOverlay(): void {
        const scrollStrategy = this.overlay.scrollStrategies.reposition();
        const positionStrategy = this.getPositionStrategy();

        this.overlayRef = this.overlay.create({
            positionStrategy,
            scrollStrategy,
            hasBackdrop: !this.showOnHover,
            backdropClass: ''
        });
    }


    private getPositionStrategy() {
        return this.overlay.position()
            .flexibleConnectedTo(this.elementRef)
            .withPositions(this.popOverPositions[this.position]).withPush(false);
    }

    private get popOverPositions() {
        return {
            'right': this.positionRight(),
            'left': this.positionLeft(),
            'top': this.positionTop(),
            'bottom': this.positionBottom()
        }
    }

    private positionBottom(): ConnectedPosition[] {
        return [{
            originX: 'center',
            originY: 'bottom',
            overlayX: 'center',
            overlayY: 'top'
        }];
    }

    private positionTop(): ConnectedPosition[] {
        return [{
            originX: 'center',
            originY: 'top',
            overlayX: 'center',
            overlayY: 'bottom'
        }];
    }

    private positionLeft(): ConnectedPosition[] {
        return [
            {
                originX: 'start',
                originY: 'center',
                overlayX: 'end',
                overlayY: 'center'
            }
        ];
    }

    private positionRight(): ConnectedPosition[] {
        return [
            {
                originX: 'end',
                originY: 'center',
                overlayX: 'start',
                overlayY: 'center'
            }
        ];
    }

    attachOverlayRef(): void {
        if (!this.overLayIsAttached) {
            this.overlayRef.attach(new TemplatePortal(this.tmdPopover, this.viewContainerRef));
        }
    }

    detachOverlayRef(): void {
        if (this.overLayIsAttached) {
            this.overlayRef.detach();
        }
    }

    ngOnDestroy() {
        this.detachOverlayRef();
        this.overlayRef.dispose();
    }

}
