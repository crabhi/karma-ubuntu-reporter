# karma-ubuntu-reporter

> Reporter using Ubuntu notifications.

Based on karma-osx-notifier.

Only works with **Karma 0.9 or later** which enables custom plugins.

For more information on Karma see the [homepage].


## Installation

1. Install Karma and karma-ubuntu-reporter plugin. The plugin requires Karma 0.9+, but Karma's stable version is now 0.10 so it's pretty easy.

  a. Globally. System-wide with `karma` available on command line.

    ```
    npm install -g karma
    npm install -g karma-ubuntu-reporter
    ```

  b. Locally. If you want to install Karma to your project instead, add the dependencies to `package.json` and run `npm install`:

    ```js
    "devDependencies": {
      "karma": ">=0.9",
      "karma-ubuntu-notifier": "*"
    }
    ```

    If you install locally, you'll need to run Karma using `node_modules/.bin/karma`.

  In any case, the plugin needs to be installed as a peer dependency to Karma (i.e. in the sibling folder). This just means you cannot use global Karma with local plugins or vice-versa.


2. Add dependency to the plugin section in Karma config file (syntax shown for Karma 0.9.3+):

  ```js
    karma.configure({
      ...
      plugins: [
        'karma-ubuntu-reporter'
      ],
      ...
    })
  ```

3. Define it as a reporter in the config file

  ```js
  reporters: ['ubuntu']
  ```

  or pass through the command line

  ```sh
  $ karma start --reporters=ubuntu karma.conf.js
  ```


## License

MIT License

[homepage]: http://karma-runner.github.io
