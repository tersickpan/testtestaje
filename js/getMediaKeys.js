const newDataForm = document.getElementById("new-data-form");
const volumeSection = document.getElementById("volumeSection");

let allKeysByBase = {};

typeSelect.addEventListener("change", () => {
  currentType = typeSelect.value;

  checkDisplayForm();
  populateBaseKey();
});

newBaseKey.addEventListener("change", () => {
  baseSelect.innerHTML = "";
  entrySelect.innerHTML = "";
  document.getElementById("url").value = "";
  document.getElementById("volume").value = "";

  populateBaseKey();
});

function checkDisplayForm() {
  if (!currentType) {
    allKeysByBase = {};
    //ensure hilangkan form bawah
    newDataForm.style.display = "none";
    dataForm.style.display = "none";
    return;
  }

  newDataForm.style.display = "block";
  dataForm.style.display = "block";
  volumeSection.style.display = currentType === "videos" ? "block" : "none";
}

// Group keys by base
function populateBaseKey() {
  if (newBaseKey.value) return;

  const keys = Object.keys(jsonData[currentType]);
  const allKeysByBase = [...new Set(keys.map((k) => k.split("-")[0]))];

  baseSelect.innerHTML = allKeysByBase
    .map((k) => `<option value="${k}">${k}</option>`)
    .join("");

  const updateEntryList = () => {
    if (currentPage === "add") return;

    const base = baseSelect.value;
    const options = keys.filter((k) => k.startsWith(base + "-"));
    entrySelect.innerHTML = options
      .map((k) => `<option value="${k}">${k}</option>`)
      .join("");
    populateEntryForm();
  };

  const populateEntryForm = () => {
    const key = entrySelect.value;
    const entry = jsonData[currentType][key];
    // document.getElementById('url').value = currentType === 'pictures' ? entry : entry.url;
    urlField.value = entry.url;
    volumeField.value =
      currentType === "videos" && entry.volume ? entry.volume : "";
  };

  baseSelect.onchange = updateEntryList;
  entrySelect.onchange = populateEntryForm;
  updateEntryList();
}
