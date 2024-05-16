import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import Quill from 'quill';
import PropTypes from 'prop-types';

// Editor is an uncontrolled React component
const QuillEditor = forwardRef(({
  readOnly,
  defaultValue,
  onTextChange,
  onSelectionChange,
}, ref) => {
  const containerRef = useRef(null);
  const defaultValueRef = useRef(defaultValue);
  const onTextChangeRef = useRef(onTextChange);
  const onSelectionChangeRef = useRef(onSelectionChange);

  useLayoutEffect(() => {
    onTextChangeRef.current = onTextChange;
    onSelectionChangeRef.current = onSelectionChange;
  });

  useEffect(() => {
    ref.current?.enable(!readOnly);
  }, [ref, readOnly]);

  useEffect(() => {
    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement('div'),
    );
    const quill = new Quill(editorContainer, {
      theme: 'snow',
      modules: {
        toolbar: [
          ['bold', 'italic'],
          ['link', 'image'],
        ],
      },
    });

    ref.current = quill; // eslint-disable-line no-param-reassign

    if (defaultValueRef.current) {
      quill.setContents(defaultValueRef.current);
    }

    quill.on(Quill.events.TEXT_CHANGE, (...args) => {
      onTextChangeRef.current?.(...args);
    });

    quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
      onSelectionChangeRef.current?.(...args);
    });

    return () => {
      ref.current = null; // eslint-disable-line no-param-reassign
      container.innerHTML = '';
    };
  }, [ref]);

  return <div className="quill-editor" ref={containerRef} />;
});

QuillEditor.displayName = 'QuillEditor';
QuillEditor.propTypes = {
  readOnly: PropTypes.bool,
  defaultValue: PropTypes.instanceOf(Quill),
  onTextChange: PropTypes.func,
  onSelectionChange: PropTypes.func,
};

export default QuillEditor;
