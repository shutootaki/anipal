import { Button, Backdrop, Fade, Box } from "@mui/material";
import { Modal as MuiModal } from "@mui/material";
import { FC, ReactNode, useState } from "react";
import { UseSnackbar } from "./SnackBar";

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
  openComponent: ReactNode;
  children?: ReactNode;
  message: string;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: any;
  onClose?: () => void;
};

export const Modal: FC<ModalProps> = ({
  children,
  message,
  modalOpen,
  setModalOpen,
  openComponent,
  onSubmit,
  onClose,
}) => {
  // const [modalOpen, setModalOpen] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);

  return (
    <div>
      <div onClick={handleOpen} className="min-w-0 p-0">
        {openComponent}
      </div>
      <MuiModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={onClose ? onClose : () => setModalOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={style} className="rounded-lg bg-gray-100">
            <h2
              id="transition-modal-title"
              className="whitespace-nowrap p-2 px-6 text-center font-bold"
            >
              {message}
            </h2>
            <div className="flex justify-center gap-x-2 pt-10">
              {children ? (
                children
              ) : (
                <>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      onSubmit();
                      onClose ? onClose() : setModalOpen(false);
                      setSnackBarOpen(true);
                    }}
                    className="border-2 border-teal-600 font-bold text-teal-600"
                  >
                    Yes
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      onClose ? onClose() : setModalOpen(false);
                    }}
                    className="border-2 border-teal-600 font-bold text-teal-600"
                  >
                    No
                  </Button>
                </>
              )}
            </div>
          </Box>
        </Fade>
      </MuiModal>
      <UseSnackbar
        snackBarOpen={snackBarOpen}
        setSnackBarOpen={setSnackBarOpen}
        message="記憶を削除しました。"
      />
    </div>
  );
};
