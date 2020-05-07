import { Component, OnInit, Input } from '@angular/core';

/**
 * Loader Component
 */
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  /** Choose the color of the loading text */
  @Input() color: string;
  /** What text to display */
  @Input() text: string;
  /** How long until you updated the text */
  @Input() timeout: number;
  /** Update it with this text when timeout expires */
  @Input() timeoutText: string;
  /** Loader Height */
  @Input() height = '400px';

  /**
   * Create an instance of LoaderComponent
   */
  constructor() {}

  /**
   * On Init set the color, text, timeout and timeoutText
   */
  ngOnInit(): void {
    this.color = (this.color) ? this.color : 'white';
    this.text = (this.text && this.text !== '') ? this.text : 'Loading';

    // When the timeout expires it will update the text to the timeoutText
    if (this.timeout && this.timeoutText) {
      setTimeout(() => {
        this.text = this.timeoutText;
      }, this.timeout);
    }
  }
}
