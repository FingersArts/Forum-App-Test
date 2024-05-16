import { useRef } from 'react';
import PropTypes from 'prop-types';
import QuillEditor from './QuillEditor';
// styles
import 'quill/dist/quill.snow.css';
import '../styles/quill.custom.css';

function CommentInput({ onCreateComment }) {
  // Use a ref to access the quill instance directly
  const quillRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    let content = '';
    if (quillRef.current.getLength() > 1) {
      content = quillRef.current.getSemanticHTML();
    }

    onCreateComment(content).then(() => {
      // reset quill editor content
      quillRef.current.setContents([]);
    });
  }

  return (
    <form className="text-end" onSubmit={handleSubmit}>
      <div className="mb-2 text-start">
        <QuillEditor ref={quillRef} />
      </div>
      <button type="submit" className="btn btn-dark algin-self-end">Send</button>
    </form>
  );
}

CommentInput.propTypes = {
  onCreateComment: PropTypes.func.isRequired,
};

export default CommentInput;
