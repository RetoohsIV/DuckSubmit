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
        console.log(`Checking course: ${coursename}`);
        contentBox.textContent = `-ToDo- Drag and Drop, Submit....  ${coursename}`;
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