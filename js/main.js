const elList = document.querySelector(".js-list");
const elSearch = document.querySelector(".js-search");
const elSort = document.querySelector(".js-sort");

let filtered = [];

const localCurrencies = window.localStorage.getItem(`token`);

let currencies = localCurrencies ? JSON.parse(localCurrencies) : [];

async function getDate(url) {
  try {
    const rawData = await fetch(url);
    const data = await rawData.json();
    currencies = data;
    window.localStorage.setItem(`token`, JSON.stringify(data));
  } catch (error) {
    console.error(error);
    console.error(`Internet uzildi`);
  }
}

getDate(`https://63ac6f2dda81ba9761845e34.mockapi.io/book`);

function renderArr(data) {
  elList.innerHTML = ''
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
  
    let newItem = document.createElement("div");
    newItem.id = element.id;
    newItem.classList.add("item");
  
    let newImage = document.createElement("img");
    newImage.src = element.avatar;
    newImage.width = 300;
    newImage.height = 200;
    newImage.classList.add("d-block");
  
    let newDiv = document.createElement("div");
    newDiv.classList.add("p-3");
  
    let newTitle = document.createElement("h3");
    newTitle.textContent = element.title;
    newTitle.classList.add("mt-0");
  
    let newDescription = document.createElement("p");
    newDescription.textContent = element.description;
    newDescription.classList.add("mt-0");
  
    let newPrise = document.createElement("p");
    newPrise.textContent = `${element.price}$`;
    newPrise.classList.add("mt-0");
  
    newItem.append(newImage, newDiv);
    newDiv.append(newTitle, newDescription, newPrise);
  
    elList.appendChild(newItem);
  }
}

renderArr(currencies)


// Search

elSearch.addEventListener("change", (evt) => {
  filtered = currencies.filter((el) =>
    el.title.toLowerCase().includes(evt.target.value)
  );
  if (filtered.length > 0) {
    renderArr(filtered)
  }
});


// Sort

const sortArr = [...currencies];

elSort.addEventListener(`change`, () => {
  sortArr.sort((a, b) => {
    if (a.price * 1 > b.price * 1) return 1;
    if (a.price * 1 < b.price * 1) return -1;
    return 0;
  });
  if (elSort.value === `expensive`) {
    renderArr(sortArr.reverse());
  } else if (elSort.value === `cheap`) {
    renderArr(sortArr);
  } else if (elSort.value === 'sort') {
    renderArr(currencies)
  }
});