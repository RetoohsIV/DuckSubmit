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
		<p id="error-message" class="error-message" style="display: none; color: red; font-weight: bold;"></p>
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

const logoutbutton = document.getElementById('logout-link');

logoutbutton.addEventListener('click', function(event) {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    window.location.href = 'login.html';
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



//* drag and drop function*//
// Function to initialize drag-and-drop and upload functionality
function initializeDragAndDrop() {
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('file-input');
    const alternativeUploadBtn = document.getElementById('alternative-upload-btn');
    const liveMessage = document.getElementById('live-message'); // Reference for live message
    const allowedTypes = ['application/zip', 'application/pdf'];
    const downloadBtn = document.getElementById('download-btn');
    const submitBtn = document.getElementById('submit-btn');

    // Handle dragover event
    dropArea.addEventListener('dragover', (event) => {
        event.preventDefault();
        dropArea.style.backgroundColor = '#f0f8ff';
    });

    // Handle dragleave event
    dropArea.addEventListener('dragleave', () => {
        dropArea.style.backgroundColor = '#ffffff';
    });

    // Handle file drop
    dropArea.addEventListener('drop', (event) => {
        event.preventDefault();
        dropArea.style.backgroundColor = '#ffffff';

        const files = event.dataTransfer.files;

        if (files.length > 0) {
            const uploadedFile = files[0];

            // Check file type
            if (!allowedTypes.includes(uploadedFile.type)) {
                showDuck('angry');
                displayLiveMessage("Invalid file type. Please upload a ZIP or PDF file.", 'error');
                return;
            }

            // Valid file
            dropArea.innerHTML = `
                <img src="images/file-symbol.jpeg" alt="Upload Icon" class="upload-icon">
                <p>${uploadedFile.name}</p> <!-- Display the file name -->
                <p class="supported-types">Supports: ZIP, PDF</p>
            `;
            showDuck('informative');
            displayLiveMessage("File uploaded successfully!", 'success');

            // Enable download and submit buttons
            downloadBtn.disabled = false;
            submitBtn.disabled = false;
        }
    });

    // Handle file selection via the upload button
    alternativeUploadBtn.addEventListener('click', () => {
        fileInput.click(); // Trigger the hidden file input
    });

    // Handle file input change
    fileInput.addEventListener('change', (event) => {
        const files = event.target.files;

        if (files.length > 0) {
            const uploadedFile = files[0];

            if (!allowedTypes.includes(uploadedFile.type)) {
                showDuck('angry');
                displayLiveMessage("Invalid file type. Please upload a ZIP or PDF file.", 'error');
                return;
            }

            // Valid file
            dropArea.innerHTML = `
                <img src="images/file-symbol.jpeg" alt="Upload Icon" class="upload-icon">
                <p>${uploadedFile.name}</p> <!-- Display the file name -->
                <p class="supported-types">Supports: ZIP, PDF</p>
            `;
            showDuck('informative');
            displayLiveMessage("File uploaded successfully!", 'success');

            // Enable download and submit buttons
            downloadBtn.disabled = false;
            submitBtn.disabled = false;
        }
    });

    // Function to display live messages
    function displayLiveMessage(message, type) {
        liveMessage.textContent = message;
        liveMessage.className = `live-message ${type} show`; // Add appropriate styling
        liveMessage.style.display = 'block';

        setTimeout(() => {
            liveMessage.classList.remove('show'); // Fade out the message
            setTimeout(() => {
                liveMessage.style.display = 'none'; // Fully hide the message after animation
                showDuck('sleeping'); // Return to sleeping duck
            }, 500); // Match fade-out duration in CSS
        }, 3000); // Display the message for 3 seconds
    }
}

// Function to show specific duck
function showDuck(type) {
    const sleepingDuck = document.getElementById('duck-sleeping');
    const angryDuck = document.getElementById('duck-angry');
    const informativeDuck = document.getElementById('duck-informative');

    // Hide all ducks first
    sleepingDuck.style.display = 'none';
    angryDuck.style.display = 'none';
    informativeDuck.style.display = 'none';

    // Show the specific duck
    if (type === 'sleeping') {
        sleepingDuck.style.display = 'block';
    } else if (type === 'angry') {
        angryDuck.style.display = 'block';
    } else if (type === 'informative') {
        informativeDuck.style.display = 'block';
    }
}
