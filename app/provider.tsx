// 'use client'
// import { useRef } from 'react'
// import { Provider } from 'react-redux'
// import { makeStore, AppStore } from '../lib/store'

// export default function Provider({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const storeRef = useRef<AppStore>(undefined)
//   if (!storeRef.current) {
//     // Create the store instance the first time this renders
//     storeRef.current = makeStore()
//   }

//   return <Provider store={storeRef.current}>{children}</Provider>
// }
"use client";
import { Provider } from "react-redux";
import React, { useMemo, useRef } from "react";
import { persistor, store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
// import { PersistGate } from "redux-persist/integration/react";
// import { AppStore, makeStore } from "@/store/store";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<any>(null);
  const persistRef = useRef(persistor); // Assign store to storeRef
  // Assign store to storeRef
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store;
  }
  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
