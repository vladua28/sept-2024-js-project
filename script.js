const addItemButton = document.getElementById('addItem');
const formInput = document.getElementById('formInput');
const pairList = document.getElementById('pairList');
S

addItemButton.addEventListener('click', () => {
    const input = formInput.value.trim();
    const [name, value] = input.split("=").map(str => str?.trim());
    if (!name || !value || /[^a-zA-Z0-9]/.test(name) || /[^a-zA-Z0-9]/.test(value)) {
        alert("Invalid format! Use 'Name=Value' with alphanumeric characters only.");
        return;
    }

    const option = document.createElement("option");
    option.textContent = `${name}=${value}`;
    option.value = `${name}=${value}`;
    pairList.appendChild(option);

    formInput.value = "";
});