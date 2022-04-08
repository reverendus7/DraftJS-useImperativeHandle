import TextInput from "./TextInput";

const MiddleComponent = ({
  editorRef,
  value,
  onChange,
  onChangeSelectionStyle
}) => {
  console.log("Rendering MiddleComponent");
  return (
    <div style={{ background: "yellow", padding: "10px" }}>
      <strong>Editor value</strong>
      <br />
      <TextInput
        ref={editorRef}
        value={value}
        onChange={onChange}
        onChangeSelectionStyle={onChangeSelectionStyle}
      />
    </div>
  );
};

export default MiddleComponent;
