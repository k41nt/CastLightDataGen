/*
	This small nodejs code is used to manually log data into castlight to get points
	Change currentMonth value and run the code, you will have the fixed data added to that month 	
  If the month has more than 30 days you will have to send the POST request twice since one request can only contain data 30 days
  * Get the Cookie and X-CSRF-Token from the browser (perform log manually - manual entry request)
 */

const axios = require("axios");

var endDate = new Date("2022/12/31");
var daysOfYear = [];
let manualEntries = [];
let currentMonth = 3;
let CSRFToken = "VfvLMx9dM2GOlTTUuair8RGHqdvXX7P2k4BLRl6Lyqg=";
let cookie =
  "trusted_device_uuid=9a4107c2-a056-4059-a502-541e7f0131e1; NPS_5fd1c9c2_last_seen=1623115969553; NPS_b5cb5a87_last_seen=1623116025784; SSLB=1; bm_sz=1128EBEAD5B119ED53D4BE0F944A3FAA~YAAQVgJ9aJzKZcd6AQAAsIZ42gyQDEhSyyWv/rXx8rp7foSBphVY7sI9Vt6QQWEjjC5MvNsjrMn2KFuT+4lFrcdLZM4J6RxXsNjEso74WY4Zv9IFQBfhiIfX8gparQqhbcGEWdyvC23L0pdkRqPDu5iqs5Wg46KYTxXZHy1C1tO7+25yi/IDmPoVr04RGTGJKGsqD5P6oNaIXC0hMYuGPjziHDAexF8xOgVOW29B5NTvm6aej4tPlbFsXoFTh0puby/LaU2vrW6jy4Q/1oIodYPcfhVd1EqOyautilszkvmWcdQyXDQ05bv+4Sk=~3684145~4469554; i18n_enabled=false; known_device_uuid=4a17cdb5-7624-4e1d-94ee-724662ecc4e8; _soa_session_id=9650d167-926b-4648-98c6-e82d514fd4fa; _abck=809AAED43AD743EAAD3AD764E01CDB15~0~YAAQVgJ9aETdZcd6AQAAstu22gaedGCQ96EphX0k012uRaO3rU5Z0jtIrk9bCD83oXjamavyWVHogm/YoDtlLlT0+bPUf9BgekllBJzLptjV+LNXglqka1UVDgdTRChpHUashKQkyy9Fs3RrJIlytsFsAlneraGabZP/guErtsvbDJ7TIVmr7XCd979C4Ly7vdP1B/wCMxLFt2KYZfd4jGwJsjD/I+C2JjUxKpuUCYLnLYysDaXR1E60Vx65ZpmE45hU6p9UhBlmsqxQrnQdx829jIPyhX64ywu/sJBVIsdnIbzxDB7OSnIUSrWQiW7y+bYXvAqQQygatCzM2b4NN4vrHhB1EmZVXVk413wWhdsITi71pyX4kVIln6cVa4i+ZAHzKyRZwJFPsfhensU=~-1~-1~-1; XSRF-TOKEN=VfvLMx9dM2GOlTTUuair8RGHqdvXX7P2k4BLRl6Lyqg%3D; SSID=CADBox0AAAAAAACcyL5gugGBHJzIvmAGAAAAAAAAAAAAZKX8YACUjg; SSSC=800.G6971229846034776506.6|0.0; SESSION=MmM3YWVkNzItMmQ4Yi00OWMyLThmODYtZWEwMjRkNWE2MDZi; SSRT=76j8YAADAA; ak_bmsc=2E885A9C474E9A4718002F33F79C2B50~000000000000000000000000000000~YAAQVgJ9aPvuZcd6AQAAEefz2gxzNirWQ+lwitTBfNeyU2DS+LHHAG1g52bbiJkZE8+5nbKvEnq3j7TeGNKT14+iLWysaY+G/YIgnt2BY2YYoMpztWbeiW2o3ZneJ8wv3q/NjctCx+ujfHQ4E0Tf8drBTJquff3ZlZVGgKdzbLl2LiOxKtXd0vK7YFbeTJUzK6TIHexl8NH3MDfkIiJdbHRQALfTsE0jVgyN4aWY16tO3bcZVHJaVYc40esBnA8yvx4zYjUerCPm1Qd5mSi5KeQcYsT+4var3tYEjXZ+qVbKYECcg7QJjFqOCSjhELHr6x5YLhyFghN0KbvEn+ayOOMWpHZ7YVCU2cdsOhcppDKIqjLGVTf+y5vz5dCjKneFuAo7q3kc7bmPlA==; bm_sv=3C8E5970BAFFF3F544372CD895360900~Glc9YTPwloUARF0yKj8KfAwCyHzqIkHTfOJthu/EOhwroYLqzXqIicDUf6fOqfIkN8y4hgUHJLuMSqjdKpfSYOXuTEZJjBMC8G7xBFcnvI649Mip2fjEUR3r2BtmCttWTwNPL/p3S3caqJm4mH3dFo4hQ0u2ogCP6VEBTQsrMqw=";

