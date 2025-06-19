document.addEventListener("DOMContentLoaded", () => {
  const navBar = document.getElementById("mainNavBar");
  const buttons = navBar.querySelectorAll(".nav-button");
  const mediaBar = document.getElementById("mediaContainer");
  const addForm = document.getElementById("addFormContainer");
  const editForm = document.getElementById("editFormContainer");
  const existDataForm = document.getElementById("exist-data-form");

  newBaseKey.addEventListener("change", () => {
    if (newBaseKey.value) {
      addingNewBase = true;
      baseSelect.disabled = true;
    } else {
      addingNewBase = false;
      baseSelect.disabled = false;
    }
  });

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      // Skip if this button is already active
      if (button.classList.contains("nav-button--active")) return;

      // Remove active class and enable all buttons
      buttons.forEach((btn) => {
        btn.classList.remove("nav-button--active");
        btn.disabled = false;
      });

      // Set this button as active and disable it
      button.classList.add("nav-button--active");
      button.disabled = true;

      // Optional: Perform some action depending on which was clicked
      currentPage = button.dataset.action;

      urlField.value = "";
      volumeField.value = "";
      // You can trigger your Add/Edit/Last logic here
      switch (currentPage) {
        case "add":
          typeSelect.value = "";
          currentType = "";
          checkDisplayForm();

          mediaBar.style.display = "block";
          addForm.style.display = "block";
          editForm.style.display = "none";
          existDataForm.style.display = "none";
          break;

        case "edit":
          typeSelect.value = "";
          currentType = "";
          if (addingNewBase) {
            newBaseKey.value = "";
            addingNewBase = false;
          }
          checkDisplayForm();

          mediaBar.style.display = "block";
          addForm.style.display = "none";
          editForm.style.display = "block";
          existDataForm.style.display = "block";
          break;

        case "last":
          typeSelect.value = "";
          currentType = "";
          checkDisplayForm();

          mediaBar.style.display = "none";
          addForm.style.display = "none";
          editForm.style.display = "none";
          existDataForm.style.display = "none";
          dataForm.style.display = "none";
          break;
      }
    });
  });
});
