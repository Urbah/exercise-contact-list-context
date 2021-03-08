import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const AddContact = props => {
	const { contact, setContact } = useState({});
	const { store, actions } = useContext(Context);
	//const { ContactId } = useParams();
	let contactID = props.match.params.contactID;
	useEffect(() => {
		contactID ? actions.fetchContact(contactID) : "";
	}, []);
	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">{contactID ? "Edit Contact" : "Add a new contact"}</h1>
				<form
					onSubmit={e => {
						let method = contactID ? "PUT" : "POST";
						actions.onSubmitContact(e, method, contactID);
						console.log("SE ENVIO EL FORMULARIOOOO", e);
					}}>
					<div className="form-group">
						<label>Full Name </label>
						<input
							type="text"
							className="form-control"
							placeholder="Full Name"
							name="full_name"
							onChange={e => actions.onChangeContact(e)}
							defaultValue={store.contact.full_name}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							placeholder="Enter email"
							name="email"
							onChange={e => actions.onChangeContact(e)}
							defaultValue={store.contact.email}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							className="form-control"
							placeholder="Enter phone"
							name="phone"
							onChange={e => actions.onChangeContact(e)}
							defaultValue={store.contact.phone}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter address"
							name="address"
							onChange={e => actions.onChangeContact(e)}
							defaultValue={store.contact.address}
						/>
					</div>
					<button type="submit" className="btn btn-primary form-control">
						save
					</button>
					<Link className="mt-3 w-100 text-center" to="/" onClick={() => actions.clearContact()}>
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};

AddContact.propTypes = {
	match: PropTypes.object
};
AddContact.defaultProps = {
	ContactId: null
};
