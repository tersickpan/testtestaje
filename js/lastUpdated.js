const latestPicName = document.getElementById("latestPicName");
const latestVidName = document.getElementById("latestVidName");
const latestPic = document.getElementById("lastUpdatedImage");
const latestVid = document.getElementById("lastUpdatedVideo");

function getLatestMedia() {
  getLatestMediaLink(latestPicName, latestPic, "pictures");
  getLatestMediaLink(latestVidName, latestVid, "videos");
}

function getLatestMediaLink(latestName, latestUrl, mediaType) {
  const obj = sortByTimestamp(jsonData[mediaType], "desc");

  latestName.innerHTML = Object.keys(obj)[0];
  latestUrl.src = Object.values(obj)[0].url;

  return;
}
