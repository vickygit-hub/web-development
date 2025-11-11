
const redbox = document.getElementById('Red-box');
const bluebox = document.getElementById('Blue-box');
const greenbox = document.getElementById('Green-box');
const yellowbox = document.getElementById('Yellow-box');


redbox.addEventListener('click', () => {
  redbox.style.backgroundColor = 'red';
});

bluebox.addEventListener('click', () => {
  bluebox.style.backgroundColor = 'blue';
});

greenbox.addEventListener('click', () => {
  greenbox.style.backgroundColor = 'green';
});

yellowbox.addEventListener('click', () => {
  yellowbox.style.backgroundColor = 'yellow';
});

document.querySelectorAll('.box').forEach(box =>{ 
  box.addEventListener('dblclick', () => {
    box.style.backgroundColor = 'white';
  })
})

const header = document.querySelector('.header h2');

const form = document.getElementById('greet-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nameInput = document.getElementById('name');
  const name = nameInput.value;
  header.textContent = `Hello, ${name}!`;
  nameInput.value = '';
})