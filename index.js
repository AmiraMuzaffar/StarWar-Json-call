// Import stylesheets
import './style.css';
import search from './search.js';

const search = async (search = '', page = 1) => {
  const response = await axios.get('https://swapi.dev/api/people/', {
    params: { search, page },
  });
  return response.data;
};

//onload display data
search().then((res) => {
  if (res !== undefined) {
    (res.results || []).forEach((ele, i) => {
      var div = document.createElement('div');
      div.classList.add('box');
      const dataNode = document.createTextNode(ele.name + ' ' + ele.birth_year);
      div.appendChild(dataNode);
      document.getElementById('main').appendChild(div);
    });
  }
  console.log(res);
});

//toggle List/Grid
const listGrid = document.getElementById('list');
listGrid.addEventListener('click', () => {
  const initialText = 'List';
  if (listGrid.textContent.includes(initialText)) {
    listGrid.innerHTML = `<span>Grid </span>`;
  } else {
    listGrid.textContent = initialText;
  }
  const getElement = document.getElementsByClassName('box');
  for (let i = 0; i < getElement.length; i++) {
    getElement[i].classList.toggle('listStyle');
  }
});

//remove child div
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

//updating search result
const searchRef = document.getElementById('searchText');
const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', () => {
  const container = document.querySelector('#main');
  removeAllChildNodes(container);
  const text = document.getElementById('searchText').value;
  const result = search(text);

  const data = result.then((res) => {
    if (res !== undefined) {
      (res.results || []).forEach((ele, i) => {
        var div = document.createElement('div');
        div.classList.add('box');
        const dataNode = document.createTextNode(
          ele.name + ' ' + ele.birth_year
        );
        div.appendChild(dataNode);
        document.getElementById('main').appendChild(div);
      });
    } else {
      console.log('No Promise');
    }
  });
});

const previous = document.getElementById('prev');
const next = document.getElementById('next');

// document.getElementById("search").addEventListener("click", find((item)=>{
//   var collection =document.getElementById("search");
//   for( i =0; i<collection.length; i++){
//     if((collection[i].innerHTML).indexOf(item) > -1){
//       collection[i].style.display ="block"
//     }else{
//       collection[i].style.display="none";
//     }
//   }
// }));
