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
            textTransform: "none",
            borderRadius: 9999,
            fontWeight: 600,
            fontSize: "18px",
            padding: "13.5px 29px",
            minWidth: "150px",
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
  },
});

export default theme;
