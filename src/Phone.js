import React, { useRef, useState } from "react";
import MiddleComponent from "./MiddleComponent";
import { Dialog } from "@material-ui/core";

const Phone = () => {
  console.log("Rendering Phone");
  const phoneEl = useRef(null);

  const onClickInlineStyle = (event) => {
    event.preventDefault();
    phoneEl.current.setInlineStyle("BOLD");
  };

  const onClickBlockStyle = (event) => {
    event.preventDefault();
    phoneEl.current.setBlockStyle("ordered-list-item");
  };

  const [showGlossary, setShowGlossary] = useState(false);
  const onClickGlossary = () => {
    setShowGlossary(true);
  };
  const onClickGlossarySuggestion = (event, suggestion) => {
    setShowGlossary(false);
    phoneEl.current.addText(suggestion);
  };

  const [selectionStyle, setSelectionStyle] = useState([]);
  const handleChangeSelectionStyle = (newSelectionStyle) => {
    setSelectionStyle(newSelectionStyle);
  };
  const [value, setValue] = useState("<div>ciccio ingrassia</div>");
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <button
        onMouseDown={onClickInlineStyle}
        style={{
          background: selectionStyle.includes("BOLD") ? "#ccc" : undefined
        }}
      >
        bold
      </button>
      <button
        onMouseDown={onClickBlockStyle}
        style={{
          background: selectionStyle.includes("ordered-list-item")
            ? "#ccc"
            : undefined
        }}
      >
        ol
      </button>
      <button onMouseDown={onClickGlossary}>glossary</button>

      <Dialog onClose={() => setShowGlossary(false)} open={showGlossary}>
        <div>
          <button
            onMouseDown={(e) => onClickGlossarySuggestion(e, "pippo baudo")}
          >
            pippo baudo
          </button>
          <button
            onMouseDown={(e) => onClickGlossarySuggestion(e, "pippo franco")}
          >
            pippo franco
          </button>
        </div>
      </Dialog>

      <MiddleComponent
        editorRef={phoneEl}
        value={value}
        onChange={handleChange}
        onChangeSelectionStyle={handleChangeSelectionStyle}
      />

      <div style={{ background: "cyan", padding: "10px" }}>
        <strong>Value</strong>
        <br />
        {value}
      </div>
    </div>
  );
};

export default Phone;
