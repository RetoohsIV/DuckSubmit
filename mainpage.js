window.addEventListener('load', function() {
    const username = localStorage.getItem('username');
    console.log(`Logged in as ${username}`);
});

//This array had to be moved to the backend later
const coursesarray = [
    "G.d Mensch-Computer Interaktion",
    "G.d Betriebssysteme",
    "Lineare Algebra",
    "Data Science",
    "Diskrete Strukturen"];

//This would be in the backend aswell in for example the student2 folder
//is a txt file istutor which has to be read 
const istutor =["Lineare Algebra"];

// Select-course container
const menuContainer = document.getElementById('menu-container');

const selectCourseLink = document.createElement('a');
selectCourseLink.textContent = "Select course";
selectCourseLink.classList.add('active', 'collapsed');
menuContainer.appendChild(selectCourseLink);

const linkListContainer = document.createElement('div');
linkListContainer.style.display = 'none';

// Content Box
const contentBox = document.createElement('div');
contentBox.classList.add('content-box');
menuContainer.appendChild(contentBox); 

// Loop through the courses array and create the dropdown dynamically
coursesarray.forEach((coursename) => {


    const course = document.createElement('a');
    
    if (istutor.includes(coursename) && (localStorage.getItem('username') === "student2")) {
        course.textContent = coursename + " (TUTOR)";
    } else {
        course.textContent = coursename;
    }
    

    linkListContainer.appendChild(course);

    // EventListner when a specific course is clicked
    course.addEventListener('click', function(event) {
        selectCourseLink.textContent = coursename;
        selectCourseLink.classList.add('collapsed');
        linkListContainer.style.display = 'none';

        // Show the drag and drop box with corresponding content
        contentBox.classList.add('show');
		
		//*updated here for drag-and-drop upload box dynamically*//
        console.log(`Checking course: ${coursename}`);
		// Clear existing content and add the drag-and-drop upload functionality
        contentBox.innerHTML = `
		<div id="drop-area" class="drop-area">
			<img src="images/file-symbol.jpeg" alt="Upload Icon" class="upload-icon">
			<p>Drag & Drop your file here</p>
			<p class="supported-types">Supports: ZIP, PDF</p>
			<input type="file" id="file-input" accept=".zip, .pdf" style="display: none;">
		</div>
		<div class="button-container">
			<button id="alternative-upload-btn" class="alternative-upload-btn">Upload File</button>
		</div>
		<div class="button-container">
			<button id="download-btn" class="download-btn" disabled>Download</button>
		</div>
        <div class="button-container">
			<button id="submit-btn" class="submit-btn" disabled>Submit</button>
		</div>
	`;



        // Initialize drag-and-drop functionality for this course
        initializeDragAndDrop();
    });
});

// Append the course list container to the menu
menuContainer.appendChild(linkListContainer);

//EventListner when a course was already selected and another wants to be clicked
selectCourseLink.addEventListener('click', function(event) {

    if (linkListContainer.style.display === 'none') {
        linkListContainer.style.display = 'block';
        selectCourseLink.classList.remove('collapsed'); // Change the arrow to down
    } else {
        linkListContainer.style.display = 'none';
        selectCourseLink.classList.add('collapsed'); // Change the arrow back to right
    }

    // Hide the content box when the dropdown is reopened
    contentBox.classList.remove('show');
});



// Email-alerts-settings dropdown
const settingsLink = document.getElementById('settings-link');
const settingsemailalerts = document.getElementById('settings-email-alerts');

settingsLink.addEventListener('click', function(event) {
    
    if (settingsemailalerts.style.display === 'block') {
        settingsemailalerts.style.display = 'none';
    } else {
        settingsemailalerts.style.display = 'block';
    }
});

//These are just for testing purposes , can be removed later
document.getElementById('submission').addEventListener('change', function(event) {
    console.log('Submission:', event.target.checked);
});

document.getElementById('graded').addEventListener('change', function(event) {
    console.log('Graded', event.target.checked);
});

document.getElementById('deadline').addEventListener('change', function(event) {
    console.log('Deadline:', event.target.checked);
});


//* Feedback for setting *//
// Get popup modal elements
const popupModal = document.getElementById('popup-modal');
const popupMessage = document.getElementById('popup-message');
const popupClose = document.getElementById('popup-close');

// Get all checkboxes
const submissionCheckbox = document.getElementById('submission');
const gradedCheckbox = document.getElementById('graded');
const deadlineCheckbox = document.getElementById('deadline');

// Dummy data for submission, deadline, and grade
const submissionStatus = "Submitted successfully!";
const deadlineTime = "2025-01-31 23:59";
const gradeValue = "A+";

// Function to show popup with a message
function showPopup(message) {
    popupMessage.textContent = message; // Set the popup message
    popupModal.style.display = 'flex'; // Show the modal
}

// Event listener for submission checkbox
submissionCheckbox.addEventListener('change', (event) => {
    if (event.target.checked) {
        //showPopup(`Submission Status: ${submissionStatus}`);
        //console.log("Submission popup shown.");
    }
});

// Event listener for deadline checkbox
deadlineCheckbox.addEventListener('change', (event) => {
    if (event.target.checked) {
        //showPopup(`The deadline is: ${deadlineTime}`);
        //console.log("Deadline popup shown.");
    }
});

