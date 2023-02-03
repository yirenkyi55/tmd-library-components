//Credits: https://mentormate.com/blog/create-modal-window-with-angular-cdk/
// https://stackblitz.com/edit/angular-cdk-modals
import { ComponentType, Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { Injectable, Injector } from "@angular/core";
import { DEFAULT_CONFIG, FormModalConfig, FormModalOverlayRef } from "../../models";

@Injectable({
    providedIn: 'root'
})
export class TmdModalService {
    dialogRef!: FormModalOverlayRef;
    constructor(private injector: Injector, private overlay: Overlay) { }

    open<T>(component: ComponentType<T>, config: FormModalConfig = {}) {
        //Returns an overlayRef (which is a portalHost)
        const modalConfig = { ...DEFAULT_CONFIG, ...config };
        const overlayRef = this.createOverlay(modalConfig);
        const dialogRef = new FormModalOverlayRef(overlayRef);
        this.dialogRef = dialogRef;

        this.attachModalContainer(overlayRef, dialogRef, component);
        return dialogRef;
    }

    private attachModalContainer<T>(
        overlayRef: OverlayRef,
        dialogRef: FormModalOverlayRef,
        component: ComponentType<T>) {

        const injector = this.createInjector(dialogRef);
        const containerPortal = new ComponentPortal(component, null, injector);
        const containerRef = overlayRef.attach(containerPortal);
        return containerRef.instance;
    }

    private createInjector(dialogRef: FormModalOverlayRef) {
        const injectionTokens = new WeakMap();
        injectionTokens.set(FormModalOverlayRef, dialogRef);
        return Injector.create({ providers: [{ provide: FormModalOverlayRef, useValue: dialogRef }] })
    }

    private createOverlay(config: FormModalConfig) {
        const overlayConfig = this.getConfigForOverlay(config);
        return this.overlay.create(overlayConfig);
    }

    private getConfigForOverlay(config: FormModalConfig): OverlayConfig {
        const positionStrategy = this.overlay.position().global()
            .centerHorizontally().centerVertically();

        return new OverlayConfig({
            hasBackdrop: config.hasBackdrop,
            backdropClass: config.backdropClass,
            panelClass: config.panelClass,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy
        })
    }
}