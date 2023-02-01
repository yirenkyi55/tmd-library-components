import { Component } from '@angular/core';
import { TmdPopoverService } from '../../core/services/tmd-component.service';

@Component({
  selector: 'tmd-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent {
  constructor(private tmdPopOverService: TmdPopoverService) { }

  closeModal() {
    this.tmdPopOverService.close();
  }
}
