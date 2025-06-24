const typeSelect = document.getElementById("type");
const baseSelect = document.getElementById("base-key");
const entrySelect = document.getElementById("entry-key");
const picContainer = document.getElementById("image-preview");
const vidContainer = document.getElementById("video-preview");
const picPreview = document.getElementById("picPreview");
const vidPreview = document.getElementById("vidPreview");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const sortModeSelect = document.getElementById("sort-mode");

let dataFetched = false;
let jsonData = { pictures: {}, videos: {} };
let currentType = "";

typeSelect.addEventListener("change", () => {
  currentType = typeSelect.value;

  if (!currentType) {
    sortModeSelect.disabled = true;
    baseSelect.innerHTML = "";
    entrySelect.innerHTML = "";
    hidePreviews();
    return;
  }

  sortModeSelect.disabled = false;
  populateBaseKey();
});

baseSelect.addEventListener("change", populateEntryList);
entrySelect.addEventListener("change", setPreview);
sortModeSelect.addEventListener("change", populateEntryList);

prevBtn.addEventListener("click", () => {
  const currentIndex = entrySelect.selectedIndex;

  if (currentIndex > 0) {
    // Previous within current base
    entrySelect.selectedIndex = currentIndex - 1;
    setPreview();
  } else {
    // Move to previous base
    const baseIndex = baseSelect.selectedIndex;
    if (baseIndex > 0) {
      baseSelect.selectedIndex = baseIndex - 1;
      populateEntryList(); // re-populates entrySelect
      // Wait a tick then select last entry
      setTimeout(() => {
        entrySelect.selectedIndex = entrySelect.options.length - 1;
        setPreview();
      }, 0);
    }
  }
});

nextBtn.addEventListener("click", () => {
  const currentIndex = entrySelect.selectedIndex;

  if (currentIndex < entrySelect.options.length - 1) {
    // Next within current base
    entrySelect.selectedIndex = currentIndex + 1;
    setPreview();
  } else {
    // Move to next base
    const baseIndex = baseSelect.selectedIndex;
    if (baseIndex < baseSelect.options.length - 1) {
      baseSelect.selectedIndex = baseIndex + 1;
      populateEntryList(); // re-populates entrySelect
      // Wait a tick then select first entry
      setTimeout(() => {
        entrySelect.selectedIndex = 0;
        setPreview();
      }, 0);
    }
  }
});

function hidePreviews() {
  picContainer.style.display = "none";
  vidContainer.style.display = "none";
}

function populateBaseKey() {
  const keys = Object.keys(jsonData[currentType]);
  const baseKeys = [...new Set(keys.map((k) => k.split("-")[0]))];

  baseSelect.innerHTML = baseKeys
    .map((k) => `<option value="${k}">${k}</option>`)
    .join("");

  populateEntryList();
}

function populateEntryList() {
  const sortMode = sortModeSelect.value;
  const keys = Object.keys(jsonData[currentType]);

  let filtered = [];

  if (sortMode === "default") {
    // Default: filter by base prefix
    const base = baseSelect.value;
    filtered = keys.filter((k) => k.startsWith(`${base}-`)).sort();

    baseSelect.disabled = false;
  } else {
    // Global sorting
    filtered = [...keys];
    let aTime = 0;
    let bTime = 0;

    filtered.sort((a, b) => {
      if (currentType) {
        if (a) aTime = new Date(jsonData[currentType][a].timestamp);
        if (b) bTime = new Date(jsonData[currentType][b].timestamp);
      }
      return sortMode === "newest" ? bTime - aTime : aTime - bTime;
    });

    baseSelect.disabled = true; // disable base when globally sorted
  }

  entrySelect.innerHTML = filtered
    .map((k) => `<option value="${k}">${k}</option>`)
    .join("");

  setPreview();
}

function setPreview() {
  const key = entrySelect.value;
  const entry = jsonData[currentType][key];

  if (!entry || !entry.url) {
    hidePreviews();
    return;
  }

  if (currentType === "pictures") {
    picPreview.src = entry.url;
    picContainer.style.display = "block";
    vidContainer.style.display = "none";
  } else if (currentType === "videos") {
    vidPreview.src = entry.url;
    vidPreview.volume = typeof entry.volume === "number" ? entry.volume : 0.07;
    vidContainer.style.display = "block";
    picContainer.style.display = "none";
  }
}
