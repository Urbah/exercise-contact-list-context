import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";

export const Contacts = () => {
	const { store, actions } = useContext(Context);
	const [state, setState] = useState({
		showModal: false
	});
	const [contactID, setContactID] = useState(null);

	useEffect(() => {
		actions.fetchContacts();
		console.log(store.contacts);
	}, []);

	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">
						Add new contact
						{console.log(contactID)}
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{store.contacts.map((element, index) => {
							return (
								<ContactCard
									onDelete={contactID => {
										setState({ showModal: true });
										setContactID({ contactID });
									}}
									key={index}
									element={element}
									index={index}
									contactID={store.contacts[index].id}
								/>
							);
						})}
					</ul>
				</div>
			</div>
			<Modal show={state.showModal} contactID={contactID} onClose={() => setState({ showModal: false })} />
		</div>
	);
};
