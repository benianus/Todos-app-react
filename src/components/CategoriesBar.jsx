import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useContext } from "react";
import { TabContext } from "../contexts/TodosContext";

export default function CategoriesBar() {
  const { tabValue, setTabValue } = useContext(TabContext);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Tabs
      value={tabValue}
      onChange={handleChange}
      aria-label="disabled tabs example"
      sx={{
        marginTop: "16px",
        marginBottom: "16px",
      }}
    >
      <Tab
        label="غير منجز"
        sx={{ fontFamily: "Tajawal, sans serif", fontSize: "16px" }}
      />
      <Tab
        label="منجز"
        sx={{ fontFamily: "Tajawal, sans serif", fontSize: "16px" }}
      />
      <Tab
        label="الكل"
        sx={{ fontFamily: "Tajawal, sans serif", fontSize: "16px" }}
      />
    </Tabs>
  );
}
