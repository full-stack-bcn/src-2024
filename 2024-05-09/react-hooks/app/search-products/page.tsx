"use client";

import ProductSearch from "@/components/ProductSearch";
import SearchBox from "@/components/SearchBox";
import React, { useState } from "react";

export default function Page() {
  const [search, setSearch] = useState("");
  return (
    <div>
      <SearchBox onChange={setSearch} />
      <ProductSearch search={search} />
    </div>
  );
}
