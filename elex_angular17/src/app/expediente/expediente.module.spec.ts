import { ExpedienteModule } from './expediente.module';

describe('ExpedienteModule', () => {
  const module: ExpedienteModule = new ExpedienteModule();

  it('should create', () => {
    expect(module).toBeTruthy();
  });
});
