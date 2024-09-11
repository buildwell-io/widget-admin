import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RailNavigationComponent } from './rail-navigation.component';

describe('RailNavigationComponent', () => {
  let component: RailNavigationComponent;
  let fixture: ComponentFixture<RailNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RailNavigationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RailNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
