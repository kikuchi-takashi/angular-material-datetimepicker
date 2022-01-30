import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  form!: FormControl;

  constructor(
    private readonly renderer: Renderer2,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.control('');
  }

  openDatepicker(): void {
    this.setForm();
  }

  closeDatepicker(): void {
    const hourElement =
      document.querySelector<HTMLInputElement>('.mat-calendar-hour');
    const minuteElement = document.querySelector<HTMLInputElement>(
      '.mat-calendar-minute'
    );
    const hour = Number(hourElement?.value);
    const minute = Number(minuteElement?.value);

    console.log(hour, minute);

    const formPlusHour = new Date((this.form.value as Date).setHours(hour));
    const formPlusHourAndMinute = new Date(formPlusHour.setMinutes(minute));

    this.form.patchValue(formPlusHourAndMinute);
  }

  private setForm() {
    const formElement: HTMLFormElement = this.renderer.createElement('form');

    const hourInputElement: HTMLButtonElement =
      this.renderer.createElement('input');
    const minuteInputElement: HTMLButtonElement =
      this.renderer.createElement('input');

    this.renderer.setAttribute(hourInputElement, 'type', 'number');
    this.renderer.setAttribute(minuteInputElement, 'type', 'number');

    this.renderer.setAttribute(hourInputElement, 'min', '0');
    this.renderer.setAttribute(minuteInputElement, 'min', '0');

    this.renderer.setAttribute(hourInputElement, 'max', '59');
    this.renderer.setAttribute(minuteInputElement, 'max', '59');

    this.renderer.setAttribute(hourInputElement, 'value', '0');
    this.renderer.setAttribute(minuteInputElement, 'value', '0');

    this.renderer.addClass(hourInputElement, 'mat-calendar-hour');
    this.renderer.addClass(minuteInputElement, 'mat-calendar-minute');

    this.renderer.appendChild(formElement, hourInputElement);
    this.renderer.appendChild(formElement, minuteInputElement);

    const element = document.querySelector('.mat-calendar');
    this.renderer.setStyle(element, 'height', 'auto');

    this.renderer.appendChild(element, formElement);
  }
}
