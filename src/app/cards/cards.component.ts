import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ScrollService } from '../services/scroll.service';
import { CardService } from '../services/card.service';
import { Card, CardResponse } from '../models/card';
import { Subject, Subscription } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

/**
 * Cards Component
 */
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit, OnDestroy {

  /** Pagination */
  page = 1;
  pageSize = 20;
  /** List of cards */
  cards: Card[];
  /** Reactive Forms */
  form: FormGroup;
  /** Filter list by this string */
  search: string;
  /** Loading boolean */
  loading = true;

  /** For unsubscribing on destroy */
  private ngUnsubscribe = new Subject();
  private formSubscription: Subscription;

  /**
   * Create an instance of CardsComponent
   *
   * @param cardService CardService
   * @param scrollService ScrollService
   * @param fb FormBuilder
   */
  constructor(
    private cardService: CardService,
    private scrollService: ScrollService,
    private fb: FormBuilder
  ) { }

  /**
   * On Init set the form group, get the cards,
   * listen for search changes and handle scroll loading
   */
  ngOnInit(): void {
    this.form = this.fb.group({
      search: [''],
    });

    this.formSubscription = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe(s => this.search = s.search);

    this.getCards();

    this.scrollService.onScrolledDown$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.page++;
        this.getCards(true);
      });
  }

  /**
   * Unsubsribe on destory
   */
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();

    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }

  /**
   * Get cards list from service
   * On update it adds to the exisiting array
   *
   * @param update boolean
   */
  getCards(update = false): void {
    this.cardService.getCardList(this.page, this.pageSize).subscribe((res: CardResponse) => {
      if (update) {
        res.cards.map(x => this.cards.push(x));
      } else {
        this.cards = res.cards;
      }
      this.loading = false;
    },
    error => {
      console.error('getCards error', error);
    });
  }

}
