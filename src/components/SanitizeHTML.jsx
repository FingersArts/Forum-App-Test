import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';

function SanitizeHTML({ html, className }) {
  const cleanUp = (dirty) => ({
    __html: DOMPurify.sanitize(dirty),
  });

  return <div className={className} dangerouslySetInnerHTML={cleanUp(html)} />;
}

SanitizeHTML.propTypes = {
  html: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default SanitizeHTML;
