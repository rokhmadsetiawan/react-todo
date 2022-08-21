import { createTheme } from "@mui/material/styles";

// custom module variant overide
declare module "@mui/material/Toolbar" {
  interface ToolbarPropsVariantOverrides {
    large: true;
  }
}

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    primary: {
      main: "#16abf8",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: "#ed4c5c",
    },
  },
  components: {
    // custom material button
    MuiButton: {
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            color: "white",
          },
        },
        {
          props: { variant: "contained" },
          style: {
            textTransform: "none",
            borderRadius: 9999,
            fontWeight: 600,
            fontSize: "18px",
            padding: "13.5px 29px",
            minWidth: "150px",
          },
        },
      ],
    },

    // custom toolbar
    MuiToolbar: {
      variants: [
        {
          props: { variant: "large" },
          style: {
            minHeight: "105px",
          },
        },
      ],
    },

    MuiIconButton: {
      variants: [
        {
          props: { size: "large" },
          style: {
            width: "54px",
            height: "54px",
            border: "1px solid #e5e5e5",
          },
        },
      ],
    },
  },
});

export default theme;
