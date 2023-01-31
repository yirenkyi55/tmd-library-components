import { Component, Input } from '@angular/core';
import { TmdConfigService } from '../../core';

@Component({
  selector: 'tmd-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(public tmdConfigService: TmdConfigService) { }

}
