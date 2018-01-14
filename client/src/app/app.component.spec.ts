import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
  it('should create the app', async(() => {
    const app = new AppComponent();
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const app = new AppComponent();
    expect(app.title).toEqual('app');
  }));
});
