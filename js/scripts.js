console.log("FoundU is running");


const forms = document.querySelectorAll("form");


forms.forEach(function (form) {

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        console.log("Form submitted");

    });

});