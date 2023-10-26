document.addEventListener("DOMContentLoaded", function () {
  let select = document.getElementById("select");
  let options = select.querySelectorAll(".select-options__item");
  let selectedValue = "";

  options.forEach(function (option) {
    option.addEventListener("click", function () {
      options.forEach(function (el) {
        el.classList.remove("selected");
      });

      option.classList.add("selected");
      selectedValue = option.getAttribute("data-value");
    });
  });

  let form = document.getElementById("form");
  let submitButton = form.querySelector('button[type="submit"]');
  let loader = document.getElementById("loader");
  let fileInput = document.getElementById("file");
  let isSubmitting = false;
  let inputFields = document.querySelectorAll(".form-group__input");

  function showToast(message, background) {
    Toastify({
      text: message,
      duration: 3000,
      newWindow: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: background,
        borderRadius: "5px",
        padding: "15px 25px"
      }
    }).showToast();
  }

  function showErrorToast() {
    showToast("Ошибка", "linear-gradient(174deg, #a41e69c2, #1f1d23f7)");
  }

  function showSuccessToast() {
    showToast("Отправлено", "linear-gradient(28deg, #256468, #10101dd6)");
  }

  inputFields.forEach(function (field) {
    field.addEventListener("focus", function () {
      let label = field.previousElementSibling;
      label.style.top = "-20px";
      label.style.transform = "translateY(-50%) scale(0.9)";
      label.style.color = "#fff";
      label.style.fontSize = "1rem";
    });

    field.addEventListener("blur", function () {
      if ("" === field.value) {
        let label = field.previousElementSibling;
        label.style.top = "50%";
        label.style.transform = "translateY(-50%) scale(1)";
        label.style.color = "#272733";
        label.style.fontSize = "1.125rem";
      }
    });
  });

  fileInput.addEventListener("change", function () {
    if (fileInput.files.length > 0) {
      let file = fileInput.files[0];
      if (file.type === "image/jpeg" && file.size <= 1048576) {
        showToast("Файл выбран", "linear-gradient(28deg, #256468, #10101dd6)");
        submitButton.disabled = false;
      } else {
        showToast("Допустим JPG (1 МБ)", "linear-gradient(174deg, #a41e69c2, #1f1d23f7)");
        fileInput.value = "";
        submitButton.disabled = true;
      }
    } else {
      showToast("Пожалуйста, выберите файл.", "linear-gradient(174deg, #a41e69c2, #1f1d23f7)");
      submitButton.disabled = true;
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    isSubmitting = true;
    loader.style.display = "flex";
    submitButton.disabled = true;

    let selectedOption = document.querySelector("#select .select-options__item.selected");
    selectedValue = selectedOption ? selectedOption.getAttribute("data-value") : "choose";

    let email = document.getElementById("email").value;
    let name = document.getElementById("name").value;
    let formData = new FormData();
    formData.append("type", selectedValue);
    formData.append("email", email);
    formData.append("name", name);

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: formData
    })
      .then(function (response) {
        isSubmitting = false;
        loader.style.display = "none";

        if (response.ok) {
          showSuccessToast();
          form.reset();
          document.getElementById("email").value = "";
          document.getElementById("name").value = "";
          submitButton.disabled = false;

          inputFields.forEach(function (field) {
            let label = field.previousElementSibling;
            label.style.top = "50%";
            label.style.transform = "translateY(-50%) scale(1)";
            label.style.color = "#272733";
            label.style.fontSize = "1.125rem";
          });
        } else {
          showErrorToast();
          submitButton.disabled = false;
        }
      })
      .catch(function () {
        isSubmitting = false;
        loader.style.display = "none";
        showErrorToast();
        submitButton.disabled = false;
      });
  });
});