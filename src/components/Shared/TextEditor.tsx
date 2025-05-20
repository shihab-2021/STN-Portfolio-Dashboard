import JoditEditor from "jodit-react";
import React, { useRef } from "react";

const TextEditor = ({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) => {
  const editor = useRef(null);
  return (
    <div>
      <JoditEditor
        ref={editor}
        value={value}
        onChange={(content) => setValue(content)}
      />
    </div>
  );
};

export default TextEditor;
