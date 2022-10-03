let toggleMode = document.querySelector("header .container .them-mode");
let cssRoot = document.querySelector(":root");

let toggleModeTrigger = true;

toggleMode.onclick = function () {
  if (toggleModeTrigger) {
    cssRoot.style.setProperty("--dark-blue", "hsl(200, 15%, 8%)");
    cssRoot.style.setProperty("--v-dark-blue-d-m", "hsl(0, 0%, 98%)");
    cssRoot.style.setProperty("--v-dark-blue-l-m-t", "hsl(0, 0%, 100%)");
    cssRoot.style.setProperty("--dark-gray-l-m-in", "hsl(0, 0%, 52%)");
    cssRoot.style.setProperty("--v-light-gray-l-m-bg", "hsl(207, 26%, 17%)");
    cssRoot.style.setProperty("--white-d-m-t", "hsl(209, 23%, 22%)");
    toggleModeTrigger = false;
  } else {
    cssRoot.style.setProperty("--dark-blue", "hsl(209, 23%, 22%)");
    cssRoot.style.setProperty("--v-dark-blue-d-m", "hsl(207, 26%, 17%)");
    cssRoot.style.setProperty("--v-dark-blue-l-m-t", "hsl(200, 15%, 8%)");
    cssRoot.style.setProperty("--dark-gray-l-m-in", "hsl(0, 0%, 52%)");
    cssRoot.style.setProperty("--v-light-gray-l-m-bg", "hsl(0, 0%, 98%)");
    cssRoot.style.setProperty("--white-d-m-t", "hsl(0, 0%, 100%)");
    toggleModeTrigger = true;
  }
};

let region = "europe";
let myRequest = new XMLHttpRequest();

myReq();

function myReq() {
  myRequest.open("GET", `https://restcountries.com/v3.1/region/${region}`);
  myRequest.send();
}

document.getElementById("region").onchange = function () {
  region = document.getElementById("region").value;

  myReq();

  document.querySelector("#app .main-content .container").innerHTML = "";
  greatingCoun();
};

greatingCoun();

function greatingCoun() {
  myRequest.onreadystatechange = function () {
    if ((this.readyState === 4) & (this.status === 200)) {
      let myRspond = JSON.parse(this.responseText);

      for (let i = 0; i < myRspond.length; i++) {
        let countContainer = document.createElement("div");
        countContainer.className = "country-rapper";

        let counFlag = document.createElement("img");
        counFlag.className = "flag";
        counFlag.src = myRspond[i].flags.png;
        countContainer.appendChild(counFlag);

        let countInfoDiv = document.createElement("div");
        countInfoDiv.className = "country-info";

        let countName = document.createElement("h2");
        countName.className = "cn-name";
        countName.appendChild(
          document.createTextNode(
            myRspond[i].altSpellings[1] || myRspond[i].altSpellings[0]
          )
        );
        countInfoDiv.appendChild(countName);

        let countPopula = document.createElement("h3");
        countPopula.className = "cn-population";
        countPopula.appendChild(document.createTextNode("Population: "));

        let countPopulaSpan = document.createElement("span");
        countPopulaSpan.appendChild(
          document.createTextNode(myRspond[i].population)
        );
        countPopula.appendChild(countPopulaSpan);

        countInfoDiv.appendChild(countPopula);

        let countRegion = document.createElement("h3");
        countRegion.className = "cn-region";
        countRegion.appendChild(document.createTextNode("Region: "));

        let countRegionSpan = document.createElement("span");
        countRegionSpan.appendChild(
          document.createTextNode(myRspond[i].region)
        );
        countRegion.appendChild(countRegionSpan);

        countInfoDiv.appendChild(countRegion);

        let countCapital = document.createElement("h3");
        countCapital.className = "cn-capital";
        countCapital.appendChild(document.createTextNode("Capital: "));

        let countCapitalSpan = document.createElement("span");
        countCapitalSpan.appendChild(
          document.createTextNode(myRspond[i].capital[0])
        );
        countCapital.appendChild(countCapitalSpan);

        countInfoDiv.appendChild(countCapital);

        countContainer.appendChild(countInfoDiv);

        document
          .querySelector("#app .main-content .container")
          .appendChild(countContainer);
      }
    }
  };
}
