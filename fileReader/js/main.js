let filein = document.querySelector("#fileinput");
let imgsWrapper = document.querySelector("#imgs-wrapper");
let uploadArea = document.querySelector(".upload-area");

uploadArea.addEventListener("click", function () {
  filein.click();
});

uploadArea.ondragover = function (e) {
  e.preventDefault();
  uploadArea.style.border= "5px dashed red";
};
uploadArea.ondragleave = function (e) {
    uploadArea.style.border= "0px dashed red";
};

uploadArea.ondrop = function (e) {
  e.preventDefault();
  renderImages(e.dataTransfer.files);
  uploadArea.style.border= "0px dashed red";
};

filein.addEventListener("change", function (event) {
  renderImages(event.target.files);
});

function renderImages(files) {
  imgsWrapper.innerHTML = "";
  for (const file of files) {
    let fileReader = new FileReader();

    fileReader.onload = function (event) {
      let h2 = document.createElement("h2");
      h2.classList.add("mt-5");
      h2.innerText = file.name;

      let p = document.createElement("p");
      p.innerText = Math.round((file.size / (1024 * 1024)) * 100) / 100 + " mb";

      let img = document.createElement("img");
      img.setAttribute("src", event.target.result);
      img.classList.add("w-100", "d-block");

      imgsWrapper.append(h2);
      imgsWrapper.append(p);
      imgsWrapper.append(img);
    };

    fileReader.readAsDataURL(file);
  }
}
