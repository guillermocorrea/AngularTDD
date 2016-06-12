# AngularTDD
Angular TDD examples using [Karma](https://karma-runner.github.io/) and [Protactor](https://angular.github.io/protractor/#/).

1. Install:
  
        npm install -g http-server
        npm install -g karma-cli
        npm install -g protractor
        webdriver-manager update
        npm install
        bower install

2. Run karma:

        karma start
        
- Coverage output:

        build/coverage

3. Start Selenium Server:

        webdriver-manager start

4. Run http-server:

        http-server -p 8080

5. Run Protractor:

        protractor conf.js
        
# // TODO:
       - Setup webpack
       - Setup TypeScript
       - Test directive
       - Test filter
