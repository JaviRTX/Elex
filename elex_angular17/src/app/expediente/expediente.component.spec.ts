import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpedienteComponent } from './expediente.component';
import { ExpedienteService } from './services/expediente.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ExpedienteComponent', () => {
  let component: ExpedienteComponent;
  let fixture: ComponentFixture<ExpedienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpedienteComponent ],
      providers: [ ExpedienteService ],
      imports: [ HttpClientTestingModule ] // Import HttpClientTestingModule if your service makes HTTP requests
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
