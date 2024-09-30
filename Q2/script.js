document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("jobApplicationForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let valid = true;

        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach((msg) => msg.remove());

        const firstName = document.getElementById("firstName");
        if (firstName.value.trim() === "") {
            displayError(firstName, "First Name is required.");
            valid = false;
        }

        const lastName = document.getElementById("lastName");
        if (lastName.value.trim() === "") {
            displayError(lastName, "Last Name is required.");
            valid = false;
        }

        const phone = document.getElementById("phone");
        const phonePattern = /^\d{11}$/;
        if (!phonePattern.test(phone.value.trim())) {
            displayError(phone, "Phone number must be exactly 11 digits.");
            valid = false;
        }

        const email = document.getElementById("email");
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
            displayError(email, "Please enter a valid email address.");
            valid = false;
        }

        const zip = document.getElementById("zip");
        const zipPattern = /^\d{5}$/; 
        if (!zipPattern.test(zip.value.trim())) {
            displayError(zip, "ZIP Code must be exactly 5 digits.");
            valid = false;
        }

        const resume = document.getElementById("resume");
        if (resume.files.length === 0) {
            displayError(resume, "Please upload your resume.");
            valid = false;
        }

        if (valid) {
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
            form.reset();
        }
    });


    document.getElementById('viewApplications').addEventListener('click', function () {
        const applications = JSON.parse(localStorage.getItem('applications')) || [];
        const table = document.createElement('table');
        table.className = 'pretty-table';

        applications.forEach(application => {
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

    document.getElementById('resetForm').addEventListener('click', function() {
        localStorage.clear();
        document.getElementById('applicationsTable').innerHTML = '';
        document.getElementById('myForm').reset();

      });
});


