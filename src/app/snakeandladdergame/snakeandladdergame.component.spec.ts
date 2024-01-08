import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeAndLadderGameComponent } from './snakeandladdergame.component';

describe('SnakeandladdergameComponent', () => {
  let component: SnakeAndLadderGameComponent;
  let fixture: ComponentFixture<SnakeAndLadderGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnakeAndLadderGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SnakeAndLadderGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
