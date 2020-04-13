import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSpeedyWordsComponent } from './game-speedy-words.component';

describe('GameSpeedyWordsComponent', () => {
  let component: GameSpeedyWordsComponent;
  let fixture: ComponentFixture<GameSpeedyWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameSpeedyWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSpeedyWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