const getMonth = (date) => {
  let dateArray = date.split("-");
  return dateArray[1];
};

const sendPostReq = (payload, cookie, token) => {
  axios
    .post(
      `https://us.castlighthealth.com/api/trackerdataintake/v1/activity/manual-entries`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": "nQIywMtnSVf0uUedAsM8YN/xoTjf2qxjBBN6Pm7s4Co=",
          "Cookie":
            "trusted_device_uuid=9a4107c2-a056-4059-a502-541e7f0131e1; NPS_5fd1c9c2_last_seen=1623115969553; NPS_b5cb5a87_last_seen=1623116025784; SSLB=1; bm_sz=1128EBEAD5B119ED53D4BE0F944A3FAA~YAAQVgJ9aJzKZcd6AQAAsIZ42gyQDEhSyyWv/rXx8rp7foSBphVY7sI9Vt6QQWEjjC5MvNsjrMn2KFuT+4lFrcdLZM4J6RxXsNjEso74WY4Zv9IFQBfhiIfX8gparQqhbcGEWdyvC23L0pdkRqPDu5iqs5Wg46KYTxXZHy1C1tO7+25yi/IDmPoVr04RGTGJKGsqD5P6oNaIXC0hMYuGPjziHDAexF8xOgVOW29B5NTvm6aej4tPlbFsXoFTh0puby/LaU2vrW6jy4Q/1oIodYPcfhVd1EqOyautilszkvmWcdQyXDQ05bv+4Sk=~3684145~4469554; i18n_enabled=false; known_device_uuid=4a17cdb5-7624-4e1d-94ee-724662ecc4e8; ak_bmsc=2E885A9C474E9A4718002F33F79C2B50~000000000000000000000000000000~YAAQVgJ9aPvuZcd6AQAAEefz2gxzNirWQ+lwitTBfNeyU2DS+LHHAG1g52bbiJkZE8+5nbKvEnq3j7TeGNKT14+iLWysaY+G/YIgnt2BY2YYoMpztWbeiW2o3ZneJ8wv3q/NjctCx+ujfHQ4E0Tf8drBTJquff3ZlZVGgKdzbLl2LiOxKtXd0vK7YFbeTJUzK6TIHexl8NH3MDfkIiJdbHRQALfTsE0jVgyN4aWY16tO3bcZVHJaVYc40esBnA8yvx4zYjUerCPm1Qd5mSi5KeQcYsT+4var3tYEjXZ+qVbKYECcg7QJjFqOCSjhELHr6x5YLhyFghN0KbvEn+ayOOMWpHZ7YVCU2cdsOhcppDKIqjLGVTf+y5vz5dCjKneFuAo7q3kc7bmPlA==; SSID=CABoIx0AAAAAAACcyL5gugGBHJzIvmAHAAAAAAAAAAAAL7H8YACUjg; SSSC=800.G6971229846034776506.7|0.0; SSRT=L7H8YAADAA; _soa_session_id=172fe383-0304-4493-8be2-0752651771cf; _abck=809AAED43AD743EAAD3AD764E01CDB15~0~YAAQL7ctF6W44Nh6AQAAzmoU2wZxaS01l0P8hiMqjKHZAXH4ApNvHVcuHq8LIIT1X9QgfFCp1pBOkbGgkViD9bHxszVcuTWr+3WPfi91PfZESUFIGzg03CACOUcvkk/InlZvO4dllnSbs/H42ozxNi2YZHxXQ7DxklBUldfxTILPaZkRwzwad0ond0uoVM0s+ZndRSkjLbbg3rqoYaWXtPI+Q2GRBupzR2WG2uFPbcdIbdgO1ZuYFrzp0j6YJa+PcRRcu5eE2Y7J2Hqlj1H7+7X8PeUu7D7nWq2DA1qpdojy/NzLGLuBwXVUFQVRzWzsYo2qJ8IALVPBnnfVaOq5q8+2INqdHh0ErUS12woBBFcmDsYEa5yJmcFTw9SEb47fo8JVgQHttg0BkO0tapg=~-1~-1~-1; XSRF-TOKEN=nQIywMtnSVf0uUedAsM8YN%2FxoTjf2qxjBBN6Pm7s4Co%3D; SESSION=ODU2NTc2YmItMjM5MC00OWU5LWJlMjMtOTNmNTIyZWFhOTlj; bm_sv=3C8E5970BAFFF3F544372CD895360900~Glc9YTPwloUARF0yKj8KfAwCyHzqIkHTfOJthu/EOhwroYLqzXqIicDUf6fOqfIkN8y4hgUHJLuMSqjdKpfSYOXuTEZJjBMC8G7xBFcnvI649Mip2fjEUR3r2BtmCttWCGXMgl4yyugouRt3hqlxOAxwGvMEZuVT4oGMMczXvPM=",
        },
      }
    )
    .then(
      (res) => {
        console.log(res.data);
      },
      (error) => {
        console.log(error);
      }
    );
};

