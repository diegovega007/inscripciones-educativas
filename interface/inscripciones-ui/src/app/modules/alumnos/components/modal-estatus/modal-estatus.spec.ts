import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEstatus } from './modal-estatus';

describe('ModalEstatus', () => {
  let component: ModalEstatus;
  let fixture: ComponentFixture<ModalEstatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalEstatus],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalEstatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
