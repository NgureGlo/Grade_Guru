document.addEventListener('DOMContentLoaded', async () => {
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
      document.getElementById('stdreport_nav').style.display = 'block';
      document.getElementById('stdreport').style.display = 'block';
      document.getElementById('stdprediction_nav').style.display = 'block';
      document.getElementById('stdprediction').style.display = 'block';
    }
    else{
      document.getElementById('stdreport_nav').style.display = 'none';
      document.getElementById('stdreport').style.display = 'none';
      document.getElementById('stdprediction_nav').style.display = 'none';
      document.getElementById('stdprediction').style.display = 'none';
    }
    await setUpStudentDetails();
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

async function setUpStudentDetails(){
    const studentData = await getUserDetails(uid);
    const userRegNo = document.getElementById('studentRegNo');
    userRegNo.innerText = studentData.reg_no
    loadStudentPerformance(studentData.reg_no)
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
        console.log('body', body);
        student_data = processData(body.data)
        createChart(student_data, student_reg_no);
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