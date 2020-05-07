import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CardsComponent } from './cards.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { FilterPipe } from '../shared/filter.pipe';
import { Card } from '../models/card';

describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;
  const dummyCards: Card[] = [
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
    },
    {
      name: 'Reachman Shaman',
      rarity: 'Common',
      type: 'Creature',
      cost: 2,
      power: 2,
      health: 2,
      set: {
        id: 'cs',
        name: 'Core Set',
        _self: 'https://api.elderscrollslegends.io/v1/sets/cs'
      },
      collectible: true,
      text: 'At the start of your turn, give another random friendly creature +1/+1.',
      attributes: [
        'Neutral'
      ],
      unique: false,
      imageUrl: 'https://images.elderscrollslegends.io/cs/reachman_shaman.png',
      id: '15d9c10821d4033fb045ed2cb4599ac76288ac67'
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CardsComponent,
        CardDetailsComponent,
        LoaderComponent,
        FilterPipe
      ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have the DOM element if loading is set to true', () => {
    const loadingElement = fixture.debugElement.query(By.css('.container'));
    expect(loadingElement).toBeNull();
  });

  it('should have the DOM element if loading is complete and card data is present', async(() => {
    component.loading = false;
    component.cards = dummyCards;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const loadingElement = fixture.debugElement.query(By.css('.loading'));
      expect(loadingElement).toBeNull();
      const containerElement = fixture.debugElement.query(By.css('.container'));
      expect(containerElement).not.toBeNull();
    });
  }));

  it('should have a search input', () => {
    fixture.detectChanges();
    const inputElement = fixture.nativeElement.querySelectorAll('input');
    expect(inputElement).not.toBeNull();
  });

  it('should display card data', async(() => {
    component.loading = false;
    component.cards = dummyCards;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.cards.length).toBe(2);
      const cards = fixture.nativeElement.querySelectorAll('app-card-details');
      expect(cards).toBeTruthy();
      expect(cards.length).toBe(2);
    });
  }));

  it('should filter card data', async(() => {
    component.loading = false;
    component.cards = dummyCards;
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('input');
    el.value = 'Dead';
    el.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.search).toBe('Dead');
      fixture.detectChanges();
      expect(component.cards.length).toBe(2);
      const cards = fixture.nativeElement.querySelectorAll('app-card-details');
      expect(cards).toBeTruthy();
      expect(cards.length).toBe(1);
    });
  }));
});
