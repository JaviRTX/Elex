import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoGestionComponent } from './documento-gestion.component';

describe('DocumentoGestionComponent', () => {
  let component: DocumentoGestionComponent;
  let fixture: ComponentFixture<DocumentoGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentoGestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentoGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
