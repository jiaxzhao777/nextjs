"use client";

import React, { useState } from "react";

async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return {
    message: "Hello, Dashboard!",
  };
}

export default function Page() {
  const [error, setError] = useState(false);

  const handleGetError = () => {
    setError(true);
  };

  return (
    <>{error ? Error() : <button onClick={handleGetError}>Get Error</button>}</>
  );
}

// export default async function DashboardPage(props) {
//   const { message } = await getData();
//   return <h1>{message}</h1>;
// }
