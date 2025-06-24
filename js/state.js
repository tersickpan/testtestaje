let dataFetched = false;
let jsonData = { pictures: {}, videos: {} };
let currentPage = "";
let currentType = "";
let addingNewBase = false;
let selectedBaseKey = "";
let selectedKey = "";
let githubToken = ""; // Set this directly in the code if running locally

const typeSelect = document.getElementById("type");
const dataForm = document.getElementById("data-form");
const baseSelect = document.getElementById("base-key");
const newBaseKey = document.getElementById("new-base-key");
const entrySelect = document.getElementById("entry-key");
const urlField = document.getElementById("url");
const volumeField = document.getElementById("volume");
