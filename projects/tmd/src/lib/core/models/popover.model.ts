import { ConnectedPosition } from "@angular/cdk/overlay";

export enum TmdPopoverPositions {
    Top,
    Right,
    Left,
    Bottom
}

export class TmdPopOverPositions {
    private static positionBottom(): ConnectedPosition[] {
        return [{
            originX: 'center',
            originY: 'bottom',
            overlayX: 'center',
            overlayY: 'top'
        }];
    }

    private static positionTop(): ConnectedPosition[] {
        return [{
            originX: 'center',
            originY: 'top',
            overlayX: 'center',
            overlayY: 'bottom'
        }];
    }

    private static positionLeft(): ConnectedPosition[] {
        return [
            {
                originX: 'start',
                originY: 'center',
                overlayX: 'end',
                overlayY: 'center'
            }
        ];
    }

    private static positionRight(): ConnectedPosition[] {
        return [
            {
                originX: 'end',
                originY: 'center',
                overlayX: 'start',
                overlayY: 'center'
            }
        ];
    }

    public static get popOverPositions() {
        return {
            'right': this.positionRight(),
            'left': this.positionLeft(),
            'top': this.positionTop(),
            'bottom': this.positionBottom()
        }
    }
}

