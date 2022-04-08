import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import * as Modifier from "draft-js/lib/DraftModifier";
import { stateFromHTML } from "draft-js-import-html";
import { stateToHTML } from "draft-js-export-html";
import { difference } from "lodash";

const insertOrReplaceText = (editorState, text) => {
  const { blockMap } = stateFromHTML(text);

  const newSelection = editorState.getSelection();

  const newState = Modifier.replaceWithFragment(
    editorState.getCurrentContent(),
    newSelection,
    blockMap
  );
  return EditorState.push(editorState, newState, "insert-fragment");
};

const getSelectionStyle = (editorState) => {
  if (editorState && editorState.getSelection().getHasFocus()) {
    const currentBlockType = editorState
      .getCurrentContent()
      .getBlockForKey(editorState.getSelection().getStartKey())
      ?.getType();
    return [
      ...editorState.getCurrentInlineStyle().toArray(),
      ...(currentBlockType ? [currentBlockType] : [])
    ];
  } else {
    return [];
  }
};

const TextInput = forwardRef(
  ({ value, onChange, onChangeSelectionStyle }, ref) => {
    console.log("Rendering TextInput");
    const [editorState, setEditorState] = useState(
      value
        ? EditorState.createWithContent(stateFromHTML(value))
        : EditorState.createEmpty()
    );

    const handleChange = (newEditorState) => {
      setEditorState(newEditorState);
      const oldSelectionStyle = getSelectionStyle(editorState);
      const newSelectionStyle = getSelectionStyle(newEditorState);
      if (difference(oldSelectionStyle, newSelectionStyle).length > 0) {
        onChangeSelectionStyle(newSelectionStyle);
      }
    };

    const handleBlur = () => {
      onChange(stateToHTML(editorState.getCurrentContent()));
    };

    const setInlineStyle = (inlineStyle) => {
      handleChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };

    const setBlockStyle = (blockStyle) => {
      handleChange(RichUtils.toggleBlockType(editorState, blockStyle));
    };

    const addText = (newText) => {
      handleChange(insertOrReplaceText(editorState, newText));
    };

    const handleKeyCommand = (command, editorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);

      if (newState) {
        handleChange(newState);
        return "handled";
      }

      return "not-handled";
    };

    useImperativeHandle(
      ref,
      () => ({ addText, setInlineStyle, setBlockStyle }),
      [setInlineStyle, setBlockStyle, addText]
    );

    return (
      <Editor
        editorState={editorState}
        onChange={handleChange}
        handleKeyCommand={handleKeyCommand}
        onBlur={handleBlur}
      />
    );
  }
);

export default TextInput;