for (let d = new Date("2022/01/01"); d <= endDate; d.setDate(d.getDate() + 1)) {
  daysOfYear.push(new Date(d).toISOString().split("T")[0]);
}
//console.log(daysOfYear)

for (let i = 0; i < daysOfYear.length; i++) {
  if (getMonth(daysOfYear[i]) == currentMonth) {
    manualEntries.push({
      date: daysOfYear[i],
      steps: 15000,
      sleepInSeconds: 17000,
      caloriesConsumed: 2000,
      manual_steps: { steps: 15000 },
      manual_sleep: { sleepInSeconds: 17000 },
      manual_nutrition: { caloriesConsumed: 2000 },
    });
  }
}

let currentMonthData = manualEntries;

// because it only allows max of 30 entries per req so we have to do it twice for months that have 31 days
if (manualEntries.length < 31) {
	let payload = { manualEntries: manualEntries };
	console.log(JSON.stringify(payload))
	// sendPostReq(payload, cookie, CSRFToken);
} else {
	let chunk1 = manualEntries.splice(30,31);
	let chunk2 = manualEntries;
	let payload1 = { manualEntries: chunk1};
	let payload2 = { manualEntries: chunk2}
	console.log(JSON.stringify(payload1))
	console.log(`\n \n \n${JSON.stringify(payload2)}`)
  // sendPostReq(payload1, cookie, CSRFToken);
  // sendPostReq(payload2, cookie, CSRFToken);
}

