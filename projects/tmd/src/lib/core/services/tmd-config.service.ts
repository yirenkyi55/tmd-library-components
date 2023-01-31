import { Injectable } from '@angular/core';
import { TmdThemeStyle, TmdThemeConfig, TmdStyleConfig, TmdSideBarStatus } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TmdConfigService {
  currentTheme: TmdThemeStyle = TmdThemeStyle.Blue;
  styleConfig: TmdThemeConfig = TmdStyleConfig;
  sidebarIsOpened: boolean = false;

  toggleSidebar(): void {
    this.sidebarIsOpened = !this.sidebarIsOpened;
  }

  mediumScreenBreakpoint = 768;

  constructor() { }
}
