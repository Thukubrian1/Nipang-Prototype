import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Profileandbilling } from './profileandbilling';

describe('Profileandbilling', () => {
  let component: Profileandbilling;
  let fixture: ComponentFixture<Profileandbilling>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Profileandbilling]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Profileandbilling);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
