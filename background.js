import faker from "faker";

const minYear = 1980;
const maxYear = 2000;

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomYear = () => getRandomNumber(minYear, maxYear);
const getRandomMonth = () => getRandomNumber(1, 12);
const getRandomDay = () => getRandomNumber(1, 26);

const sendAccountCreatedRequest = (email, password) =>
  console.log(
    `Successfully created account with email ${email} and password ${password}`
  );

let sentRequest = false;
chrome.browserAction.onClicked.addListener(function(tab) {
  const email = faker.internet.email().toLowerCase();
  const password = faker.internet.password().toLowerCase();
  sentRequest = false;

  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.active && tab.url.includes("account_created") && !sentRequest) {
      sendAccountCreatedRequest(email, password);
      sentRequest = true;
    }
  });

  chrome.tabs.executeScript(null, {
    code: `(function() {
        document.querySelector("#create-email").value = '${email}';
        document.querySelector("#create-password").value = "${password}";
        document.querySelector(".m-date-entry__day-field").value = "${getRandomDay()}";
        document.querySelector(".m-date-entry__month-field").value = "${getRandomMonth()}";
        document.querySelector(".m-date-entry__year-field").value = "${getRandomYear()}";

        document.querySelector("#create-submit").click();        
    })()`
  });
});
