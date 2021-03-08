const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [],
			agenda: "urbah",
			contact: { agenda_slug: "urbah" }
		},
		actions: {
			onChangeContact: e => {
				const store = getStore();
				const { contact } = store;
				contact[e.target.name] = e.target.value;
				setStore({ contact });
			},
			onSubmitContact: async (e, meethod, contactID) => {
				e.preventDefault();
				const store = getStore();
				const { contact } = store;
				console.log("contacto que se envia" + contact);
				console.log("contactID " + contactID);
				const config = {
					method: meethod,
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify(contact)
				};
				await fetch(`https://assets.breatheco.de/apis/fake/contact/${contactID ? contactID : ""}`, config)
					.then(res => res.json())
					.then(data => console.log(data))
					.catch(error => console.log(error));
			},
			fetchContacts: async () => {
				const config = {
					method: "GET",
					headers: {
						"Content-type": "application/json"
					}
				};
				const response = await fetch(`https://assets.breatheco.de/apis/fake/contact/agenda/urbah`, config);
				const json = await response.json();
				setStore({ contacts: json });
			},
			fetchContact: async contactID => {
				const config = {
					method: "GET",
					headers: {
						"Content-type": "application/json"
					}
				};
				fetch(`https://assets.breatheco.de/apis/fake/contact/${contactID}`, config)
					.then(res => res.json())
					.then(data => {
						setStore({ contact: data });
					})
					.catch(error => console.log(error));
			},
			deleteContact: async contactID => {
				const store = getStore();
				const { contacts } = store;
				const newsContacts = contacts.filter(function(e) {
					return e.id !== contactID.contactID;
				});
				setStore({ contacts: newsContacts });
				const config = {
					method: "DELETE",
					headers: {
						"Content-type": "application/json"
					}
				};
				const response = await fetch(
					`https://assets.breatheco.de/apis/fake/contact/${contactID.contactID}`,
					config
				);
				const json = await response.json();
			},
			clearContact: () => {
				setStore({ contact: { agenda_slug: "urbah" } });
			}
		}
	};
};
export default getState;
