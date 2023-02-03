import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { TooltipComponent } from '../../components/tooltip/tooltip.component';
import { TmdPopOverPositions } from '../models/popover.model';



@Directive({
    selector: '[tmdTooltip]',
})
export class TmdToolTipDirective implements OnInit {
    @Input('tmdTooltip') text = '';
    private overlayRef!: OverlayRef;
    @Input() position: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

    constructor(private overlay: Overlay, private elementRef: ElementRef) { }

    ngOnInit(): void {
        this.createOverlay();
    }

    createOverlay() {
        const positionStrategy = this.overlay.position()
            .flexibleConnectedTo(this.elementRef)
            .withPositions(TmdPopOverPositions.popOverPositions[this.position]);

        this.overlayRef = this.overlay.create({
            positionStrategy,
        });
    }

    @HostListener('mouseenter')
    display() {

        const tooltipPortal = new ComponentPortal(TooltipComponent);
        const tooltipRef: ComponentRef<TooltipComponent> = this.overlayRef.attach(tooltipPortal);
        tooltipRef.instance.text = this.text;
    }

    @HostListener('mouseout')
    remove() {
        if (this.overlayRef.hasAttached()) {
            this.overlayRef.detach()
        }
    }
}
