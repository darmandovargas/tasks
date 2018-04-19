import { TaskNodejsMongoRestApiPage } from './app.po';

describe('backend-task-nodejs-mongo-rest-api App', function() {
  let page: TaskNodejsMongoRestApiPage;

  beforeEach(() => {
    page = new TaskNodejsMongoRestApiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
