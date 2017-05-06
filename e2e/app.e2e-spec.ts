import { ModernBookmarkPage } from './app.po';

describe('modern-bookmark App', () => {
  let page: ModernBookmarkPage;

  beforeEach(() => {
    page = new ModernBookmarkPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
