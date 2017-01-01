import { FBTemplatePage } from './app.po';

describe('fbtemplate App', function() {
  let page: FBTemplatePage;

  beforeEach(() => {
    page = new FBTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
