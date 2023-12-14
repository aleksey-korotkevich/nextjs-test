import { getListOfCountries } from "@/app/lib/actions";

export default async function List() {
  const countries = await getListOfCountries();

  return (
    <div className="flex flex-col">
      {countries.map((country) => (
        <div key={country.name}>
          {country.code} - {country.name}
        </div>
      ))}
    </div>
  );
}
