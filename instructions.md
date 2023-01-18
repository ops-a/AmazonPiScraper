# Instructions for running this script

## Setup: Only to be done once

1. Make sure **npm** and **node** are installed on your machine.
2. Install node modules by running `npm install`

## Running the script

3. Start your chrome browser in debugging mode, type/copy on your terminal:
-`$ <chrome_app> --remote-debugging-port=5501`
Here, <chrome_app> is your chrome executable, it may be just **chrome** or **google-chrome**
4. Make sure you are logged in to pi.amazon.in on the opened browser.
5. Go to the page **"127.0.0.1:5501/json/version"** and copy the value of **"webSocketDebuggerUrl"**.
6. Replace the value of the **"wsEndpointUrl"** variable with the copied vlaue in the ./config/wsEndpointUrl.js file.
7. After that, run `npm start`.