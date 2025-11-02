import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSectionsComponent } from './select-sections-component';

describe('SelectSectionsComponent', () => {
  let component: SelectSectionsComponent;
  let fixture: ComponentFixture<SelectSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectSectionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
