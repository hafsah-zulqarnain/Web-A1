document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("jobApplicationForm").addEventListener("submit", function (event) {
        event.preventDefault(); 
    
        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach(message => message.remove());
    
        let isValid = true;
    
        function showError(input, message) {
            const errorMessage = document.createElement("div");
            errorMessage.className = "error-message";
            errorMessage.style.color = "red";
            errorMessage.innerText = message;
            input.parentNode.insertBefore(errorMessage, input.nextSibling);
            isValid = false;
        }
    

        function validateAddress(element) {
            const addressPattern = /^[\d\s\w.,-]+$/; 
            if (!addressPattern.test(element.value.trim())) {
                displayError(element, "Address must contain numbers and letters.");
                return false; 
            }
            return true; 
        }
        function validateTextInput(input, minLength) {
            if (input.value.trim() === "") {
                showError(input, "This field is required.");
            } else if (input.value.length < minLength) {
                showError(input, `Minimum length is ${minLength} characters.`);
            } else if (!/^[a-zA-Z\s]*$/.test(input.value)) {
                showError(input, "Only letters and spaces are allowed.");
            }
        }
    
        function validatePhoneNumber(input) {
            if (input.value && !/^\+?[0-9\s-]{7,15}$/.test(input.value)) {
                showError(input, "Please enter a valid phone number.");
            }
        }
    
        function validateZipCode(input) {
            if (input.value && !/^\d{5}(-\d{4})?$/.test(input.value)) {
                showError(input, "Please enter a valid ZIP code.");
            }
        }
    
        function validateEmail(input) {
            if (input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
                showError(input, "Please enter a valid email address.");
            }
        }
    
        validateTextInput(document.getElementById("firstName"), 2);
        validateTextInput(document.getElementById("lastName"), 2);
        validatePhoneNumber(document.getElementById("phone"));
        validateEmail(document.getElementById("email"));
        validateAddress(document.getElementById("address"), 50);
        validateTextInput(document.getElementById("city"), 3);
        validateTextInput(document.getElementById("state"), 2);
        validateZipCode(document.getElementById("zip"));
        validateTextInput(document.getElementById("educationLevel"), 2);
        validateTextInput(document.getElementById("school"), 2);
        validateTextInput(document.getElementById("major"), 2);
        validateTextInput(document.getElementById("jobTitle"), 2);
        validateTextInput(document.getElementById("company"), 2);
        validateTextInput(document.getElementById("workSchedule"), 3);
        validateTextInput(document.getElementById("referenceName"), 2);
        validateEmail(document.getElementById("emailRef"));
        validateTextInput(document.getElementById("relationship"), 2);
        validateTextInput(document.getElementById("whyCompany"), 10);


        if (isValid) {
            const formData = new FormData(event.target);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            console.log(data); 
            let applications = JSON.parse(localStorage.getItem('applications')) || [];
            applications.push(data);
            localStorage.setItem('applications', JSON.stringify(applications));
            alert('Application submitted successfully!');
            event.target.reset(); 
        }
    });


    document.getElementById('viewApplications').addEventListener('click', function () {
        const applications = JSON.parse(localStorage.getItem('applications')) || [];
        const table = document.createElement('table');
        table.className = 'pretty-table';
    
        applications.forEach((application, index) => {

            const userHeadingRow = table.insertRow();
            const userHeadingCell = userHeadingRow.insertCell();
            userHeadingCell.colSpan = 2;
            userHeadingCell.textContent = `User No: ${index + 1}`;
            userHeadingCell.className = 'user-heading'; 
            userHeadingCell.style.fontWeight = 'bold'
            Object.keys(application).forEach(key => {
                const row = table.insertRow();
                const cellKey = row.insertCell();
                const cellValue = row.insertCell();
                cellKey.textContent = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                cellValue.textContent = application[key];
            });
        });
    
        const applicationsTable = document.getElementById('applicationsTable');
        applicationsTable.innerHTML = '';  
        applicationsTable.appendChild(table);  
    });
    

    function displayError(element, message) {
        const error = document.createElement("span");
        error.classList.add("error-message");
        error.style.color = "red";
        error.innerText = message;
        element.parentNode.insertBefore(error, element.nextSibling);
    }

    
});


