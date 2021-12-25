let latitude = document.querySelector("#latitude");
let longitude = document.querySelector("#longitude");
let month = document.querySelector("#month");
let year = document.querySelector("#year");
let getTimes = document.querySelector("#getTimes");
let timingTable = document.querySelector("table tbody");

getTimes.addEventListener("click", function () {
  if (
    latitude.value == "" ||
    longitude.value == "" ||
    month.value == "" ||
    year.value == ""
  ) {
    alert("Please fill all inputs.");
    return;
  }
  
  let request = new XMLHttpRequest();
  request.onload = function () {
    let response = JSON.parse(request.responseText);
    if (response.code != 200) {
      alert("Someting went wrong. Please try again.");
      return;
    }

    timingTable.innerHTML = "";

    for (const day of response.data) {
      let tr = document.createElement("tr");

      let dateTd = document.createElement("td");
      dateTd.innerText = day.date.readable;

      let midnightTd = document.createElement("td");
      midnightTd.innerText = day.timings.Midnight.slice(0, 5);

      let imsakTd = document.createElement("td");
      imsakTd.innerText = day.timings.Imsak.slice(0, 5);

      let fajrTd = document.createElement("td");
      fajrTd.innerText = day.timings.Fajr.slice(0, 5);

      let sunriseTd = document.createElement("td");
      sunriseTd.innerText = day.timings.Sunrise.slice(0, 5);

      let duhrTd = document.createElement("td");
      duhrTd.innerText = day.timings.Dhuhr.slice(0, 5);

      let asrTd = document.createElement("td");
      asrTd.innerText = day.timings.Asr.slice(0, 5);

      let maghribTd = document.createElement("td");
      maghribTd.innerText = day.timings.Maghrib.slice(0, 5);

      let sunsetTd = document.createElement("td");
      sunsetTd.innerText = day.timings.Sunset.slice(0, 5);

      let ishaTd = document.createElement("td");
      ishaTd.innerText = day.timings.Isha.slice(0, 5);

      tr.append(
        dateTd,
        midnightTd,
        imsakTd,
        fajrTd,
        sunriseTd,
        duhrTd,
        asrTd,
        maghribTd,
        sunsetTd,
        ishaTd
      );
      timingTable.append(tr);
    }
  };
  request.open(
    "get",
    `http://api.aladhan.com/v1/calendar?latitude=${latitude.value}&longitude=${longitude.value}&method=2&month=${month.value}&year=${year.value}`
  );
  request.send();
});
