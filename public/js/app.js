const locationInput = document.querySelector("#locationInput");
const form = document.querySelector("form");
const message = document.querySelector("#message");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    message.classList.remove("error");
    message.textContent = "Loading...";

    const location = locationInput.value;

    fetch("/weather?location=" + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                message.classList.add("error");
                message.textContent = data.error;
            }else{
                message.textContent = data.forecast;
            }
        });
    });
});
