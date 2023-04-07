import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { AiTwotoneSetting } from "react-icons/ai";
import { Modal } from "../../ui/Modal";
import { Setting } from "./Setting";
import { useState } from "react";
import { useMobile } from "../../../hooks/useMobile";

export const Profile = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [modalOpen, setModalOpen] = useState(false);
  const { isMobile } = useMobile();
  const handleClose = () => setModalOpen(false);

  return (
    <div className="absolute bottom-0 left-0 flex w-full cursor-pointer items-center border-t bg-gray-800 p-2">
      <div className="w-full gap-2 rounded-md pl-1 text-sm hover:bg-gray-700">
        <Modal
          message="⚙️⚙️APIキー設定⚙️⚙️"
          openComponent={
            <div className="flex items-center p-1">
              <Avatar
                src={user?.photoURL}
                sx={
                  isMobile
                    ? { width: 32, height: 32 }
                    : { width: 36, height: 36 }
                }
              />
              <div className="pl-2">
                <p className="flex items-center gap-1 text-sm">
                  APIキー設定
                  <AiTwotoneSetting size={24} />
                </p>
              </div>
            </div>
          }
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        >
          <Setting handleClose={handleClose} />
        </Modal>
      </div>
    </div>
  );
};
