import { NgModule } from '@angular/core';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { InputComponent } from './components/input/input.component';
import { CommonModule } from '@angular/common';
import { BelowMediumScreen, MediumScreen } from './core';

@NgModule({
  declarations: [    
    SearchInputComponent,
    InputComponent,
    MediumScreen,
    BelowMediumScreen
  ],
  imports: [CommonModule],
  exports: [SearchInputComponent, MediumScreen, BelowMediumScreen],
})
export class TmdModule {}