// axios
// .post(
//   `https://us.castlighthealth.com/api/trackerdataintake/v1/activity/manual-entries`,
//   payload,
//   {
// 	headers: {
// 	  "Content-Type": "application/json",
// 	  "X-CSRF-Token": "VfvLMx9dM2GOlTTUuair8RGHqdvXX7P2k4BLRl6Lyqg=",
// 	  "Cookie": "trusted_device_uuid=9a4107c2-a056-4059-a502-541e7f0131e1; NPS_5fd1c9c2_last_seen=1623115969553; NPS_b5cb5a87_last_seen=1623116025784; SSLB=1; bm_sz=1128EBEAD5B119ED53D4BE0F944A3FAA~YAAQVgJ9aJzKZcd6AQAAsIZ42gyQDEhSyyWv/rXx8rp7foSBphVY7sI9Vt6QQWEjjC5MvNsjrMn2KFuT+4lFrcdLZM4J6RxXsNjEso74WY4Zv9IFQBfhiIfX8gparQqhbcGEWdyvC23L0pdkRqPDu5iqs5Wg46KYTxXZHy1C1tO7+25yi/IDmPoVr04RGTGJKGsqD5P6oNaIXC0hMYuGPjziHDAexF8xOgVOW29B5NTvm6aej4tPlbFsXoFTh0puby/LaU2vrW6jy4Q/1oIodYPcfhVd1EqOyautilszkvmWcdQyXDQ05bv+4Sk=~3684145~4469554; i18n_enabled=false; known_device_uuid=4a17cdb5-7624-4e1d-94ee-724662ecc4e8; _soa_session_id=9650d167-926b-4648-98c6-e82d514fd4fa; _abck=809AAED43AD743EAAD3AD764E01CDB15~0~YAAQVgJ9aETdZcd6AQAAstu22gaedGCQ96EphX0k012uRaO3rU5Z0jtIrk9bCD83oXjamavyWVHogm/YoDtlLlT0+bPUf9BgekllBJzLptjV+LNXglqka1UVDgdTRChpHUashKQkyy9Fs3RrJIlytsFsAlneraGabZP/guErtsvbDJ7TIVmr7XCd979C4Ly7vdP1B/wCMxLFt2KYZfd4jGwJsjD/I+C2JjUxKpuUCYLnLYysDaXR1E60Vx65ZpmE45hU6p9UhBlmsqxQrnQdx829jIPyhX64ywu/sJBVIsdnIbzxDB7OSnIUSrWQiW7y+bYXvAqQQygatCzM2b4NN4vrHhB1EmZVXVk413wWhdsITi71pyX4kVIln6cVa4i+ZAHzKyRZwJFPsfhensU=~-1~-1~-1; XSRF-TOKEN=VfvLMx9dM2GOlTTUuair8RGHqdvXX7P2k4BLRl6Lyqg%3D; SSID=CADBox0AAAAAAACcyL5gugGBHJzIvmAGAAAAAAAAAAAAZKX8YACUjg; SSSC=800.G6971229846034776506.6|0.0; SESSION=MmM3YWVkNzItMmQ4Yi00OWMyLThmODYtZWEwMjRkNWE2MDZi; SSRT=76j8YAADAA; ak_bmsc=2E885A9C474E9A4718002F33F79C2B50~000000000000000000000000000000~YAAQVgJ9aPvuZcd6AQAAEefz2gxzNirWQ+lwitTBfNeyU2DS+LHHAG1g52bbiJkZE8+5nbKvEnq3j7TeGNKT14+iLWysaY+G/YIgnt2BY2YYoMpztWbeiW2o3ZneJ8wv3q/NjctCx+ujfHQ4E0Tf8drBTJquff3ZlZVGgKdzbLl2LiOxKtXd0vK7YFbeTJUzK6TIHexl8NH3MDfkIiJdbHRQALfTsE0jVgyN4aWY16tO3bcZVHJaVYc40esBnA8yvx4zYjUerCPm1Qd5mSi5KeQcYsT+4var3tYEjXZ+qVbKYECcg7QJjFqOCSjhELHr6x5YLhyFghN0KbvEn+ayOOMWpHZ7YVCU2cdsOhcppDKIqjLGVTf+y5vz5dCjKneFuAo7q3kc7bmPlA==; bm_sv=3C8E5970BAFFF3F544372CD895360900~Glc9YTPwloUARF0yKj8KfAwCyHzqIkHTfOJthu/EOhwroYLqzXqIicDUf6fOqfIkN8y4hgUHJLuMSqjdKpfSYOXuTEZJjBMC8G7xBFcnvI649Mip2fjEUR3r2BtmCttWTwNPL/p3S3caqJm4mH3dFo4hQ0u2ogCP6VEBTQsrMqw="
// 	},
//   }
// )
// .then(
//   (res) => {
// 	console.log(res.data);
//   },
//   (error) => {
// 	console.log(error);
//   }
// );

// console.log(currentMonthData.splice(0,30))
// console.log(currentMonthData.splice(30,31))
// console.log(JSON.stringify(secondPayload));

// sendPostReq(payload, cookie, CSRFToken);
