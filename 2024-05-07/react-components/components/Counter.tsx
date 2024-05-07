"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  const sumar = (n: number) => () => setCount((prev) => prev + n);
  const reset = () => setCount(0);

  return (
    <div>
      <div>{count}</div>
      <button onClick={sumar(-1)}>Uno menos</button>
      <button onClick={sumar(1)}>Uno más</button>
      <button onClick={reset}>Reset</button>
      <button onClick={() => setCount(x => x + 1)}>+1</button>
    </div>
  );
}
