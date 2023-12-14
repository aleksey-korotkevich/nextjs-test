export async function getListOfCountries() {
  const data = (await fetch("http://localhost:3000/api/countries")).json();

  return data;
}
