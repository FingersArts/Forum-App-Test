import LoadingBar from 'react-redux-loading-bar';

function Loading() {
  return (
    <div className="position-sticky top-0 z-3">
      <LoadingBar className="loading-bar" />
    </div>
  );
}

export default Loading;
