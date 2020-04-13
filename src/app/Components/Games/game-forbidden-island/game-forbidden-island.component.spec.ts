import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameForbiddenIslandComponent } from './game-forbidden-island.component';

describe('GameForbiddenIslandComponent', () => {
  let component: GameForbiddenIslandComponent;
  let fixture: ComponentFixture<GameForbiddenIslandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameForbiddenIslandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameForbiddenIslandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
