import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprouchComponent } from './approuch.component';

describe('ApprouchComponent', () => {
  let component: ApprouchComponent;
  let fixture: ComponentFixture<ApprouchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprouchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprouchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
