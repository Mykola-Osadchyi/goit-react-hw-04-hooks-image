import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ click }) => {
  return (
    <>
      <button type="button" className={s.Button} onClick={click}>
        Load more
      </button>
    </>
  );
};

Button.propTypes = {
  click: PropTypes.func.isRequired,
};

export default Button;
