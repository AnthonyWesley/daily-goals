// import { useState } from "react";

// const useLocalStorage = () => {
//   const getLocalStorage = () => {
//     const storedValue = localStorage.getItem("goals");
//     try {
//       return storedValue ? JSON.parse(storedValue) : [];
//     } catch (error) {
//       console.error("Failed to parse localStorage item:", error);
//       return [];
//     }
//   };

//   const setLocalStorage = (value: any) => {
//     try {
//       localStorage.setItem("goals", JSON.stringify(value));
//     } catch (error) {
//       console.error("Failed to set localStorage item:", error);
//     }
//   };

//   return { getLocalStorage, setLocalStorage };
// };

// export default useLocalStorage;
