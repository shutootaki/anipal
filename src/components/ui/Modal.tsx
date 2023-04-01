import { Button, Backdrop, Fade, Box } from "@mui/material";
import { Modal as MuiModal } from "@mui/material";
import { FC, ReactNode, useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type ModalProps = {
  children: ReactNode;
  message: string;
  onSubmit: any;
};

export const Modal: FC<ModalProps> = ({ children, message, onSubmit }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        className="mx-2 rounded-3xl bg-teal-600 py-3 text-center text-white focus:outline-none hover:bg-teal-700"
        onClick={handleOpen}
      >
        {children}
      </Button>
      <MuiModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <h2 id="transition-modal-title">{message}</h2>
            <div className="flex justify-center gap-x-2 pt-10">
              <Button
                variant="outlined"
                onClick={() => {
                  onSubmit();
                  handleClose();
                }}
              >
                Yes
              </Button>
              <Button variant="outlined" onClick={handleClose}>
                No
              </Button>
            </div>
          </Box>
        </Fade>
      </MuiModal>
    </div>
  );
};
