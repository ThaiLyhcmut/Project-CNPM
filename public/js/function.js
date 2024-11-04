const buttonFile = document.querySelector(".form-save-file");

buttonFile.addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.target; // Lấy form HTML
  const formData = new FormData(form); // Khởi tạo FormData với đối tượng form

  if (formData) {
    console.log(formData)
    fetch("http://localhost:3000/api/file", 
    {
      method: "POST",
      body: formData // Send the form data containing the file
    })
    .then(res => res.json())
    .then(res => {
      console.log(res); // Log the response from the server
    })
    .catch(error => {
      console.error('Error:', error);
    });
  } else {
    console.log('No file selected');
  }
});
