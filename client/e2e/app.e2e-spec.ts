import { AppPage } from './app.po';

describe('client App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message as "Realtime Sports Polling"', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Realtime Sports Polling');
  });
});
