import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamearenaComponent } from './gamearena.component';

describe('GamearenaComponent', () => {
  let component: GamearenaComponent;
  let fixture: ComponentFixture<GamearenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamearenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamearenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
