// capturar datos fetch: funcion async
// datos que necesito: name,flags, car, population,capital
// URL fetch: https://restcountries.com/v3.1/all?fields=name,flags,car,population,capital
// Ordenar países: Método .sort Pasar a mayúsculas todos para comparar
// Necesito un template de bandera + país que cuando haga click se añadan capital, población, lado carretera y botón cerrar
// Capturar area donde poner las cards
// ventana flotante?

const cardArea = document.getElementById('countries-list');

const getCountries = async () => {
    try { const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,car,population,capital')
        if(!response.ok) {
            throw new Error('Error en la petición' + response.status) 
        }
        const data = await response.json()
        //console.log(data)
        return data
    }
    catch (error) {console.log(error)};
}


// Card template

const template = (data) => {
    data.sort((a,b) => a.name.common.localeCompare(b.name.common));
    for (let country of data) {
    const card = document.createElement('div')
    card.className = 'country-card'
    const img = document.createElement('img');
    img.src = country.flags.png;
    img.alt = country.name.common;
    const h2 = document.createElement('h2');
    h2.textContent = country.name.common;

    card.appendChild(img);
    card.appendChild(h2);
    card.addEventListener('click', () => {
        mostrarModal(country);
    });
    cardArea.appendChild(card)
    } 
};

getCountries().then(template);

// Función para mostrar el modal
const mostrarModal = (country) => {
  // Aquí rellenaremos los datos
  document.getElementById('modal-name').textContent = country.name.common;
  document.getElementById('modal-flag').src = country.flags.png;
    document.getElementById('modal-capital').textContent = country.capital ? country.capital[0] : 'Sin capital';
    document.getElementById('modal-population').textContent = country.population.toLocaleString('es-ES');
    document.getElementById('modal-car').textContent = country.car.side === 'right' ? 'Derecha' : 'Izquierda';
  
  // Mostrar el modal (quitar clase hidden)
  document.getElementById('modal').classList.remove('hidden');
}

// Función para cerrar el modal
const cerrarModal = () => {
  document.getElementById('modal').classList.add('hidden');
}

document.getElementById('close-modal').addEventListener('click', cerrarModal);
document.querySelector('.overlay').addEventListener('click', cerrarModal);