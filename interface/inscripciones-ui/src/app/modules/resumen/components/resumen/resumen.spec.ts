import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenComponent } from './resumen-component';

describe('Resumen', () => {
  let component: ResumenComponent;
  let fixture: ComponentFixture<ResumenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResumenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumenComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
