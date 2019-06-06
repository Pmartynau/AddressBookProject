const generators = require('./data-generators');
const faker = require('faker');

module.exports = {
  getLocale: getLocale,
  mergePersonContacts: mergePersonContacts,
  personContactSeed: personContactSeed,
  filterByType: filterByType,
  getUniqueAddressId: getUniqueAddressId
};

/**
 * Gets the locale by the storeId.
 *
 * @param {*} storeId
 * @returns
 */
function getLocale(storeId) {
  let locale = '';
  switch (storeId) {
    case '10301':
      locale = 'en_US';
      break;
    case '10302':
      locale = 'en_CA';
      break;
    default:
      locale = 'en_US';
      break;
  }
  return locale;
}
/**
 * Merges the "contact" property (an array of addresses) of both
 * {@link person_contact1} and {@link person_contact2}. Assumes that
 * both person_contacts are for the same user.
 *
 * @param {Object} person_contact1
 * @param {Object} person_contact2
 * @return person_contact1
 */
function mergePersonContacts(person_contact1, person_contact2) {
  person_contact1.contact = person_contact1.contact.concat(
    person_contact2.contact
  );
  return person_contact1;
}
/**
 * Generates a person_contact response with shipping and billing addresses.
 *
 * @param {String} locale en_US or en_CA
 * @return {Object} person_contact response
 */
function personContactSeed(locale) {
  locale = locale || 'en_US';
  const shippingPersonContacts = generators.personContact(
    'Shipping',
    10,
    locale
  );
  const billingPersonContacts = generators.personContact('Billing', 10, locale);
  return mergePersonContacts(shippingPersonContacts, billingPersonContacts);
}
/**
 * Filters out addresses of a person_contact by type.
 *
 * @param {Object} person_contact
 * @param {String} addressType
 * @returns person_contact
 */
function filterByType(person_contact, addressType) {
  person_contact.contact = person_contact.contact.filter(contact => {
    return contact.addressType.toUpperCase() === addressType.toUpperCase();
  });
  return person_contact;
}
/**
 * Linear search of addresses to see if the generated uniqueAddressId
 * is contained in the array. If it is, attempt to get a different addressId.
 *
 * @param {Object[]} addresses The addresses from person_contact object.
 * @return {String} A unique addressId
 */
function getUniqueAddressId(addresses) {
  let uniqueAddressId = faker.random
    .number({
      min: 200000000,
      max: 500000000
    })
    .toString();
  return addresses.map(a => a.addressId).includes(uniqueAddressId)
    ? // If this address already exists, try a new random number.
      getUniqueAddressId(addresses)
    : // Otherwise, uniqueAddressId is really unique.
      uniqueAddressId;
}
