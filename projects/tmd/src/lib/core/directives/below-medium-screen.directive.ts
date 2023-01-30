import {
    Directive,
    Input,
    TemplateRef,
    ViewContainerRef,
    OnDestroy,
  } from '@angular/core';
  import { Subscription } from 'rxjs';
import { ScreenService } from '../services/tmd-screen.service';

  
  @Directive({
    selector: '[belowMediumScreen]',
  })
  export class BelowMediumScreen implements OnDestroy {
    private viewAlreadyEmbedded = false;
    screenSubscription: Subscription;
  
    constructor(
      private containerRef: ViewContainerRef,
      private templateRef: TemplateRef<Object>,
      private screenService: ScreenService
    ) {
      this.screenSubscription = screenService.resize$.subscribe(() =>
        this.onResize()
      );
    }
  
    @Input()
    set belowMediumScreen(input: boolean) {
      //ignore the passed input and set it based on screen size.  
      if (!this.screenService.isMedium && !this.viewAlreadyEmbedded) {
        this.containerRef.createEmbeddedView(this.templateRef); //this creates the view in the dom
        this.viewAlreadyEmbedded = true;     
      } else if (this.screenService.isMedium && this.viewAlreadyEmbedded) {
        this.containerRef.clear(); //this removes the view from the dom.
        this.viewAlreadyEmbedded = false;        
      }
      
    }
  
    onResize(): void {
      this.belowMediumScreen = true ;//the main purpose of this is to trigger the setter.
    }
  
    ngOnDestroy(): void {
      this.screenSubscription.unsubscribe();
    }
  }
  