import { gql } from "@apollo/client";
import createApolloClient from "../apollo-client";

export async function getListOfCountries() {
  const client = createApolloClient();

  const { data } = await client.query({
    query: gql`
      query Countries {
        countries {
          code
          name
          emoji
        }
      }
    `,
  });

  return data.countries.slice(0, 4);
}

export default async function List(): Promise<JSX.Element> {
  const countries = await getListOfCountries();

  return (
    <div>
      {countries.map((country) => (
        <div key={country.name}>
          {country.code} - {country.name}
        </div>
      ))}
    </div>
  );
}
