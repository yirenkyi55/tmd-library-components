import { Component } from '@angular/core';
import { TestComponent } from '../../components/test/test.component';
import { TmdModalService } from '../../core/services';
import { TmdPopoverService } from '../../core/services/tmd-popover.service';

@Component({
  selector: 'tmd-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent {
  constructor(private tmdPopOverService: TmdPopoverService, private tmdModalService: TmdModalService) { }

  closeModal() {
    this.tmdPopOverService.close();
  }

  openModal() {
    this.tmdModalService.open<TestComponent>(TestComponent);
  }
}
