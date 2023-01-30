import { Component } from '@angular/core';
import { TmdConfigService, TmdStyleTheme, TmdThemeStyle } from '../../core';


@Component({
  selector: 'tmd-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements TmdStyleTheme{
constructor(private tmdConfigService: TmdConfigService){}
  get styleTheme(): string {
    const { tmdInputTheme } = this.tmdConfigService.styleConfig;

    switch (this.tmdConfigService.currentTheme) {
      case TmdThemeStyle.Green:
        return tmdInputTheme.greenClass;
      default:
        return tmdInputTheme.blueClass;
    }
  }
}
