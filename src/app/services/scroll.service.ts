import { Injectable } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Subject, Observable, interval } from 'rxjs';
import { Position } from '../models/scroll';
import { throttle, map, pairwise, filter } from 'rxjs/operators';

/**
 * Scroll service
 */
@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  /** How far to scroll before this triggers */
  private percent = 80;
  /**  */
  private scrollSubject: Subject<Document> = new Subject();

  /**
   * Creates an instance of ScrollService
   *
   * @param eventManager EventManager
   */
  constructor(
    private eventManager: EventManager
  ) {
    this.eventManager.addGlobalEventListener(
      'window',
      'scroll',
      this.onScroll.bind(this)
    );
  }

  /**
   * On scroll updates the Subject
   *
   * @param event Event
   */
  private onScroll = (event: UIEvent) => {
    this.scrollSubject.next(event.target as any);
  }

  /**
   * Helper to make sure they are scrolling down
   *
   * @param positions Array of positions
   */
  private isUserScrollingDown = (positions: Array<Position>) =>
    positions[0].scrollTop < positions[1].scrollTop

  /**
   * Did we reach the precent scroll
   *
   * @param position Position
   * @param percent Scrolled Down Percent
   */
  private isScrollExpectedPercent = (position: Position, percent: number) =>
    (position.scrollTop + position.clientHeight) / position.scrollHeight >
    percent / 100

  /**
   * Get scroll percent
   */
  get scrollPercent(): number {
    return this.percent;
  }

  /**
   * Set scroll percent
   *
   * @param scrollPercent Updated percent
   */
  set scrollPercent(scrollPercent: number) {
    this.percent = scrollPercent;
  }

  /**
   * Get the scrollSubject
   */
  get onScroll$(): Observable<Document> {
    return this.scrollSubject.asObservable();
  }

  /**
   * Handle the scroll event
   */
  get onScrolledDown$(): Observable<[Position, Position]> {
    return this.onScroll$
      .pipe(throttle(() => interval(500)))
      .pipe(
        map(doc => {
          return {
            scrollHeight: doc.documentElement.scrollHeight,
            scrollTop: doc.documentElement.scrollTop || doc.body.scrollTop,
            clientHeight: doc.documentElement.clientHeight
          };
        })
      )
      .pipe(pairwise())
      .pipe(
        filter(
          positions =>
            this.isUserScrollingDown(positions) &&
            this.isScrollExpectedPercent(positions[1], this.percent )
        )
      );
  }
}
