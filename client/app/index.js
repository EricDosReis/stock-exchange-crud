const fields = [
  document.querySelector('#date'),
  document.querySelector('#value'),
  document.querySelector('#amount'),
];

const negotiationsContainer = document.querySelector('#negotiationsContainer');

document
  .querySelector('.form')
  .addEventListener('submit', (event) => {
    event.preventDefault()

    const tr = document.createElement('tr');
    const tdVolume = document.createElement('td');

    fields.forEach((field) => {
      const td = document.createElement('td');

      td.textContent = field.value;
      tr.appendChild(td);
    });

    tdVolume.textContent = calculateVolume(fields[1].value, fields[2].value);
    tr.appendChild(tdVolume);

    negotiationsContainer.appendChild(tr);
    clearForm();
  })

function calculateVolume(value, amount) {
  return value * amount;
}

function clearForm() {
  fields[0].value = '';
  fields[1].value = 1;
  fields[2].value = 0;
}
