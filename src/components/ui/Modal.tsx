import { Button, Backdrop, Fade, Box } from "@mui/material";
import { Modal as MuiModal } from "@mui/material";
import { FC, ReactNode, useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
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
      <Button onClick={handleOpen} className="min-w-0 p-0">
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
          <Box sx={style} className="rounded-lg bg-gray-100">
            <h2
              id="transition-modal-title"
              className="whitespace-nowrap p-2 px-6 text-center font-bold"
            >
              {message}
            </h2>
            <div className="flex justify-center gap-x-2 pt-10">
              <Button
                variant="outlined"
                onClick={() => {
                  onSubmit();
                  handleClose();
                }}
                className="border-2 border-teal-600 font-bold text-teal-600"
              >
                Yes
              </Button>
              <Button
                variant="outlined"
                onClick={handleClose}
                className="border-2 border-teal-600 font-bold text-teal-600"
              >
                No
              </Button>
            </div>
          </Box>
        </Fade>
      </MuiModal>
    </div>
  );
};
