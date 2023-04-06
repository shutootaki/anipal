import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { AiTwotoneSetting } from "react-icons/ai";
import { Modal } from "../../ui/Modal";
import { Setting } from "./Setting";
import { useState } from "react";

export const Profile = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);

  return (
    <div className="absolute bottom-0 left-0 flex w-full cursor-pointer items-center border-t bg-gray-800 p-2">
      <div className="w-full gap-2 rounded-md text-sm hover:bg-gray-700 sm:px-4">
        <Modal
          message="⚙️⚙️APIキー設定⚙️⚙️"
          openComponent={
            <div className="flex items-center">
              <Avatar src={user?.photoURL} />
              <div className="pl-2">
                <p className="flex items-center gap-2 text-sm">
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