// Event listener for graded checkbox
gradedCheckbox.addEventListener('change', (event) => {
    if (event.target.checked) {
        //showPopup(`Your grade is: ${gradeValue}`);
        //console.log("Grade popup shown.");
    }
});

// Close the popup when the close button is clicked
popupClose.addEventListener('click', () => {
    popupModal.style.display = 'none'; // Hide the modal
});

// Close the popup when clicking outside the content
window.addEventListener('click', (event) => {
    if (event.target === popupModal) {
        popupModal.style.display = 'none'; // Hide the modal
    }
});

//* Overview setting*//
// data for courses and their statuses for overview
const coursesStatus = [
    { name: "G.d Mensch-Computer Interaktion", submission: "Submitted", deadline: "2025-01-31", grade: "A+" },
    { name: "G.d Betriebssysteme", submission: "Not Submitted", deadline: "2025-02-15", grade: "B" },
    { name: "Lineare Algebra", submission: "Submitted", deadline: "2025-01-25", grade: "A" },
    { name: "Data Science", submission: "In Progress", deadline: "2025-03-01", grade: "Pending" },
    { name: "Diskrete Strukturen", submission: "Not Submitted", deadline: "2025-02-10", grade: "C" },
];

// Get Overview modal elements
const overviewModal = document.getElementById('overview-modal');
const overviewList = document.getElementById('course-overview-list');
const overviewClose = document.getElementById('overview-close');
const overviewLink = document.querySelector('.header-link[href="#"]'); // Assuming Overview is the first link

// Function to display the Overview modal
function showOverviewModal() {
    // Clear any existing list items
    overviewList.innerHTML = '';

    // Populate the list with course statuses
    coursesStatus.forEach(course => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>Course:</strong> ${course.name}<br>
            <strong>Submission Status:</strong> ${course.submission}<br>
            <strong>Deadline:</strong> ${course.deadline}<br>
            <strong>Grade:</strong> ${course.grade}
        `;
        overviewList.appendChild(listItem);
    });

    // Show the modal
    overviewModal.style.display = 'flex';
}

// Event listener for the Overview link
overviewLink.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    showOverviewModal();
});

// Close the modal when the close button is clicked
overviewClose.addEventListener('click', () => {
    overviewModal.style.display = 'none';
});

// Close the modal when clicking outside the content
window.addEventListener('click', (event) => {
    if (event.target === overviewModal) {
        overviewModal.style.display = 'none';
    }
});

//* drag and drop function*//
// Function to initialize drag-and-drop functionality
function initializeDragAndDrop() {
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('file-input');
    const alternativeUploadBtn = document.getElementById('alternative-upload-btn');
    const downloadBtn = document.getElementById('download-btn');
    const submitBtn = document.getElementById('submit-btn');

    let uploadedFile = null;
    let files = null;

    // Highlight drop area on drag events
    dropArea.addEventListener('dragover', (event) => {
        event.preventDefault();
        dropArea.style.backgroundColor = '#f0f8ff';
    });

    dropArea.addEventListener('dragleave', () => {
        dropArea.style.backgroundColor = '#ffffff';
    });

    // Handle file drop
    dropArea.addEventListener('drop', (event) => {
        event.preventDefault();
        dropArea.style.backgroundColor = '#ffffff';

        files = event.dataTransfer.files;

        const allowedTypes = ['application/zip', 'application/pdf'];
        if (!allowedTypes.includes(files[0].type)) {
            alert('Invalid file type. Please upload a ZIP or PDF file.');
            return;
        }

        if (files.length > 0) {
            uploadedFile = files[0];
            dropArea.innerHTML = `
                <img src="images/file-symbol.jpeg" alt="Upload Icon" class="upload-icon">
                <p>${uploadedFile.name}</p> <!-- Display the file name here -->
                <p class="supported-types">Supports: ZIP, PDF</p>
            `;

            submitBtn.disabled = false;
        }
    });

    // Handle file selection via alternative upload button
    alternativeUploadBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (event) => {
        files = event.target.files;

        const allowedTypes = ['application/zip', 'application/pdf'];
        if (!allowedTypes.includes(files[0].type)) {
            alert('Invalid file type. Please upload a ZIP or PDF file.');
            return;
        }

        if (files.length > 0) {
            uploadedFile = files[0];
            dropArea.innerHTML = `
                <img src="images/file-symbol.jpeg" alt="Upload Icon" class="upload-icon">
                <p>${uploadedFile.name}</p> <!-- Display the file name here -->
                <p class="supported-types">Supports: ZIP, PDF</p>
            `;

            submitBtn.disabled = false;
        }
    });

    // Handle file upload
    function handleFileUpload(file) {

        uploadedFile = file;
        alert(`File "${file.name}" uploaded successfully.`);
        downloadBtn.disabled = false;
    }

    // Download button functionality
    downloadBtn.addEventListener('click', () => {
        if (!uploadedFile) return;

        const link = document.createElement('a');
        link.href = URL.createObjectURL(uploadedFile);
        link.download = uploadedFile.name;
        link.click();
    });

    // Submit button functionality
    submitBtn.addEventListener('click', () => {
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
        submitBtn.disabled = true;

        dropArea.innerHTML = `
        <img src="images/file-symbol.jpeg" alt="Upload Icon" class="upload-icon">
        <p>Drag & Drop your file here</p>
        <p class="supported-types">Supports: ZIP, PDF</p>
    `;

    });
}
