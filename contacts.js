const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
  try {
    const contactList = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(contactList);
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contactById = contacts.filter(contact => contact.id === Number(contactId));
    return contactById;
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const newContactList = contacts.filter(contact => contact.id !== Number(contactId));
    await fs.writeFile(contactsPath, JSON.stringify(newContactList), 'utf8' );
    return newContactList;
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: Date.now(),
      name,
      email,
      phone}
    const newContactList = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContactList), 'utf8' );
    return newContactList;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
}
