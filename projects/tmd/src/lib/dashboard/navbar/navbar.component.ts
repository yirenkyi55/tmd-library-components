import { Component, EventEmitter, Output } from '@angular/core';
import { TmdConfigService, TmdSideBarStatus } from '../../core';

@Component({
  selector: 'tmd-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {


  constructor(public tmdConfigService: TmdConfigService) {
  }



}
