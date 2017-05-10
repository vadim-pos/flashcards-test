import { NgFlashcardsPage } from './app.po';

describe('ng-flashcards App', () => {
  let page: NgFlashcardsPage;

  beforeEach(() => {
    page = new NgFlashcardsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
