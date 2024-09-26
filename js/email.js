// Send Email
function sendEnquiry() {
    // Get form fields
    var name = document.getElementById("e-name").value;
    var email = document.getElementById("e-email").value;
    var need_help = document.getElementById("e-help").value;
    var message = document.getElementById("e-message").value || ""; // Set to empty string if no message
  
    // Email validation
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
   // console.log("Fetching IP address...");
  
    // Fetch IP address
    fetch('https://api.ipify.org?format=json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch IP address: ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        var ipAddress = data.ip;
        //console.log("IP address fetched:", ipAddress);
        //console.log("Fetching location data for IP address:", ipAddress);
  
        return fetch('https://ipapi.co/' + ipAddress + '/json/');
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch location data: ' + response.statusText);
        }
        return response.json();
      })
      .then(locationData => {
        //console.log("Location data fetched:", locationData);
  
        var location = locationData.city + ', ' + locationData.region + ', ' + locationData.country_name;
  
        // Prepare the parameters
        var params = {
          name: name,
          email: email,
          help: need_help,
          message: message,
          
          ip: locationData.ip,
          location: location
        };
  
        //console.log("Sending email with parameters:", params);
  
        // Send the email
        emailjs
          .send("service_ljxdvup", "template_b2nwfbt", params)
          .then((res) => {
            //console.log("Email sent successfully:", res);
            alert("Thank you for your submission. We will be in touch shortly")
          })
          .catch((err) => {
            //console.error("Failed to send email:", err);
            alert("Failed to send message.");
          });
      })
      .catch(error => {
        //console.error('Error fetching IP information:', error);
        alert("Unable to fetch IP information.");
      });
  }

  // Send Email
  function joinNow() {
    // Get form fields
    var name = document.getElementById("j-name").value; 
    var email = document.getElementById("j-email").value; 
    var qualification = document.getElementById("qualification").value;
    var message = document.getElementById("j-message").value || ""; // Set to empty string if no message
    var resume = document.getElementById("j-resume").files[0]; // Get the resume file
  
    // Email validation
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    // Resume validation (file size check)
    if (!resume) {
      alert("Please upload your resume.");
      return;
    }
      
    // Check if file size exceeds 50KB
    if (resume.size > 50 * 1024) {  // 50KB limit
      alert("File size must be less than or equal to 50KB.");
      return;
    }
  
    // Read file as Base64
    var reader = new FileReader();
    reader.onload = function(event) {
      var base64Resume = event.target.result;
  
      // Prepare the parameters (removing IP and location)
      var params = {
        name: name,
        email: email,
        qualification: qualification,
        message: message,
        resume: base64Resume // Attach resume as base64
      };
  
      // Send the email
      emailjs
        .send("service_ljxdvup", "template_5xtm3pr", params)
        .then((res) => {
          alert("Thank you for your submission. We will be in touch shortly.");
        })
        .catch((err) => {
          alert("Failed to send message.");
          console.log(err);
        });
    };
  
    // Read the file as base64
    reader.readAsDataURL(resume);
  }
  

  
  // Ensure emailjs is initialized correctly
  (function() {
    emailjs.init("n4d0NV2jrdQ-1Wl5g"); // Replace with your EmailJS user ID
  })();
  