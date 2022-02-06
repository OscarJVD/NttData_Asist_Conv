const BASE_URL = "https://jarvisconactivador.herokuapp.com"

const postData = async (url, dataPost) => {
  const res = await fetch(`${BASE_URL}/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataPost),
  });

  const data = await res.json();
  return data;
};

function getRandomArbitrary(min, max) {
  return parseInt(Math.random() * ((max + 1) - min) + min);
}

function capitalizarPrimeraLetra(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
