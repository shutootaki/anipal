import { Avatar, Tooltip } from "@mui/material";
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
    <div className="flex w-full items-center justify-between border-t-2 p-1">
      <div className="flex items-center">
        <Avatar src={user?.photoURL} />
        <div className="pl-2">
          <p className="text-xs">{user?.displayName}</p>
        </div>
      </div>

      <Tooltip title="設定" className="flex items-center">
        <div>
          <Modal
            message="プロフィール編集画面"
            openComponent={
              <AiTwotoneSetting
                size={24}
                className="cursor-pointer hover:text-gray-500"
              />
            }
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
          >
            <Setting handleClose={handleClose} />
          </Modal>
        </div>
      </Tooltip>
    </div>
  );
};
