import React, { useState } from "react";
import AccountPic from "./AccountPic";
import MooBox from "./MooBox";
import { MooType } from "./Moo";
import { MooAccount } from "./Account";

const NewMoo = ({
  setMoos,
  moos,
  account
}: {
  setMoos: (val: MooType[]) => void;
  moos: MooType[];
  account: MooAccount;
}) => {
  const [value, setValue] = useState("");

  return (
    <MooBox>
      <div className="new-moo-wrapper">
        <form
          onSubmit={e => {
            e.preventDefault();
            setMoos([
              {
                account,
                text: value
              },
              ...moos
            ]);
            setValue("");
          }}
        >
          <div className="new-moo-input-wrapper">
            <AccountPic color="green" text="R" />
            <textarea
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="Type your moo here..."
              className="moo-input moo-textarea"
              rows={5}
              maxLength={140}
            ></textarea>
          </div>
          <div className="new-moo-submit-wrapper">
            <span className="new-moo-char-count"> {value.length}/140 </span>
            <input
              type="submit"
              className="moo-submit"
              value="Moo"
              {...(value.length >= 140 && { disabled: true })}
            ></input>
          </div>
        </form>
      </div>
    </MooBox>
  );
};

export default NewMoo;