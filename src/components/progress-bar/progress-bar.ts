import { Component, Input } from '@angular/core';

/*
  Generated class for the ProgressBarComponent component.
*/
@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent {

  @Input('progress') progress;

  constructor() {}

}
