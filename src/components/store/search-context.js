import { createContext, useState } from "react";

export const SearchContext = createContext({
  data: {},
  setData: () => {},
});

export default function SearchContextProvider({ children }) {
  const [data, setData] = useState({
    destination: "",
    date: [{ startDate: new Date(), endDate: new Date() }],
    options: { adult: 0, children: 0, rooms: 0 },
  });

  const ctxValue = { data, setData };
  return (
    <SearchContext.Provider value={ctxValue}>{children}</SearchContext.Provider>
  );
}
