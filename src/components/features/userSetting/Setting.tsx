import { TextField, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Button } from "../../ui/Button";
import { setKey } from "../../../store/keySlice";
import { useState } from "react";
import { BsTrash3 } from "react-icons/bs";

export const Setting = ({ handleClose }: any) => {
  const [newApiKey, setNewApiKey] = useState<string>("");
  const apiKey = useSelector((state: RootState) => state.key.apiKey);
  const dispatch = useDispatch();

  const onClickSubmit = () => {
    dispatch(setKey(newApiKey));
    handleClose();
  };

  const onClickDelete = () => {
    dispatch(setKey(""));
    handleClose();
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <TextField
          type="password"
          placeholder="APIキーを入力してください"
          value={apiKey ? apiKey : newApiKey}
          onChange={(e) => setNewApiKey(e.target.value)}
          className="min-w-[280px]"
          size="small"
        />
        <Tooltip title="APIキーを削除します">
          <div>
            <BsTrash3
              size={24}
              onClick={onClickDelete}
              className="cursor-pointer hover:text-gray-500"
            />
          </div>
        </Tooltip>
      </div>
      <div className="mt-6 flex justify-center">
        <Button onClick={onClickSubmit}>
          <p className="px-6 text-lg">Save</p>
        </Button>
      </div>
    </div>
  );
};
