import { AmocAppPage } from './app.po';

describe('amoc-app App', () => {
  let page: AmocAppPage;

  beforeEach(() => {
    page = new AmocAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
