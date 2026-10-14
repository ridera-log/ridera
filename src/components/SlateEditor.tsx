import React, { useMemo, useCallback } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

interface SlateEditorProps {
  value?: Descendant[];
  onChange: (value: Descendant[]) => void;
  className?: string;
}

const SlateEditor: React.FC<SlateEditorProps> = ({ value, onChange, className }) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const renderElement = useCallback(props => <DefaultElement {...props} />, []);
  const renderLeaf = useCallback(props => <DefaultLeaf {...props} />, []);

  // Fallback to a valid initial value if value is undefined or not an array
  let safeValue: Descendant[] = [{ type: 'paragraph', children: [{ text: '' }] }];
  if (Array.isArray(value) && value.length > 0 && value[0]?.type && value[0]?.children) {
    safeValue = value;
  }
  // Debug log
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('[SlateEditor] value prop:', value, 'safeValue:', safeValue);
  }

  return (
    <Slate editor={editor} value={safeValue} onChange={onChange}>
      <Editable
        className={className}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Write your message..."
        minRows={6}
      />
    </Slate>
  );
};

const DefaultElement = (props: any) => <p {...props.attributes}>{props.children}</p>;
const DefaultLeaf = (props: any) => <span {...props.attributes}>{props.children}</span>;

export default SlateEditor;
