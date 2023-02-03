import { Component } from '@angular/core';
import { FormModalOverlayRef } from '../../core';

@Component({
  selector: 'tmd-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  constructor(private dialogRef: FormModalOverlayRef) {

  }
  cancel() {
    this.dialogRef.close();
  }
}
