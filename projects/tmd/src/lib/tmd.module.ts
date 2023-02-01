import { NgModule } from '@angular/core';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { InputComponent } from './components/input/input.component';
import { CommonModule } from '@angular/common';
import { BelowMediumScreen, MediumScreen } from './core';
import { PopoverComponent } from './components/popover/popover.component';
import { TmdPopoverDirective } from './core/directives/tmd-popover.directive';

@NgModule({
  declarations: [
    SearchInputComponent,
    InputComponent,
    MediumScreen,
    BelowMediumScreen,
    PopoverComponent,
    TmdPopoverDirective
  ],
  imports: [CommonModule],
  exports: [SearchInputComponent, MediumScreen, BelowMediumScreen, TmdPopoverDirective, PopoverComponent],
})
export class TmdModule { }
