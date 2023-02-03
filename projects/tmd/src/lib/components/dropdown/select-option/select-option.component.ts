import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { TmdDropDownService } from '../../../core/services/dropdown/tmd-dropdown.service';
import { SelectComponent } from '../select/select.component';

@Component({
  selector: 'tmd-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.css']
})
export class SelectOptionComponent {
  @Input() key: string = '';
  @Input() value: string = '';

  @HostBinding('class.selected')
  public get selected(): boolean {
    return this.select.selectedOption === this;
  }

  @HostBinding('class.active')
  public active = false;

  private select: SelectComponent;

  constructor(private dropdownService: TmdDropDownService) {
    this.select = this.dropdownService.getSelect();
    console.log(this.select);
  }

  public getLabel(): string {
    return this.value;
  }

  public setActiveStyles(): void {
    this.active = true;
  }

  public setInactiveStyles(): void {
    this.active = false;
  }

  @HostListener('click', ['$event'])
  public onClick(event: UIEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.select.selectOption(this);
  }
}
