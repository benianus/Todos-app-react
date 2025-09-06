import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useContext } from "react";
import { TabContext } from "../contexts/TabsContext";
import { styled } from "@mui/material/styles";

const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#1890ff",
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: "rgba(0, 0, 0, 0.85)",
    transition: "all 300ms",
    borderRadius: "0.4rem",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      backgroundColor: "#dfdfdfff",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  })
);

export default function CategoriesBar() {
  const { tabValue, setTabValue } = useContext(TabContext);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <AntTabs
      value={tabValue}
      onChange={handleChange}
      aria-label="disabled tabs example"
      sx={{
        marginTop: "16px",
        marginBottom: "16px",
      }}
    >
      <AntTab
        label="غير منجز"
        sx={{ fontFamily: "Tajawal, sans serif", fontSize: "16px" }}
      />
      <AntTab
        label="منجز"
        sx={{ fontFamily: "Tajawal, sans serif", fontSize: "16px" }}
      />
      <AntTab
        label="الكل"
        sx={{ fontFamily: "Tajawal, sans serif", fontSize: "16px" }}
      />
    </AntTabs>
  );
}
