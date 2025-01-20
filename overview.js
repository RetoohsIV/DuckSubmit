// Sample Data for Assignments
const assignments = [
    { course: "G.d Mensch-Computer Interaktion", name: "GMCI 1", deadline: "21.10.24 23:59", status: true, download: true, feedback: true, grade: "20/20" },
    { course: "G.d Mensch-Computer Interaktion", name: "GMCI 2", deadline: "28.10.24 23:59", status: true, download: true, feedback: true, grade: "19/25" },
    { course: "G.d Mensch-Computer Interaktion", name: "GMCI 9", deadline: "16.12.24 23:59", status: false, download: false, feedback: false, grade: "-" },
    { course: "Lineare Algebra", name: "GTI 1", deadline: "15.11.24 12:00", status: true, download: true, feedback: true, grade: "35/40" },
    { course: "Lineare Algebra", name: "GTI 2", deadline: "11.12.24 12:00", status: true, download: true, feedback: true, grade: "-" },
];


// Populate the Table
const tableBody = document.getElementById("table-body");

function populateTable(data) {
    tableBody.innerHTML = ""; // Clear previous rows
    data.forEach((assignment) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${assignment.course}</td>
            <td>${assignment.name}</td>
            <td>${assignment.deadline}</td>
            <td>${assignment.status ? "✓" : "✗"}</td>
            <td>${assignment.download ? '<button>⬇</button>' : '-'}</td>
            <td>${assignment.feedback ? '<button>⬇</button>' : '-'}</td>
            <td>${assignment.grade}</td>
        `;
        tableBody.appendChild(row);
    });
}


/* Sorting by Deadline */
function parseDate(dateString) {
    const [day, month, yearTime] = dateString.split(".");
    const [year, time] = yearTime.split(" ");
    return new Date(`20${year}-${month}-${day}T${time}`);
}

function sortByDeadline(descending = false) {
    assignments.sort((a, b) => {
        const dateA = parseDate(a.deadline);
        const dateB = parseDate(b.deadline);

        return descending ? dateB - dateA : dateA - dateB;
    });

    populateTable(assignments);

    // Update sorting indicator
    const header = document.getElementById("deadline-header");
    header.textContent = descending ? "Deadline ▼" : "Deadline ▲";
}

/* Filters for Assignments */
function populateFilters() {
    const courseSet = [...new Set(assignments.map((assignment) => assignment.course))];
    const nameSet = [...new Set(assignments.map((assignment) => assignment.name))];
    const statusSet = [...new Set(assignments.map((assignment) => (assignment.status ? "✓" : "✗")))];
    const gradeSet = [...new Set(assignments.map((assignment) => assignment.grade))];

    // Populate Course Filter
    courseSet.forEach((course) => {
        const option = document.createElement("option");
        option.value = course;
        option.textContent = course;
        document.getElementById("course-filter").appendChild(option);
    });

    // Populate Assignment Filter
    nameSet.forEach((name) => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        document.getElementById("name-filter").appendChild(option);
    });

    // Populate Status Filter
    statusSet.forEach((status) => {
        const option = document.createElement("option");
        option.value = status;
        option.textContent = status;
        document.getElementById("status-filter").appendChild(option);
    });

    // Populate Grade Filter
    gradeSet.forEach((grade) => {
        const option = document.createElement("option");
        option.value = grade;
        option.textContent = grade;
        document.getElementById("grade-filter").appendChild(option);
    });
}

/* Filtering Logic */
function filterTable() {
    const courseFilterValue = document.getElementById("course-filter").value.toLowerCase();
    const nameFilterValue = document.getElementById("name-filter").value.toLowerCase();
    const statusFilterValue = document.getElementById("status-filter").value;
    const gradeFilterValue = document.getElementById("grade-filter").value;

    const filteredData = assignments.filter((assignment) => {
        return (
            (courseFilterValue === "" || assignment.course.toLowerCase().includes(courseFilterValue)) &&
            (nameFilterValue === "" || assignment.name.toLowerCase().includes(nameFilterValue)) &&
            (statusFilterValue === "" || (assignment.status ? "✓" : "✗") === statusFilterValue) &&
            (gradeFilterValue === "" || assignment.grade === gradeFilterValue)
        );
    });

    populateTable(filteredData);
}


/* Initialize Table and Filters */
document.addEventListener("DOMContentLoaded", () => {
    populateTable(assignments); // Populate the table with assignments data
    populateFilters(); // Populate the dropdown filters
});

// Add Event Listeners to Filters
document.getElementById("course-filter").addEventListener("change", filterTable);
document.getElementById("name-filter").addEventListener("change", filterTable);
document.getElementById("status-filter").addEventListener("change", filterTable);
document.getElementById("grade-filter").addEventListener("change", filterTable);


// Add Event Listener for Deadline Sorting
document.getElementById("deadline-header").addEventListener("click", () => {
    const header = document.getElementById("deadline-header");
    const isDescending = header.classList.toggle("descending");
    sortByDeadline(isDescending); // Toggle sorting direction
});
