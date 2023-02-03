import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, HostListener, Input, ViewChild, ElementRef, ViewContainerRef, TemplateRef } from '@angular/core';


@Component({
  selector: 'tmd-dropdown',
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent {
  @Input() reference!: HTMLElement;

  @ViewChild('cdkportal')
  contentTemplate!: TemplateRef<any>

  protected overlayRef!: OverlayRef;
  loading = true;

  constructor(private overlay: Overlay, private viewContainerRef: ViewContainerRef) { }

  @HostListener('window:resize')
  public onWinResize() {
    this.matchTemplateWidth();
  }

  show() {
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    const portal = new TemplatePortal(this.contentTemplate, this.viewContainerRef);
    this.overlayRef.attach(portal);
    this.matchTemplateWidth();
    this.overlayRef.backdropClick().subscribe(() => this.hide());
    this.loading = false;
  }

  private getOverlayConfig() {
    const positionStrategy = this.getPositionStrategy()
    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    return new OverlayConfig({
      positionStrategy: positionStrategy,
      scrollStrategy: scrollStrategy,
      hasBackdrop: false,
    })

  }

  hide() {
    this.overlayRef.detach();
    this.loading = false;
  }

  private getPositionStrategy() {
    return this.overlay.position()
      .flexibleConnectedTo(this.reference)
      .withPush(false)
      .withPositions([{
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top'
      }, {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom'
      }]);
  }

  private matchTemplateWidth() {
    if (!this.overlayRef) return;

    const refRect = this.reference.getBoundingClientRect();
    this.overlayRef.updateSize({ width: refRect.width });
  }
}
