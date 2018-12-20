import { browser, by, element } from 'protractor';

export class AppPage {
  navigateToGoogle() {
    return browser.get('https://accounts.google.com/ServiceLogin/identifier?service=mail&passive=true&rm=false&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ss=1&scc=1&ltmpl=default&ltmplcache=2&emr=1&osid=1&flowName=GlifWebSignIn&flowEntry=AddSession');
  }
  navigateToEmployee() {
    return browser.get('/employee')
  }

  getParagraphText() {
    return element(by.css('app-elogin span')).getText();
  }

  // sendEmailValue() {
  //   return element(by.id('inputUser'));
  // }

  // sendPasswordValue() {
  //   return element(by.id('inputPassword'));
  // }

  // clickLoginButton() {
  //   return element(by.id('emplogin'));
  // }
  // returnNavigation() {
  //   return element(by.)
  // }

  returnLoginSuccess() {
    return element(by.id('toast-container')).getText();
  }
  
}
