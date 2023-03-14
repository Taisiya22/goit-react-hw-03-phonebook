import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ value, onChange }) => (
  <label className={css.search}>
    <p className={css.text}>Find contacts by name</p>
    <input
      type="text"
      name="filter"
      value={value}
      onChange={onChange}
    />
  </label>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
