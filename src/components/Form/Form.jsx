import { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './Form.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export class Form extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  };
  state = {
    ...INITIAL_STATE,
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    // console.log(e.currentTarget.name);
    // console.log(e.currentTarget.value);
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    const { name, number } = this.state;
    const { contacts, onSubmit } = this.props;
    e.preventDefault();
    onSubmit({ id: nanoid(), name, number });

    // console.log(this.props.contacts)
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is alredy in contacts`);
    }

    if (contacts.find(contact => contact.number === number)) {
      alert(`This ${number} is already in contacts`);
    }

    this.reset();
  };
  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };
  render() {
    const { name, number } = this.state;
    return (
      <form className={css.formWrapper} onSubmit={this.handleSubmit}>
        <label htmlFor="name">
          <p className={css.title }>Name</p>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label htmlFor="number">
          <p className={css.title }>Number</p>
          <input
            type="tel"
            name="number"
            value={number}
            onChange={this.handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={css.addBtn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
