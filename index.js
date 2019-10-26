const {Builder, By, Key, until} = require('selenium-webdriver');
const player = require('play-sound')();
const moment = require('moment');

const url = `https://regist.ชิมช้อปใช้.com/Register/` // https://regist.ชิมช้อปใช้.com/Register/
const title = `ลงทะเบียนเข้าร่วมมาตรการ ชิมช้อปใช้`

let count = 0

// Notification method
const soundAlarm = () => {
  player.play(`./super-nyan.mp3`, (err) => {
      if (err) console.log(`Could not play sound: ${err}`);
  });
}

const now = () => {
  return moment().format(`MMMM Do YYYY, h:mm:ss a`);
}

(async function example() {
  let driver = await new Builder()
    .forBrowser(`firefox`)
    .build();
  try {
    while (true) {
      await driver.get(url);
      let closebox = await driver.findElement(By.className(`box-close`));
      await driver.wait(until.titleIs(title), 10000);
      if (!closebox) {
        break;
      }
      // make sure they clear
      await driver.executeScript(`document.title = 'dummy'`);
      await driver.executeScript(`document.body.remove()`);
      console.log(`${now()} : Register not success. (retry ${count++})`);
    }
  } finally {
    // await driver.quit();
  }

  console.log(`${now()} : Register may success. Please check. (retry ${count++})`);
  soundAlarm();
  setInterval(() => soundAlarm(), 10000)

})();