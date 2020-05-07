import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/models/card';

/**
 * Card Details Component
 */
@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {

  /** Single card object */
  @Input() card: Card;

  /**
   * Create an instance of CardDetailsComponent
   */
  constructor() { }

  /**
   * On Init
   */
  ngOnInit(): void {
  }

}
