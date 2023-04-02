import useSnackbar from "@mui/base/useSnackbar";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { css, keyframes, styled } from "@mui/system";

const green = {
  50: "#E0F7EF",
  400: "#33CC99",
  600: "#009966",
  900: "#006633",
};

const grey = {
  200: "#E0E3E7",
};

const snackbarInRight = keyframes`
    from {
      transform: translateX(100%);
    }
  
    to {
      transform: translateX(0);
    }
  `;

const CustomSnackbar = styled("div")(
  ({ theme }) => css`
    position: fixed;
    z-index: 5500;
    display: flex;
    right: 16px;
    top: 16px;
    left: auto;
    justify-content: start;
    max-width: 560px;
    min-width: 300px;
    background-color: ${theme.palette.mode === "dark" ? green[900] : green[50]};
    border-radius: 100px;
    border: 1px solid ${theme.palette.mode === "dark" ? green[600] : green[400]};
    box-shadow: ${theme.palette.mode === "dark"
      ? `0 2px 2px -2px rgba(0,0,0,0.4)`
      : `0 2px 2px -2px ${grey[200]}`};
    padding: 0.75rem;
    color: ${theme.palette.mode === "dark" ? "#fff" : green[900]};
    font-weight: 600;
    animation: ${snackbarInRight} 500ms;
    transition: transform 0.2s ease-out;
  `
);

export const UseSnackbar = ({
  snackBarOpen,
  setSnackBarOpen,
  message,
}: any) => {
  const handleClose = () => {
    setSnackBarOpen(false);
  };

  const { getRootProps, onClickAway } = useSnackbar({
    onClose: handleClose,
    open: snackBarOpen,
    autoHideDuration: 5000,
  });

  return (
    <>
      {snackBarOpen ? (
        <ClickAwayListener onClickAway={onClickAway}>
          <CustomSnackbar
            {...getRootProps()}
            className="justify-center text-center"
          >
            {message}
          </CustomSnackbar>
        </ClickAwayListener>
      ) : null}
    </>
  );
};
