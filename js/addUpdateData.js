const applyButton = document.getElementById("apply-btn");

applyButton.addEventListener("click", () => {
  const url = document.getElementById("url").value.trim();

  let currentBase = "";
  let key = "";

  //checking if URL exist
  if (!isValidUrl(url)) {
    alert("Invalid url");
    return;
  }

  // Add new base key
  if (currentPage === "add" && newBaseKey.value) {
    currentBase = newBaseKey.value.trim();
  } else {
    currentBase = baseSelect.value.trim();
  }

  const vol = document.getElementById("volume").value.trim();
  const volume = vol ? parseFloat(vol) : null;
  const suffix =
    Object.keys(jsonData[currentType]).filter((k) => k.startsWith(currentBase))
      .length + 1;
  if (currentPage === "add") {
    key = `${currentBase}-${String(suffix).padStart(2, "0")}`;
  } else if (currentPage === "edit") {
    key = entrySelect.value;
  }

  jsonData[currentType][key].url = url;

  if (currentType === "videos") {
    jsonData[currentType][key].volume = volume !== null ? volume : null;
  }

  if (currentPage === "add") {
    jsonData[currentType][key].timestamp = new Date().toISOString();
  }

  const sortedJsonData = Object.fromEntries(
    Object.entries(jsonData[currentType]).sort(([keyA], [keyB]) =>
      keyA.localeCompare(keyB)
    )
  );

  renderJSON(sortedJsonData);
  populateBaseKey();
});

function renderJSON(data) {
  const output = document.getElementById("json-output");
  if (output) output.textContent = JSON.stringify(data, null, 2);
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
