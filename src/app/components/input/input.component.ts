import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputType } from '../../model/index.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input() type: InputType;
  @Input() name: string;
  @Input() label: string;
  @Input() placeholder: string = '';
  @Input() form: FormGroup;
  @Input() required: boolean = false;
  @Input() valueField: string;
  @Input() labelField: string;
  __option: any[] = [];
  @Input('options') set _option(v: any[]) {
    this.__option = this.formatOption(v);
  }
  showPassword: boolean = false;
  @Output() mchange: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  /**
   * format options for select input e.g map value and label from options
   * @param options array of options
   * @returns
   */
  formatOption = (options: any[]) => {
    let format = options.map((r, i) => {
      let value;
      let label;
      if (this.valueField) value = r[this.valueField];
      if (this.labelField) label = r[this.labelField];

      if (this.valueField && label)
        return {
          value: value,
          label: label,
        };
      else
        return {
          value: options[i],
          label: options[i],
        };
    });
    return format;
  };

  /**
   * input change event listener
   * emit value to the parent component
   * @param event on change event
   * @returns
   */
  inputChange(event: any) {
    if (this.type == 'select') {
      this.mchange.emit(event.value);
    } else this.mchange.emit(event.target.value);
  }

  onFocus() {
    document.getElementById('input')?.classList.add('active');
  }

  onFocusOut() {
    document.getElementById('input')?.classList.remove('active');
  }
}
