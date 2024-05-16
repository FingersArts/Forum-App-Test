import { useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import QuillEditor from './QuillEditor';
import useInput from '../hooks/useInput';

// styles
import 'quill/dist/quill.snow.css';
import '../styles/quill.custom.css';

function ThreadInput({ onCreateThread }) {
  const [title, handleTitleChange] = useInput('');
  const [category, handleCategoryChange] = useInput('');

  // Use a ref to access the quill instance directly
  const quillRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    let body = '';
    if (quillRef.current.getLength() > 1) {
      body = quillRef.current.getSemanticHTML();
    }

    onCreateThread({
      title,
      category,
      body,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" value={title} onChange={handleTitleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category</label>
        <input
          type="text"
          className="form-control"
          id="category"
          value={category}
          onChange={handleCategoryChange}
        />
        <div className="form-text">
          Category is optional, if left blank, then the default value of category is
          <b> general</b>
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Body</label>
        <QuillEditor ref={quillRef} />
      </div>
      <div className="d-flex justify-content-end">
        <Link to="/" className="btn btn-outline-secondary me-1">Cancel</Link>
        <button type="submit" className="btn btn-dark">Save</button>
      </div>
    </form>
  );
}

ThreadInput.propTypes = {
  onCreateThread: PropTypes.func.isRequired,
};

export default ThreadInput;
