var header = document.createElement("h2");
header.innerHTML = "Click on Page Numbers";

document.body.append(header);

var info = document.createElement("div");
info.className = "pagination";

info.innerHTML = `
<table id="userTable">
<tr>
  <th>S.No</th>
  <th>Name</th>
  <th>Email</th>
</tr>
<tbody id="userdetails"></tbody>
</table>
<div>
<ul>
  <li><a href="#">First</a></li>
  <li><a href="#">1</a></li>
  <li><a href="#">2</a></li>
  <li><a href="#">3</a></li>
  <li><a href="#">4</a></li>
  <li><a href="#">5</a></li>
  <li><a href="#">6</a></li>
  <li><a href="#">7</a></li>
  <li><a href="#">8</a></li>
  <li><a href="#">9</a></li>
  <li><a href="#">10</a></li>
  <li><a href="#">Next</a></li>
</ul>
</div>
`;
document.body.append(info);

var userData; // data to be retrieved from the json file
// read JSON file
function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

readTextFile("./user.json", function (data) {
  userData = JSON.parse(data);
});

var currentPage = 0; //  page count

// To display records

function displayPage(pageNum) {
  var startIndex = (pageNum - 1) * 10;
  var endIndex = startIndex + 10;
  var pageWiseUserData = userData.slice(startIndex, endIndex);

  for (var i = 0; i < pageWiseUserData.length; i++) {
    createUser(pageWiseUserData, i);
  }

  // To create data table
  function createUser(pageWiseUserData, i) {
    const info = document.createElement("tr");
    var outputTable = document.getElementById("userdetails");
    info.innerHTML = `
     
      <td>${pageWiseUserData[i].id}</td>
      <td>${pageWiseUserData[i].name}</td>
      <td>${pageWiseUserData[i].email}</td>
      `;
    outputTable.appendChild(info);
    console.log(info);
  }
}

// To get page Number
document.querySelector("ul").onclick = function (e) {
  var pageNum = e.target.textContent;
  console.log(pageNum);
  var acheck = document.querySelector("ul li a.active"); // to check active Page Number
  if (acheck) {
    document.querySelector("ul li a.active").classList.remove("active");
  }
  e.target.classList.add("active");

  var outputTable = document.getElementById("userdetails");
  outputTable.innerHTML = ""; // to empty the table
  // First Page
  if (pageNum === "First") {
    pageNum = 1;
  }
  // Next Page
  else if (pageNum === "Next") {
    pageNum = currentPage + 1;
  }
  if (pageNum > 10) {
    pageNum = 1;
  }
  currentPage = +pageNum;
  displayPage(pageNum);
};