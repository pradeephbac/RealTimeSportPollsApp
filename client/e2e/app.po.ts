import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  navigateToLogin() {
    return browser.get('/login');
  }

  setCredentials() {
    const password = element(by.name('password'));
    const username = element(by.name('username'));
    const submit = element(by.className('login-btn'));
    username.sendKeys('chamal');
    password.sendKeys('chamal@123');
    submit.click();
    browser.wait(browser.getCurrentUrl(), 3000);
    return browser.wait(function () {
      return browser.getCurrentUrl().then(function (url) { 
          return url = '#/dashboard';
      });
  });
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
