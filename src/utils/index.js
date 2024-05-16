function stripHtml(htmlString) {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = htmlString;
  return tmp.textContent || tmp.innerText || '';
}

function isSignedInUserVoted({ authUser, votesBy }) {
  if (authUser !== null) return votesBy.includes(authUser.id);
  return false;
}

export {
  stripHtml,
  isSignedInUserVoted,
};
