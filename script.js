async function fetchCSV() {
    const response = await fetch('students.csv');
    const data = await response.text();
    return data;
}

function parseCSV(data) {
    const rows = data.split('\n').slice(1); // Skip the header row
    const students = rows.map(row => {
        const [certificate_number, name, domain, date] = row.split(',');
        return { certificate_number, name, domain, date };
    });
    return students;
}

async function lookupCertificate() {
    const certificateNumber = document.getElementById('certificateNumber').value;
    const csvData = await fetchCSV();
    const students = parseCSV(csvData);
    const student = students.find(s => s.certificate_number === certificateNumber);
    
    const detailsDiv = document.getElementById('studentDetails');
    if (student) {
        detailsDiv.innerHTML = `<p>Name: ${student.name}</p>
                                <p>Domain: ${student.domain}</p>
                                <p>Date: ${student.date}</p>`;
    } else {
        detailsDiv.innerHTML = `<p>Certificate number not found.</p>`;
    }
}
