import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourneyNavBarComponent } from './tourney-nav-bar.component';

describe('TourneyNavBarComponent', () => {
  let component: TourneyNavBarComponent;
  let fixture: ComponentFixture<TourneyNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourneyNavBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourneyNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
