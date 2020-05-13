import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruComponent } from './pru.component';

describe('PruComponent', () => {
  let component: PruComponent;
  let fixture: ComponentFixture<PruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
