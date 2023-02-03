import { OverlayRef } from "@angular/cdk/overlay";

export interface FormModalConfig {
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string;
}

export const DEFAULT_CONFIG: FormModalConfig = {
    hasBackdrop: true,
    backdropClass: 'tmd-overlay-modal-backdrop',
    panelClass: 'my-modal-panel'
}

export class FormModalOverlayRef {
    constructor(private overlayRef: OverlayRef) {

    }

    close(): void {
        this.overlayRef.dispose();
    }
}