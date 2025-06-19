function clearText(element, placeholderText) {
    if (element.value === element.defaultValue) {
       element.value = ""; 
    }
    element.placeholder = placeholderText; 
   }
 function restoreText(element, defaultValue) {
    if (element.value === "") {
       element.value = defaultValue; 
    }
    element.placeholder = ""; 
 }

 function clearDropdown(selectElement, placeholderText) {
    if (selectElement.value === "") {
       selectElement.style.color = "gray"; 
       selectElement.firstElementChild.textContent = placeholderText;
    }
 }

 function restoreDropdown(selectElement, placeholderText) {
    if (selectElement.value === "") {
       selectElement.firstElementChild.textContent = placeholderText;
       selectElement.style.color = "black"; 
    }
 }
