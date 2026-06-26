const photoInput = document.getElementById("photoUpload");
const videoInput = document.getElementById("videoUpload");
const previewContainer = document.getElementById("previewContainer");

let selectedFiles = [];

photoInput.addEventListener("change", function() {
  handleFiles(this.files);
  this.value = "";
});

videoInput.addEventListener("change", function() {
  handleFiles(this.files);
  this.value = "";
});

function handleFiles(files) {
  
  [...files].forEach(file => {
    
    // Reject PNG
    if (file.type === "image/png") {
      alert(file.name + " is PNG.\nPNG images are not allowed.");
      return;
    }
    
    // Video limit
    if (file.type.startsWith("video/")) {
      
      if (file.size > 300 * 1024 * 1024) {
        alert(file.name + " exceeds 50MB.");
        return;
      }
      
    }
    
    selectedFiles.push(file);
    
  });
  
  renderPreview();
  
}

function renderPreview() {
  
  previewContainer.innerHTML = "";
  
  selectedFiles.forEach((file, index) => {
    
    const url = URL.createObjectURL(file);
    
    const item = document.createElement("div");
    item.className = "preview-item";
    
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove-btn";
    remove.innerHTML = "&times;";
    
    remove.onclick = function() {
      
      selectedFiles.splice(index, 1);
      renderPreview();
      
    };
    
    if (file.type.startsWith("image/")) {
      
      const img = document.createElement("img");
      img.src = url;
      item.appendChild(img);
      
    }
    
    else if (file.type.startsWith("video/")) {
      
      const video = document.createElement("video");
      video.src = url;
      video.controls = true;
      item.appendChild(video);
      
    }
    
    item.appendChild(remove);
    
    previewContainer.appendChild(item);
    
  });
  
}