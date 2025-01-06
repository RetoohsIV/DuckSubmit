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

// Function to create a table
function createCourseTable(coursename) {
    
    // Prevents to show multiple tables
    const existingTable = contentBox.querySelector('table');
    if (existingTable) {
        existingTable.remove();
    }

    // Headers definition
    const headers = ["Assignment", "Date", "Deadline", "Status", "Download", "Upload", "Grade"];

    // Create a new table for the selected course
    const table = document.createElement('table');
    table.classList.add('context-table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    
    // Table headers
    const headerRow = document.createElement('tr');
    for (let i = 1; i <= 7; i++) {
        const th = document.createElement('th');
        th.textContent = headers[i - 1];
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    
    // Table rows (Am besten eine Liste/Array/Txt durchgehen für die Einträge)
    for (let i = 0; i < 5; i++) { 
        const row = document.createElement('tr');
        for (let j = 0; j < 7; j++) { 
            const td = document.createElement('td');
            td.textContent = '...';
            row.appendChild(td);
        }
        tbody.appendChild(row);
    }
    
    table.appendChild(thead);
    table.appendChild(tbody);
    
    // Append the newly created table to the contentBox
    contentBox.appendChild(table);
}

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

        // Create the table for the selected course
        createCourseTable(coursename);
		
		//*updated here for drag-and-drop upload box dynamically*//
        console.log(`Checking course: ${coursename}`);
		
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
        showPopup(`Submission Status: ${submissionStatus}`);
        console.log("Submission popup shown.");
    }
});

// Event listener for deadline checkbox
deadlineCheckbox.addEventListener('change', (event) => {
    if (event.target.checked) {
        showPopup(`The deadline is: ${deadlineTime}`);
        console.log("Deadline popup shown.");
    }
});

// Event listener for graded checkbox
gradedCheckbox.addEventListener('change', (event) => {
    if (event.target.checked) {
        showPopup(`Your grade is: ${gradeValue}`);
        console.log("Grade popup shown.");
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
    { name: "G.d Mensch-Computer Interaktion", grading: "Done", deadline: "2025-02-06"},
    { name: "G.d Betriebssysteme", grading: "Done", deadline: "2025-02-21"},
    { name: "Lineare Algebra", grading: "In Progress", deadline: "2025-01-31"},
    { name: "Data Science", grading: "In Progress", deadline: "2025-03-07"},
    { name: "Diskrete Strukturen", grading: "Done", deadline: "2025-02-16"},
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
            <strong>Grading Status:</strong> ${course.grading}<br>
            <strong>Deadline:</strong> ${course.deadline}<br>
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