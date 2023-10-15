const url = "http://api.weatherapi.com/v1/current.json";
const key = "9474155d63654641818224523230410";
let query = "new york, NY";
let currentSystem = "f";
getData(query);

const loadBlur = document.querySelector(".blurred");

const systemBtn = document.querySelector(".measurement-system");
const searchBar = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");

async function getData(query) {
  try {
    const request = `${url}?key=${key}&q=${query}`;
    const response = await fetch(request, { mode: "cors" });
    const data = await response.json();

    if (response.status !== 200) {
      throw "Something went wrong! Please try again.";
    } else {
      displayData(data);
      loadBlur.classList.remove("blurred");
    }
  } catch (error) {
    alert(error);
  }
  return query;
}

searchBtn.addEventListener("click", () => {
  loadBlur.classList.add("blurred");
  query = searchBar.value;
  getData(query);
});

systemBtn.addEventListener("click", toggleSystem);

function displayData(data) {
  searchBar.value = "";
  const { name, country } = data.location;
  const region = checkRegion(data);
  const { icon, text } = data.current.condition;
  const temp = getTemp(data);
  const feelsLike = getFeelsLike(data);
  const { humidity } = data.current;
  const wind = getWind(data);
  document.querySelector(".name").textContent = `${name},`;
  document.querySelector(".region").innerHTML = `&nbsp;${region}`;
  document.querySelector(".country").textContent = country.toUpperCase();
  document.querySelector(".temp").innerHTML = `${Math.round(
    temp
  )}&deg; ${currentSystem.toUpperCase()}`;
  document.querySelector(".icon").src = icon;
  document.querySelector(".description").textContent = text.toUpperCase();
  document.querySelector(
    ".feels-like"
  ).innerHTML = `Feels Like: &nbsp;${Math.round(
    feelsLike
  )}&deg; ${currentSystem.toUpperCase()}`;
  document.querySelector(
    ".humidity"
  ).innerHTML = `Humidity: &nbsp;${humidity}%`;
  document.querySelector(".wind").innerHTML = `Wind Speed: &nbsp;${wind}`;
}

function getTemp(data) {
  return currentSystem === "f" ? data.current.temp_f : data.current.temp_c;
}

function getFeelsLike(data) {
  return currentSystem === "f"
    ? data.current.feelslike_f
    : data.current.feelslike_c;
}

function getWind(data) {
  return currentSystem === "f"
    ? `${Math.round(data.current.wind_mph)} mph`
    : `${Math.round(data.current.wind_kph)} kph`;
}

function checkRegion(data) {
  let region = data.location.region;
  if (region.includes(",")) {
    region = region.split(",")[1].trim();
  }
  return region;
}

function toggleSystem() {
  const metric = document.querySelector(".metric");
  const imperial = document.querySelector(".imperial");
  metric.classList.remove("active");
  imperial.classList.remove("active");

  if (currentSystem === "f") {
    currentSystem = "c";
    metric.classList.add("active");
  } else {
    currentSystem = "f";
    imperial.classList.add("active");
  }
  getData(query);
}
