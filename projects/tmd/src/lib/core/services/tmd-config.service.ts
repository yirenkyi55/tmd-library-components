import { Injectable } from '@angular/core';
import { TmdThemeStyle, TmdThemeConfig, TmdStyleConfig } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TmdConfigService {
  currentTheme: TmdThemeStyle = TmdThemeStyle.Blue;
  styleConfig: TmdThemeConfig = TmdStyleConfig;
  mediumScreenBreakpoint = 768;

  constructor() {}
}
