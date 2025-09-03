import { Divider } from "@mui/material";
import "../styles/AppTitle.css";

export default function AppTitle() {
  return (
    <>
      <div className="title">
        <h1>مهامي</h1>
      </div>
      <Divider sx={{ color: "black" }}/>
    </>
  );
}
