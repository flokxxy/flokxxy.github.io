/* global $ */


$(document).ready(function () {

  const form = document.getElementById("mainForm");
  const Name = document.getElementById("name_field");
  const Email = document.getElementById("email_field");
  const Phone = document.getElementById("phone_field");
  const Organization = document.getElementById("company_field");
  const Message = document.getElementById("desc_field");
  const Check = document.getElementById("Check1");

  const qform = document.querySelector('#blablabla');
  const qpopup = document.querySelector('.content');
  const closeImage = document.querySelector('.page_close');

  const formDataLoad = JSON.parse(localStorage.getItem("formData"));
  var formDataSave;

  const currentUrl = window.location.href;

  if (currentUrl.includes("#popup__container")) {
    OpenPopup();
  }

  // Save form data to localStorage
  function SaveData() {
    formDataSave = {
      consent: Check.checked,
      email: Email.value,
      fullName: Name.value,
      message: Message.value,
      organization: Organization.value,
      phone: Phone.value
    };
    localStorage.setItem("formData", JSON.stringify(formDataSave));
  }


  // Load form data from localStorage
  function LoadData() {
    if (formDataLoad) {
      Name.value = formDataLoad.fullName;
      Email.value = formDataLoad.email;
      Phone.value = formDataLoad.phone;
      Organization.value = formDataLoad.organization;
      Message.value = formDataLoad.message;
      Check.checked = formDataLoad.consent;
    }

  }

  // Open the popup form
  function OpenPopup() {
    // const overlay = document.getElementById("overlay");
    qform.classList.add('open');
    qpopup.classList.add('popup_open');
   // overlay.style.display = "block";
    history.pushState({ popupOpen: true }, "", "#popup__container");
  }


  // Close the popup form
  function ClosePopup() {
    qform.classList.remove('open');
    qpopup.classList.remove('popup_open');
    history.back();
  }

  // Clear form data
  function ClearForm() {
    localStorage.clear();
  }

  // Event listeners
  document.getElementById("main_button").addEventListener("click", OpenPopup);
  //document.getElementById("overlay").addEventListener("click", ClosePopup);
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(form);
    fetch("https://formcarry.com/s/CBT-xvtxJq", {
      body: formData,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    }).then(function (response) {
      if (response.ok) {
        document.getElementById("result").innerHTML =
          "Данные формы успешно отправлены на сервер";
        ClearForm();
      } else {
        document.getElementById("result").innerHTML =
          "Ошибка при отправке данных формы на сервер";
      }
    }).catch(function (error) {
      document.getElementById("result").innerHTML = "Произошла ошибка:" + error;
    });

    //form.reset();
  });

  LoadData();
  window.addEventListener("popstate", function (event) {
    if (event.state !== null && event.state.popupOpen) {
      qform.classList.add('open');
      qpopup.classList.add('popup_open');
    } else {
      qform.classList.remove('open');
      qpopup.classList.remove('popup_open');

    }
  });

  Name.addEventListener("blur", SaveData);
  Email.addEventListener("blur", SaveData);
  Phone.addEventListener("blur", SaveData);
  Organization.addEventListener("blur", SaveData);
  Message.addEventListener("blur", SaveData);
  Check.addEventListener("change", SaveData);
  closeImage.addEventListener("click",ClosePopup);
});
