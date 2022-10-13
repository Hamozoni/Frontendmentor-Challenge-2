let toggleMode = document.querySelector("header .container .them-mode");
let cssRoot = document.querySelector(":root");
let modeIcon = document.querySelector("header .container .them-mode .m-icon");
let modeText = document.querySelector(
  "header .container .them-mode .dark-light"
);
let filterRegion = document.getElementById("region");
let myContent = "";
let search = [];
let searchB = [];

let myRequest = new XMLHttpRequest();
myReq(`https://restcountries.com/v2/all`);

function myReq(link) {
  myRequest.open("GET", `${link}`);
  myRequest.send();
};

if (window.localStorage.getItem("them") === null) {
  window.localStorage.setItem("them", "true");
};

themTragger();

toggleMode.onclick = function () {
  if (window.localStorage.getItem("them") === "true") {
    window.localStorage.setItem("them", "false");
  } else if (window.localStorage.getItem("them") === "false") {
    window.localStorage.setItem("them", "true");
  }
  themTragger();
};

function themTragger() {
  if (window.localStorage.getItem("them") === "true") {
    cssRoot.style.setProperty("--dark-blue", "hsl(209, 23%, 22%)");
    cssRoot.style.setProperty("--v-dark-blue-d-m", "hsl(207, 26%, 17%)");
    cssRoot.style.setProperty("--v-dark-blue-l-m-t", "hsl(200, 15%, 8%)");
    cssRoot.style.setProperty("--dark-gray-l-m-in", "hsl(0, 0%, 52%)");
    cssRoot.style.setProperty("--v-light-gray-l-m-bg", "hsl(0, 0%, 98%)");
    cssRoot.style.setProperty("--white-d-m-t", "hsl(0, 0%, 100%)");
    modeIcon.src = "icons/nightlight_round.svg";
    modeText.innerHTML = "dark mode";
  } else {
    cssRoot.style.setProperty("--dark-blue", "hsl(200, 15%, 8%)");
    cssRoot.style.setProperty("--v-dark-blue-d-m", "hsl(0, 0%, 98%)");
    cssRoot.style.setProperty("--v-dark-blue-l-m-t", "hsl(0, 0%, 100%)");
    cssRoot.style.setProperty("--dark-gray-l-m-in", "hsl(0, 0%, 52%)");
    cssRoot.style.setProperty("--v-light-gray-l-m-bg", "hsl(207, 26%, 17%)");
    cssRoot.style.setProperty("--white-d-m-t", "hsl(209, 23%, 22%)");
    modeIcon.src = "icons/light-mode.png";
    modeText.innerHTML = "light mode";
  };
};

greatingCoun();

function greatingCoun() {
  myRequest.onreadystatechange = function () {
    if ((this.readyState === 4) & (this.status === 200)) {
      myRspond = JSON.parse(this.responseText);
      create(myRspond, myContent);
    };
  };
};

function create(arrey, el) {
  if (document.querySelector("nav").style.display === "none") {
    document.querySelector("nav").style.display = "block";
  }
  for (let i = 0; i < arrey.length; i++) {
    el += `
    <div class="country-rapper">
      <img onclick="moreDetail(${i})"  class="flag" src="${arrey[i].flags.png}" alt="${arrey[i].name}">
      <div class="country-info">
          <h2 class="cn-name">${arrey[i].name}</h2>
          <h3 class="cn-population"> Population: <span> ${arrey[i].population}</span></h3>
          <h3 class="cn-region"> Region: <span>${arrey[i].region}</span></h3>
          <h3 class="cn-capital"> Capital: <span> ${arrey[i].capital}</span></h3>
      </div>
    </div>`;
    document.querySelector("#app .main-content .container").innerHTML = el;
  };
};

function backWard(arrey, el) {
  el = "";
  create(arrey, el);
};

function searhCountry(value) {
  searchB = [];
  for (let i = 0; i < myRspond.length; i++) {
    if (myRspond[i].name.toLowerCase().includes(value.toLowerCase())) {
      searchB.push(myRspond[i]);
    };
  };
  myContent = "";
  create(searchB, myContent);
};

filterRegion.onchange = function () {
  searchB = [];
  for (let i = 0; i < myRspond.length; i++) {
    if (myRspond[i].region.toLowerCase().includes(filterRegion.value.toLowerCase())) {
      searchB.push(myRspond[i]);
    };
  };
  myContent = "";
  create(searchB, myContent);
};

function moreDetail(i) {
  if (searchB.length < 1) {
    search = myRspond;
  } else {
    search = searchB;
  };
  filterRegion.value = "";
  myContent = `
    <div class="coutry-detail">
    <button onclick="backWard (search,myContent) " id="back-btn"><img src="icons/left-arrow.png" alt="back"> back</button>
    <div class="details">
        <div class="image">
        <img src="${search[i].flags.png}" alt="${search[i].name}">
        </div>
        <section class="info">
            <div class="right-info">
                <h2 class="name">${search[i].name}</h2>
                <h3 class="native">native name: <span> ${search[i].nativeName} </span></h3>
                <h3 class="cn-population"> Population: <span> ${search[i].population}</span></h3> 
                <h3 class="region">region: <span>${search[i].region} </span></h3> 
                <h3 class="sub-region">sub region: <span> ${search[i].subregion}</span></h3> 
                <h3 class="capital">capital: <span>${search[i].capital}</span></h3> 
            </div>
            <div class="info-rest">
                <h3 class="domain">top level domain: <span>${search[i].topLevelDomain}</span></h3> 
                <h3 class="currency">currencies: <span>${search[i].currencies[0].code}</span></h3> 
                <h3 class="lang">languages: <span>${search[i].languages[0].iso639_2}</span></h3>
            </div>
            <div class="border">
                <h3>border: <span>${search[i].borders[0] || search[i].topLevelDomain} </span> <span>${search[i].borders[1] || search[i].topLevelDomain}</span> <span>${search[i].borders[2] || search[i].topLevelDomain}</span></h3>
            </div>
        </section>
    </div>
  </div>`;
  document.querySelector("nav").style.display = "none";
  document.querySelector("#app .main-content .container").innerHTML = myContent;
};
