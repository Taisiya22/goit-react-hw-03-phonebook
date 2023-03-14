import { Component } from 'react';
import { Section } from '../Section/Section';
import { Form } from '../Form/Form';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contact = localStorage.getItem('contacts');
    // console.log(contact)
    const parsedContact = JSON.parse(contact);
    // console.log(parsedContact)
    if (parsedContact) {
      this.setState({ contacts: parsedContact });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = newContact => {
    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));
  };

  onDelete = idContact => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== idContact),
    }));
  };

  onChangeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  getFilterContact = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  render() {
    const { contacts, filter } = this.state;
    const filterContact = this.getFilterContact();
    return (
      <div className={css.wrapper}>
        <Section title="Phone book">
          <Form onSubmit={this.formSubmitHandler} contacts={contacts} />
        </Section>
        {contacts.length > 0 && (
          <>
            <Section title="Contacts" />
            <Filter value={filter} onChange={this.onChangeFilter} />
            <ContactList contacts={filterContact} onDelete={this.onDelete} />
          </>
        )}
      </div>
    );
  }
}
