import { TextField, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Button } from "../../ui/Button";
import { setKey } from "../../../store/keySlice";
import { useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import { useMobile } from "../../../hooks/useMobile";

export const Setting = ({ handleClose }: any) => {
  const [newApiKey, setNewApiKey] = useState<string>("");
  const apiKey = useSelector((state: RootState) => state.key.apiKey);
  const { isMobile } = useMobile();
  const dispatch = useDispatch();

  const onClickSubmit = () => {
    dispatch(setKey(newApiKey));
    handleClose();
  };

  const onClickDelete = () => {
    dispatch(setKey(""));
    handleClose();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onClickSubmit();
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <TextField
          type="password"
          placeholder="OpenAI APIKey"
          value={apiKey ? apiKey : newApiKey}
          onChange={(e) => setNewApiKey(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-[200px] md:w-[360px]"
          size="small"
        />
        <Tooltip title="APIキーを削除します">
          <div>
            <BsTrash3
              size={isMobile ? 20 : 28}
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
