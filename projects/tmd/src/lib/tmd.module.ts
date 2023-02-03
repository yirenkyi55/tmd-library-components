import { NgModule } from '@angular/core';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { InputComponent } from './components/input/input.component';
import { CommonModule } from '@angular/common';
import { BelowMediumScreen, MediumScreen, TmdToolTipDirective } from './core';
import { PopoverComponent } from './components/popover/popover.component';
import { TmdPopoverDirective } from './core/directives/tmd-popover.directive';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { TestComponent } from './components/test/test.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { SelectComponent } from './components/dropdown/select/select.component';
import { SelectOptionComponent } from './components/dropdown/select-option/select-option.component';


const exports = [
  SearchInputComponent, MediumScreen, BelowMediumScreen,
  TmdPopoverDirective, PopoverComponent, TmdToolTipDirective, InputComponent,
  DropdownComponent,
  SelectComponent,
  SelectOptionComponent
]
@NgModule({
  declarations: [
    TooltipComponent,
    exports,
    TestComponent,
  ],
  imports: [CommonModule],
  exports: [exports],

})
export class TmdModule { }
