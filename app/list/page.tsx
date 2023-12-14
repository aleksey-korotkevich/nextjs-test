"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Country } from "../lib/types";
import { getListOfCountries } from "./actions";

export default function List() {
  const params = useSearchParams();
  const [countries, setCountries] = useState<Country[]>([]);
  const [selected, setSelected] = useState<Country | null>(null);

  getListOfCountries();

  useEffect(() => {
    getListOfCountries().then((data) => {
      setCountries(data.data);
    });
  }, []);

  return (
    <div className="flex min-h-screen w-full h-48 flex-col items-center justify-between p-24 pt-0">
      <div className="grid-cols-2 grid gap-8 h-full w-full">
        <div className="w-full h-full max-h-full overflow-y-scroll mb-10">
          <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
              <div className="flex flex-col gap-4 max-h-full">
                {countries.map((country) => (
                  <div key={country.name} onClick={() => setSelected(country)}>
                    {country.code} - {country.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {selected && (
          <div className="w-full">
            <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
              <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
                Selected: {selected.code} - {selected.name}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
