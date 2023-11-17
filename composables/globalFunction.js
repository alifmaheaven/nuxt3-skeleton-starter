function dataURItoBlob(dataURI) {
  if (!dataURI) return;
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: mimeString });
  return blob;
}

function nextYears() {
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  console.log(
    `${nextYear.getFullYear()}/${nextYear.getMonth()}/${nextYear.getDate()}`,
  );
  return `${nextYear.getFullYear()}-${nextYear.getMonth()}-${nextYear.getDate()}`;
}

function today(value = null) {
  const today = value ? new Date(value) : new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

function tomorrow(value = null) {
  const today = value ? new Date(value) : new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const day = String(tomorrow.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}
function getFullYear(value = null) {
  const today = value ? new Date(value) : new Date();
  const year = today.getFullYear();
  return year;
}

function formatIndoDate(value = null) {
  const date = value ? new Date(value) : new Date();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

function formatIndoDateWithClock(value = null) {
  const date = value ? new Date(value) : new Date();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");
  return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
}
function formatIndoDateWithClockV2(value = null) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = value ? new Date(value) : new Date();
  const month = date.getMonth();
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");
  return `${day} ${months[month]} ${year} ${hour}:${minute}:${second}`;
}

export {
  dataURItoBlob,
  nextYears,
  today,
  tomorrow,
  getFullYear,
  formatIndoDate,
  formatIndoDateWithClock,
  formatIndoDateWithClockV2,
};

// usage
// today()
// tomorrow()
// nextYears()
// getFullYear()
// formatIndoDate()
// formatIndoDateWithClock()
// formatIndoDateWithClockV2()
// dataURItoBlob()
