import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Button } from "../../ui/Button";
import { setKey } from "../../../store/keySlice";
import { useState } from "react";

export const Setting = ({ handleClose }: any) => {
  const [newApiKey, setNewApiKey] = useState<string>("");
  const [newUserName, setNewUserName] = useState<string>("");

  const user = useSelector((state: RootState) => state.user.user);
  const apiKey = useSelector((state: RootState) => state.key.apiKey);
  const dispatch = useDispatch();

  const onClickSubmit = () => {
    dispatch(setKey(newApiKey));
    handleClose();
  };

  return (
    <div>
      <div>
        <h4 className="pb-2 font-bold">ニックネーム</h4>
        <TextField
          value={user?.displayName}
          onChange={(e) => setNewUserName(e.target.value)}
          className="min-w-[300px]"
        />
      </div>
      <div>
        <h4 className="py-2 font-bold">APIキー</h4>
        <TextField
          type="password"
          placeholder="OpenAIのAPIキーを入力してください"
          value={apiKey ? apiKey : newApiKey}
          onChange={(e) => setNewApiKey(e.target.value)}
          className="min-w-[300px]"
        />
      </div>
      <div className="mt-6 flex justify-center">
        <Button onClick={onClickSubmit}>
          <p className="px-6 text-lg">保存</p>
        </Button>
      </div>
    </div>
  );
};
