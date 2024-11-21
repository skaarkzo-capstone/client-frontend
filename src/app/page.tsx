"use client";

import Link from "next/link";
import { Snackbar, Alert } from "@mui/material";
import Header from "./components/Header";
import SustainTitle from "./components/SustainTitle";
import EvaluateCompany from "./components/EvaluateCompany";
import EvaluatedCompanies from "./components/EvaluatedCompanies";
import { useState } from "react";

export default function Home() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  const showSnackbar = (message: string) => {
    setSnackbar({ open: true, message });
  };

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div
      className="flex flex-col items-center p-8 pb-40 sm:p-20"
      style={{ backgroundColor: "rgb(37, 37, 37)", minHeight: "100vh" }}
    >
      <Header />

      <div className="flex flex-col items-center text-white mt-20">
        <SustainTitle />
        <EvaluateCompany showSnackbar={showSnackbar} />
        <EvaluatedCompanies showSnackbar={showSnackbar} />
      </div>

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
