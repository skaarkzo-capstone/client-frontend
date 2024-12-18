"use client";

import Link from "next/link";
import { Snackbar, Alert } from "@mui/material";
import Header from "./components/Header";
import SustainTitle from "./components/SustainTitle";
import EvaluateCompany from "./components/EvaluateCompany";
import EvaluatedCompanies from "./components/EvaluatedCompanies";
import { useEffect, useState } from "react";

export default function Home() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });
  const [refresh, setRefresh] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const showSnackbar = (message: string) => {
    setSnackbar({ open: true, message });
  };

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };

  if (!isHydrated) {
    return null;
  }

  return (
    <div
      className="flex flex-col items-center p-8 pb-40 sm:p-20 relative"
      style={{ backgroundColor: "rgb(37, 37, 37)", minHeight: "100vh" }}
    >
      <Header />

      <div className="flex flex-col items-center text-white mt-20 flex-grow">
        <SustainTitle />
        <EvaluateCompany
          showSnackbar={showSnackbar}
          triggerRefresh={triggerRefresh}
        />
        <EvaluatedCompanies showSnackbar={showSnackbar} refresh={refresh} />
      </div>

      <footer className="absolute bottom-0 left-0 w-full text-center py-4 bg-[rgb(37,37,37)] text-white">
        <p>&copy; Royal Bank of Canada - 2024</p>
      </footer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={closeSnackbar} severity="error" sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
