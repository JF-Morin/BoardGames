import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCatanComponent } from './game-catan.component';

describe('GameCatanComponent', () => {
  let component: GameCatanComponent;
  let fixture: ComponentFixture<GameCatanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameCatanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCatanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
