export async function getListOfCountries() {
  const data = (await fetch(`${location.origin}/api/countries`)).json();

  return data;
}
