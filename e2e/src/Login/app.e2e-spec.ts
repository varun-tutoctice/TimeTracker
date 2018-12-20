import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('Testing Login Functionality of time-in and time-out', () => {
  let page: AppPage;
  var email = element(by.id('inputUser'));
  var password = element(by.id('inputPassword'));
  var login = element(by.id('emplogin'));


  beforeEach(() => {
    page = new AppPage();
    browser.waitForAngularEnabled(false);
  });


  // it('should find login name', () => {
  //   page.navigateToLogin();
  //   expect(page.getParagraphText()).toEqual('Login');
  // });

  // it('login fail', () => {
    
  //   page.navigateToLogin();
  //   // expect(page.getParagraphText()).toEqual('Login');
  //   email.clear();
  //   password.clear();
  //   //setTimeout(function(){ email.sendKeys('test@gmail.com');}, 5000);
  //   email.sendKeys('test@gmail.com');
  //   // browser.debugger();
  //   password.sendKeys('test');
  //   login.click();
  //   expect(page.returnLoginSuccess()).toEqual('Incorrect login credentials.');
  // });

  it('Deleting Gmail Account', () => {
    
    page.navigateToGoogle();
    element(by.id('identifierId')).sendKeys("varunkumarsworld@gmail.com");
    browser.sleep(2000);
    element(by.id('identifierNext')).click();
    browser.sleep(2000);
    element(by.className('whsOnd')).sendKeys('9490403409');
    browser.sleep(2000);
    element(by.id('passwordNext')).click();
    browser.sleep(2000);
    for (var i = 0; i < 70; i++) { 
      element(by.id(':31')).click();
      browser.sleep(3000);
      element(by.css('div[aria-label="Delete"]')).click();
      browser.sleep(9000);
  }
  });

});
  