const applyButton = document.getElementById("apply-btn");
const deleteButton = document.getElementById("delete-btn");

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

  if (currentType === "pictures") {
    jsonData.pictures[key] = { url };
  } else if (currentType === "videos") {
    jsonData.videos[key] = volume !== null ? { url, volume } : { url };
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

deleteButton.addEventListener("click", () => {
  const key = entrySelect.value;

  if (!currentType || !key) return;

  const confirmed = confirm(`Are you sure you want to delete "${key}"?`);
  if (!confirmed) return;

  const base = key.split("-")[0];

  // Delete the selected key
  delete jsonData[currentType][key];

  // Check if base has any other keys left
  const remainingBaseKeys = Object.keys(jsonData[currentType]).filter((k) =>
    k.startsWith(base + "-")
  );

  if (remainingBaseKeys.length === 0) {
    // No more entries under this base – clean up
    // Optionally remove the base from base-key dropdown manually later
    console.log(`Base "${base}" is now empty. Removing all references.`);

    // Nothing else to do — base is gone
  } else {
    // Renumber remaining entries under the base
    renumberBaseEntries(base, currentType);
  }

  // Now you can call your own UI refresh logic
  // Example: refreshDropdowns(); setPreview();
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

function renumberBaseEntries(base, type) {
  const entries = Object.keys(jsonData[type]).filter((k) =>
    k.startsWith(base + "-")
  );

  if (entries.length === 0) {
    // No more entries for this base — cleanly done
    return;
  }

  const newData = {};

  entries.forEach((oldKey, i) => {
    const newKey = `${base}-${String(i + 1).padStart(2, "0")}`;
    newData[newKey] = jsonData[type][oldKey];
  });

  // Remove all old base entries
  Object.keys(jsonData[type]).forEach((k) => {
    if (k.startsWith(base + "-")) delete jsonData[type][k];
  });

  // Add renumbered ones
  Object.assign(jsonData[type], newData);
}
