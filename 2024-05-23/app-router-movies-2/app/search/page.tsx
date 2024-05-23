"use client";

import MovieSearch from "@/components/MovieSearch";
import SearchBox from "@/components/SearchBox";
import React, { useState } from "react";

export default function Page() {
  const [search, setSearch] = useState("");
  return (
    <div>
      <SearchBox onChange={setSearch} />
      <MovieSearch search={search} />
    </div>
  );
}
