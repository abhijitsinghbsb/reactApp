import React from "react";
import { Box, Grid, Select, Typography } from "@material-ui/core";
import logo from "../logo.svg";
import { useTranslation } from "react-i18next";
import { encryptStorage } from "../utils/EncryptStorage";

export default function Header() {
  const [t, i18N] = useTranslation();
  const changeLanguage = (e) => {
    localStorage.setItem("selectedLang", e.target.value);
    encryptStorage.setItem("selectedLangENC", e.target.value);
    i18N.changeLanguage(e.target.value);
    console.log("Decrypted value: " + encryptStorage.getItem("selectedLangENC"));
  };
  return (
    <>
      <Box bgcolor="#3DB2FF">
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
          <img src={logo} alt="logo" style={{ height: 50 }} />
          <Select native value={i18N.language} onChange={changeLanguage}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="de">German</option>
          </Select>
        </Grid>
        <Typography>{t("welcome-message")}</Typography>
      </Box>
    </>
  );
}
