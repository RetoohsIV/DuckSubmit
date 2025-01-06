document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // This has to be put into backend
    const validUsername1 = "student1";
    const validPassword1 = "student1";
    const validUsername2 = "student2";
    const validPassword2 = "student2";
    const validTutor1 = "tutor1";
    const validTutorPw1 = "tutor1";
  
    
    if ((username === validUsername1 && password === validPassword1) || (username === validUsername2 && password === validPassword2)) {
      console.log("Login successful!");
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);

      window.location.href = 'mainpage.html';
    } else if(username === validTutor1 && password === validTutorPw1){
      console.log("Login successful!");
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);

      window.location.href = 'tutorpage.html';
    } else {
      alert("Invalid username or password. Please try again.");
    }
});
