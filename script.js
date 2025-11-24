// ------ SIMPLE CUSTOM CURSOR ------
document.body.style.cursor = "none";

const cursor = document.createElement("div");
cursor.id = "cursor";
document.body.appendChild(cursor);

window.addEventListener("mousemove", (e) => {
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
});

// ------ CLOUDINARY UPLOAD ------
async function uploadImage() {
  const fileInput = document.getElementById("fileInput");
  const resultBox = document.getElementById("uploadResult");

  if (!fileInput.files.length) {
    resultBox.innerHTML = `<p style="color:red;">Please select a file first.</p>`;
    return;
  }

  const file = fileInput.files[0];
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "harshil_upload"); 
  formData.append("api_key", "138666221231381");
  formData.append("timestamp", Math.floor(Date.now() / 1000));

  resultBox.innerHTML = "Uploading...";

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dkfiwqw9b/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.secure_url) {
      resultBox.innerHTML = `
        <p style="color:#0f0;">Uploaded Successfully ✔</p>
        <img src="${data.secure_url}" style="width:200px; border-radius:10px;">
        <p><strong>Permanent URL:</strong></p>
        <input value="${data.secure_url}" style="width:100%; padding:10px;">
      `;
    } else {
      resultBox.innerHTML = `<p style="color:red;">Upload failed.</p>`;
    }
  } catch (error) {
    resultBox.innerHTML = `<p style="color:red;">Error uploading.</p>`;
  }
}
