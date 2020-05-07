import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CardService } from './card.service';
import { CardResponse } from '../models/card';

describe('CardService', () => {
  let service: CardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(CardService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a card from the API via GET', () => {
    const dummyResponse: CardResponse = {
      cards: [
        {
          name: 'Raise Dead',
          rarity: 'Legendary',
          type: 'Action',
          cost: 2,
          set: {
            id: 'cs',
            name: 'Core Set',
            _self: 'https://api.elderscrollslegends.io/v1/sets/cs'
          },
          collectible: false,
          text: 'Summon a random creature from each discard pile.',
          attributes: [
            'Endurance'
          ],
          unique: false,
          imageUrl: 'https://images.elderscrollslegends.io/cs/raise_dead.png',
          id: 'ce7be2e72d6b06a52e50bed01952801ca4ecfade'
        }
      ],
      _links: {
        next: 'https://api.elderscrollslegends.io/v1/cards?page=2&pageSize=2'
      },
      _pageSize: 2,
      _totalCount: 1212
    };

    service.getCardList().subscribe(res => {
      expect(res.cards.length).toBe(1);
      expect(res).toEqual(dummyResponse);
    });

    const request = httpMock.expectOne(`https://api.elderscrollslegends.io/v1/cards?page=1&pageSize=20`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyResponse);
  });
});
