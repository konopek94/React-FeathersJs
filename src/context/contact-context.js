import React, { useReducer, createContext } from 'react';

export const ContactContext = createContext();

const initialState = {
  contacts: [],
  contact: {}, // selected or new
  message: {}, // { type: 'success|fail', title:'Info|Error' content:'lorem ipsum'}
};

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_CONTACT': {
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        message: {
          type: 'success',
          title: 'Success',
          content: 'New contact created',
        },
      };
    }
    case 'FETCH_CONTACTS': {
      return {
        ...state,
        contacts: action.payload,
        contact: {},
      };
    }
    case 'FETCH_CONTACT': {
      return {
        ...state,
        contact: action.payload,
        message: {},
      };
    }
    case 'UPDATE_CONTACT': {
      const contact = action.payload;
      return {
        ...state,
        contacts: state.contacts.map(item => {
          return contact._id === item._id ? contact : item
        }),
        message: {
          type: 'success',
          title: 'Update Successful',
          content: `Contact "${contact.email}" has been updated!`,
        },
      };
    }
    case 'DELETE_CONTACT': {
      const contact = action.payload
      return {
        ...state,
        contacts: state.contacts.filter(item => contact._id !== item._id),
        message: {
          type: 'success',
          title: 'Delete successful',
          content: `Contact "${contact.email}" has been deleted!`,
        }
      }
    }
    default:
      throw new Error();
  }
}

export const ContactContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;

  return (
    <ContactContext.Provider value={[state, dispatch]}>
      {children}
    </ContactContext.Provider>
  );
};
