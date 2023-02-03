import {
    Directive,
    OnDestroy,
    Input,
    ElementRef,
    HostListener,
    TemplateRef,
    ViewContainerRef,
    OnInit,
    Renderer2
} from '@angular/core';

import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TmdPopoverService } from '../services/tmd-popover.service';
import { TemplatePortal } from '@angular/cdk/portal';
import { TmdPopOverPositions } from '../models/popover.model';


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
        private popOverService: TmdPopoverService,
        private renderer2: Renderer2) {

    }

    @HostListener("click")
    hostClicked() {
        if (!this.showOnHover) {
            if (!this.overLayIsAttached) {
                this.attachPopover();
            } else {
                this.detachPopover();
            }
        }
    }

    ngOnInit(): void {
        this.createOverlay();
        this.removeOverlayOnBackdropClick();
        this.popOverService.getPopoverState().subscribe(state => {
            if (state) {
                this.detachPopover();
            }
        })

        this.attachHoverEvents();
    }

    private removeOverlayOnBackdropClick() {
        this.overlayRef.backdropClick()
            .subscribe(() => {
                if (this.closeOnClickOutSide) {
                    this.detachPopover();
                }
            });
    }

    private attachHoverEvents() {
        if (this.showOnHover) {
            this.renderer2.listen(this.elementRef.nativeElement, 'mouseenter', () => this.attachPopover());
            this.renderer2.listen(this.elementRef.nativeElement, 'mouseleave', () => this.detachPopover());
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
            .withPositions(TmdPopOverPositions.popOverPositions[this.position]);
    }


    attachPopover(): void {
        if (!this.overLayIsAttached) {
            this.overlayRef.attach(new TemplatePortal(this.tmdPopover, this.viewContainerRef));
        }
    }

    detachPopover(): void {
        if (this.overLayIsAttached) {
            this.overlayRef.detach();
        }
    }

    ngOnDestroy() {
        this.detachPopover();
        this.overlayRef.dispose();
    }
}
