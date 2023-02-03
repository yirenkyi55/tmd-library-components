import { AfterViewInit, Component, ContentChildren, ElementRef, forwardRef, Input, QueryList, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TmdDropDownService } from '../../../core/services/dropdown/tmd-dropdown.service';
import { DropdownComponent } from '../dropdown.component';
import { SelectOptionComponent } from '../select-option/select-option.component';
import { ActiveDescendantKeyManager, Highlightable } from '@angular/cdk/a11y';
//https://stackblitz.com/edit/angular-custom-dropdown-cdk

@Component({
  selector: 'tmd-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    },]
})
export class SelectComponent implements AfterViewInit, ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() selected = '';
  @Input() required = false;
  @Input() disabled = false;

  @ViewChild('input')
  input!: ElementRef;

  @ViewChild(DropdownComponent)
  dropdown!: DropdownComponent;

  @ContentChildren(SelectOptionComponent)
  public options!: QueryList<Highlightable & SelectOptionComponent>;

  selectedOption: (Highlightable & SelectOptionComponent) | null | undefined;
  displayText: string = '';
  onChangeFn = (_: any) => { };
  onTouchedFn = () => { };
  private keyManager!: ActiveDescendantKeyManager<SelectOptionComponent>;

  constructor(private dropDownService: TmdDropDownService) {
    this.dropDownService.register(this);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.selectedOption = this.options.toArray().find(option => option.key === this.selected);
      this.displayText = this.selectedOption ? this.selectedOption.value : '';
      this.keyManager = new ActiveDescendantKeyManager(this.options)
        .withHorizontalOrientation('ltr').withVerticalOrientation().withWrap();
    })
  }

  showDropdown() {
    this.dropdown.show();

    if (!this.options.length) {
      return;
    }
    this.selected && this.selectedOption ? this.keyManager.setActiveItem(this.selectedOption) : this.keyManager.setFirstItemActive();
  }

  onDropdownMenuIconClick(event: UIEvent) {
    event.stopPropagation();
    console.log('menu item clicked');
    setTimeout(() => {
      this.input.nativeElement.focus();
      this.input.nativeElement.click();
    }, 10);
  }

  public onKeyDown(event: KeyboardEvent) {
    if (['Enter', ' ', 'ArrowDown', 'Down', 'ArrowUp', 'Up'].indexOf(event.key) > -1) {
      if (!this.dropdown.loading) {
        this.showDropdown();
        return;
      }

      if (!this.options.length) {
        event.preventDefault();
        return;
      }
    }

    if (event.key === 'Enter' || event.key === ' ') {
      this.performSelectionBasedOnEnterKey();
    } else if (event.key === 'Escape' || event.key === 'Esc') {
      this.dropdown.loading && this.hideDropdown();
    } else if (['ArrowUp', 'Up', 'ArrowDown', 'Down', 'ArrowRight', 'Right', 'ArrowLeft', 'Left']
      .indexOf(event.key) > -1) {
      this.keyManager.onKeydown(event);
    } else if (event.key === 'PageUp' || event.key === 'PageDown' || event.key === 'Tab') {
      this.dropdown.loading && event.preventDefault();
    }
  }

  private performSelectionBasedOnEnterKey() {
    this.selectedOption = this.keyManager.activeItem;
    this.selected = this.selectedOption?.key ?? '';
    this.displayText = this.selectedOption ? this.selectedOption.value : '';
    this.hideDropdown();
    this.onChange();
  }

  selectOption(option: SelectOptionComponent) {
    this.keyManager.setActiveItem(option);
    this.selected = option.key;
    this.selectedOption = option;
    this.displayText = this.selectedOption ? this.selectedOption.value : '';
    this.hideDropdown();
    this.input.nativeElement.focus();
    this.onChange();
  }

  hideDropdown() {
    this.dropdown.hide();
  }

  writeValue(obj: any): void {
    this.selected = obj;
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn();
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }


  onChange() {
    this.onChangeFn(this.selected);
  }

  public onTouched() {
    this.onTouchedFn();
  }
}
