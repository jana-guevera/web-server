const form = document.querySelector(".form");
const locationInput = document.querySelector("#location");
const message1 = document.querySelector(".message1");
const message2 = document.querySelector(".message2");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    message1.textContent = "Loading....";
    message2.textContent = "";

    message1.classList.remove("error");
    message1.classList.remove("success");

    const location = locationInput.value;

    if(location.length === 0){
        message1.textContent = "Please provide a location!";
        message1.classList.add("error");
    }else{
        fetch("/weather?location=" + location).then((response) => {
            response.json().then((data) => {
                if(data.error){
                    message1.textContent = data.error;
                    message1.classList.add("error");
                }else{
                    message1.textContent = data.location;
                    message2.textContent = data.forecast;

                    message1.classList.add("success");
                    message2.classList.add("success");
                }
            });
        });
    }
});