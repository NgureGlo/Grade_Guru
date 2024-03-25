document.addEventListener('DOMContentLoaded', () => {
    if (role != 'Administrator'){
      document.getElementById('manage_users').style.display = 'none';
    }
    if (role === 'Student'){
        document.getElementById('course').style.display = 'none';
        document.getElementById('student').style.display = 'none';
        document.getElementById('course_nav').style.display = 'none';
        document.getElementById('student_nav').style.display = 'none';
        document.getElementById('prediction').style.display = 'none';
        document.getElementById('prediction_nav').style.display = 'none';
        document.getElementById('reports').style.display = 'none';
        document.getElementById('reports_nav').style.display = 'none';
        document.getElementById('stdreport_nav').style.display = 'block';
        document.getElementById('stdreport').style.display = 'block';
        document.getElementById('stdprediction_nav').style.display = 'block';
        document.getElementById('stdprediction').style.display = 'block';
      }
      else{
        document.getElementById('stdreport_nav').style.display = 'none';
        document.getElementById('stdreport').style.display = 'none';
        document.getElementById('stdprediction_nav').style.display = 'none';
        // document.getElementById('stdprediction').style.display = 'none';
      }
  })

function toggleMenu() {
    const blurLayer = document.getElementById('blur-layer');
    var menu = document.getElementById("menu");
    if (menu.style.display === "block") {
      menu.style.display = "none";
      blurLayer.style.display = "none"
    } else {
      menu.style.display = "block";
      blurLayer.style.display = "block"
    }
  }


document.addEventListener('DOMContentLoaded', () => {

    select_student = document.getElementById("student-select")
    select_student.addEventListener('change', () =>{
        loadStudentPerformance(select_student.value);
    })

    select_course = document.getElementById("course-select")
    select_course.addEventListener('change', () =>{
        loadCoursePerformance(select_course.value);
    })

    level_select = document.getElementById("level-select")
    level_select.addEventListener('change', () =>{
        loadCourselevelPerformance(level_select.value);
    })


    loadStudents();
    loadCourses();

})


function loadStudents() {
let url = '';
if(role == 'Administrator'){
    url = 'http://127.0.0.1:5000/view_students';
}else{
    url = `http://127.0.0.1:5000/lecturer_students/${uid}`;
}

fetch(url, {
    method: 'GET',
    headers: {
        "Content-type": "application/json"
    },
    }).then(res =>{
    return res.json()
    } )
    .then((body) => {

    // Populate student select dropdown
    const studentSelect = document.getElementById('student-select');
    body.data.forEach(student => {
        const option = document.createElement('option');
        option.value = student.reg_no;
        option.textContent = student.reg_no;
        studentSelect.appendChild(option);
    });

    console.log(body);
    })  
}


function loadCourses() {
let url = '';
if(role == 'Administrator'){
    url = 'http://127.0.0.1:5000/courses';
}else{
    url = `http://127.0.0.1:5000/lecturer_courses/${uid}`;
}

fetch(url, {
    method: 'GET',
    headers: {
        "Content-type": "application/json"
    },
    }).then(res =>{
    return res.json()
    } )
    .then((body) => {

    // Populate course select dropdown
    const courseSelect = document.getElementById('course-select');
    body.data.forEach(course => {
        const option = document.createElement('option');
        option.value = course.course_code;
        option.textContent = course.course_code;
        courseSelect.appendChild(option);
    });

    console.log(body);
    })  
}

function loadStudentPerformance(student_reg_no){
let url = 'http://127.0.0.1:5000/student_predictions';

fetch(url, {
    method: 'POST',
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify({
        "reg_no": student_reg_no
    })
}).then(res => {
    return res.json()
})
.then((body) => {
    student_data = processData(body.data)
    createChart(student_data, student_reg_no);
})
}

function loadCoursePerformance(course_code){
let url = 'http://127.0.0.1:5000/course_predictions';

fetch(url, {
    method: 'POST',
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify({
        "course_code": course_code
    })
}).then(res => {
    return res.json()
})
.then((body) => {
    student_data = processCourseData(body.data)
    createAverageChart(student_data, course_code);
})
}

function loadCourselevelPerformance(course_level){
let url = 'http://127.0.0.1:5000/courselevel_predictions';

fetch(url, {
    method: 'POST',
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify({
        "course_level": course_level
    })
}).then(res => {
    return res.json()
})
.then((body) => {
    student_data = processLevelData(body.data)
    createAverageCourseLevelChart(student_data, course_level);
})
}

// creating student performance chart 
function getRandomColor() {
    // Generate random values for RGB components
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // Construct the color string in hexadecimal format
    return '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
}

// creating student performance chart 
function processData(data) {
    const examData = {};
    const examCount = {}; // Keep track of the number of exams for each course

    // Process the data and calculate average expected exam scores
    data.forEach(entry => {
        if (!examData[entry.course_code]) {
            examData[entry.course_code] = 0;
            examCount[entry.course_code] = 0;
        }
        examData[entry.course_code] += entry.expected_exam;
        examCount[entry.course_code]++;
    });

    // Calculate average expected exam scores for each course
    for (const courseCode in examData) {
        examData[courseCode] /= examCount[courseCode];
    }

    return examData;
}

var examChart = null;

