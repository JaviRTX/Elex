import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActuacionGestionComponent } from './actuacion-gestion.component';

describe('ActuacionGestionComponent', () => {
  let component: ActuacionGestionComponent;
  let fixture: ComponentFixture<ActuacionGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActuacionGestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActuacionGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
