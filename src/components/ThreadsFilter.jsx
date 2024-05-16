import PropTypes from 'prop-types';

function ThreadsFilter({ threadsLength, categories, onCategoryChange }) {
  return (
    <>
      <p className="me-auto mb-0">{`${threadsLength} threads`}</p>
      <div className="threads-filter ms-auto input-group">
        <select
          name="categories"
          className="form-select"
          value={categories.selected}
          onChange={onCategoryChange}
        >
          {categories.values.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

const categoriesShape = {
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
};

ThreadsFilter.propTypes = {
  threadsLength: PropTypes.number.isRequired,
  categories: PropTypes.shape(categoriesShape).isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default ThreadsFilter;
