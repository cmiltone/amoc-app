import { AmocAppPage } from './app.po';

describe('amoc-app App', () => {
  let page: AmocAppPage;

  beforeEach(() => {
    page = new AmocAppPage();
  });

  it('should display message saying Ampath Meal Ordering App', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Ampath Meal Ordering App');
  });
});
