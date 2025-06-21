const typeSelect = document.getElementById("type");
const baseSelect = document.getElementById("base-key");
const entrySelect = document.getElementById("entry-key");
const picContainer = document.getElementById("image-preview");
const vidContainer = document.getElementById("video-preview");
const picPreview = document.getElementById("picPreview");
const vidPreview = document.getElementById("vidPreview");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let dataFetched = false;
let jsonData = { pictures: {}, videos: {} };
let currentType = "";

typeSelect.addEventListener("change", () => {
  currentType = typeSelect.value;

  if (!currentType) {
    baseSelect.innerHTML = "";
    entrySelect.innerHTML = "";
    hidePreviews();
    return;
  }

  populateBaseKey();
});

baseSelect.addEventListener("change", populateEntryList);
entrySelect.addEventListener("change", setPreview);

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
  const base = baseSelect.value;
  const keys = Object.keys(jsonData[currentType]);
  const filtered = keys.filter((k) => k.startsWith(`${base}-`));

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
