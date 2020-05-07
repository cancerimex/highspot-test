import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';
import { By } from '@angular/platform-browser';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading text', () => {
    const compiled = fixture.debugElement.nativeElement;
    const loadingElement = fixture.debugElement.query(By.css('.loader-container'));
    expect(loadingElement).not.toBeNull();
    expect(compiled.querySelector('p').textContent).toContain('Loading');
  });

  it('should have the class of blue when set', () => {
    component.color = 'blue';
    fixture.detectChanges();
    const loadingElement = fixture.debugElement.query(By.css('.blue'));
    expect(loadingElement).not.toBeNull();
  });
});
