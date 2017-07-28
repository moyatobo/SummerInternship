import { NationwideProjectPage } from './app.po';

describe('nationwide-project App', () => {
  let page: NationwideProjectPage;

  beforeEach(() => {
    page = new NationwideProjectPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
