import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CardDetailsComponent } from './card-details.component';
import { Card } from 'src/app/models/card';

describe('CardDetailsComponent', () => {
  let component: CardDetailsComponent;
  let fixture: ComponentFixture<CardDetailsComponent>;
  const dummyCard: Card = {
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
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have the DOM element if card is null', () => {
    const cardElement = fixture.debugElement.query(By.css('.card'));
    expect(cardElement).toBeNull();
  });

  it('should have the DOM element if card data is present', async(() => {
    component.card = dummyCard;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const cardElement = fixture.debugElement.query(By.css('.card'));
      expect(cardElement).not.toBeNull();
    });
  }));

  it('should display card data', () => {
    component.card = dummyCard;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const name = fixture.debugElement.query(By.css('.name'));
      expect(name.nativeElement.textContent).toContain('Raise Dead');
    });
  });
});