function createChart(data, reg_no) {
    if (!data || Object.keys(data).length === 0) {
        showEmptyMessage();

        // Destroy the existing chart instance if it exists
        if (examChart) {
            examChart.destroy();
            examChart = null;
        }
        return;
    }

    hideEmptyMessage();

    const labels = [];
    const examScores = [];
    const backgroundColors = [];

    // Extract labels and exam scores
    for (const [courseCode, averageScore] of Object.entries(data)) {
        labels.push(courseCode);
        examScores.push(averageScore);
        backgroundColors.push(getRandomColor()); // Generate random color for each bar
    }

    // Create the chart with the data
    if (examChart) {
        examChart.destroy();
        examChart = null;
    }

    examChart = new Chart(document.getElementById('student-performance-chart'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Average Expected Exam Score',
                data: examScores,
                backgroundColor: backgroundColors,
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: reg_no, // Specify your graph title here
                    font: {
                        size: 20 // Adjust the font size as needed
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Average Expected Exam Score' // Specify your label text here
                    }
                },
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Course Code' // Specify your label text here
                    }
                }
            }
        }
    });

    // Add click event listener to download button
    const studentDownloadButton = document.getElementById('studentDownloadButton');
    studentDownloadButton.addEventListener('click', function() { downloadPDF(examChart) });
}


function showEmptyMessage() {
    const emptyMessage = document.getElementById('emptyMessage');
    emptyMessage.style.display = 'block';
}

function hideEmptyMessage() {
    const emptyMessage = document.getElementById('emptyMessage');
    emptyMessage.style.display = 'none';
}

// creating average performance by course chart

function processCourseData(data) {
    const examData = {};
    data.forEach(entry => {
        if (!examData[entry.reg_no]) {
            examData[entry.reg_no] = [];
        }
        examData[entry.reg_no].push(entry.expected_exam);
    });
    return examData;
}

var averageChart = null;

function createAverageChart(data, course_code) {
    if (!data || Object.keys(data).length === 0) {
        showEmptyAverageMessage();

        // Destroy the existing chart instance if it exists
        if (averageChart) {
            averageChart.destroy();
            averageChart = null;
        }
        return;
    }

    hideEmptyAverageMessage();

    const backgroundColors = [];

    const labels = Object.keys(data);
    const averages = labels.map(student_reg_no => {
        const scores = data[student_reg_no];
        const sum = scores.reduce((acc, val) => acc + val, 0);
        backgroundColors.push(getRandomColor()); // Generate random color for each bar
        return sum / scores.length;
    });

    // Destroy the existing chart instance if it exists
    if (averageChart) {
        averageChart.destroy();
        averageChart = null;
    }

    averageChart = new Chart(document.getElementById('course-performance-chart'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Average Score',
                data: averages,
                backgroundColor: backgroundColors,
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: course_code, // Specify your graph title here
                    font: {
                        size: 20 // Adjust the font size as needed
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Expected Scores' // Specify your label text here
                    }
                },
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Registration Numbers' // Specify your label text here
                    }
                }
            }
        }
    });

    // Add click event listener to download button
    const studentDownloadButton = document.getElementById('courseDownloadButton');
    studentDownloadButton.addEventListener('click', function() { downloadPDF(averageChart) });
}



function showEmptyAverageMessage() {
    const emptyMessage = document.getElementById('emptyAverageMessage');
    emptyMessage.style.display = 'block';
}

function hideEmptyAverageMessage() {
    const emptyMessage = document.getElementById('emptyAverageMessage');
    emptyMessage.style.display = 'none';
}

// creating average course level performance chart

function processLevelData(data) {
    const examData = {};
    data.forEach(entry => {
        if (!examData[entry.course_code]) {
            examData[entry.course_code] = [];
        }
        examData[entry.course_code].push(entry.expected_exam);
    });
    return examData;
}

var averageCourseLevelChart = null;

function createAverageCourseLevelChart(data, course_level) {
    if (!data || Object.keys(data).length === 0) {
        showEmptyAverageLevelMessage();

        // Destroy the existing chart instance if it exists
        if (averageCourseLevelChart) {
            averageCourseLevelChart.destroy();
            averageCourseLevelChart = null;
        }
        return;
    }

    hideEmptyAverageLevelMessage();

    const backgroundColors = [];

    const labels = Object.keys(data);
    const averages = labels.map(courseCode => {
        const scores = data[courseCode];
        const sum = scores.reduce((acc, val) => acc + val, 0);
        backgroundColors.push(getRandomColor()); // Generate random color for each bar
        return sum / scores.length;
    });

    // Destroy the existing chart instance if it exists
    if (averageCourseLevelChart) {
        averageCourseLevelChart.destroy();
        averageCourseLevelChart = null;
    }

    averageCourseLevelChart = new Chart(document.getElementById('level-performance-chart'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Average Score',
                data: averages,
                backgroundColor: backgroundColors,
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: course_level, // Specify your graph title here
                    font: {
                        size: 20 // Adjust the font size as needed
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Expected Scores' // Specify your label text here
                    }
                },
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Course Code' // Specify your label text here
                    }
                }
            }
        }
    });

    // Add click event listener to download button
    const studentDownloadButton = document.getElementById('levelDownloadButton');
    studentDownloadButton.addEventListener('click', function() { downloadPDF(averageCourseLevelChart) });
}


function showEmptyAverageLevelMessage() {
    const emptyMessage = document.getElementById('emptyAverageLevelMessage');
    emptyMessage.style.display = 'block';
}

function hideEmptyAverageLevelMessage() {
    const emptyMessage = document.getElementById('emptyAverageLevelMessage');
    emptyMessage.style.display = 'none';
}

function downloadPDF (chart){
    const { jsPDF } = window.jspdf;
    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Convert the chart canvas to an image data URL
    const chartDataURL = chart.toBase64Image();

    // Add the image to the PDF document
    pdf.addImage(chartDataURL, 'PNG', 10, 10, 180, 100); // Adjust dimensions as needed

    // Save the PDF file
    pdf.save('chart.pdf');
}

