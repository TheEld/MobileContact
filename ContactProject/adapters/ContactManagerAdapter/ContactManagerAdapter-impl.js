/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/*******************************************************************************
 * Implementation code for procedure - 'getContacts'
 * 
 * 
 * @return - contactsResult
 */

var contactsStatement = WL.Server
		.createSQLStatement("SELECT NAME, TELEPHONE, EMAIL, CONTACTID, CAST(CONTACT_IMAGE AS LONGVARCHAR) as CONTACT_IMAGE FROM CONTACT WHERE USERID LIKE ?");
function getContacts(userid) {
	var contactsResult = WL.Server.invokeSQLStatement({
		preparedStatement : contactsStatement,
		parameters : [ userid ]
	});

	return contactsResult;
}

/*******************************************************************************
 * Implementation code for procedure - 'addContact'
 * 
 * 
 * @return - result
 */

var addContactQuery = WL.Server
		.createSQLStatement("INSERT INTO CONTACT(NAME, TELEPHONE, MOBILE, EMAIL, CONTACT_IMAGE, USERID) VALUES (?, ?, ?, ?, ?, ?)");
function addContact(USER_ID, CONTACT_NAME, CONTACT_PHONE, CONTACT_MOBILE,
		CONTACT_MAIL, CONTACT_IMAGE) {
	var result = WL.Server.invokeSQLStatement({
		preparedStatement : addContactQuery,
		parameters : [ CONTACT_NAME, CONTACT_PHONE, CONTACT_MOBILE,
				CONTACT_MAIL, CONTACT_IMAGE, USER_ID ]
	});

	return result;
}

/*******************************************************************************
 * Implementation code for procedure - 'updateContact'
 * 
 * 
 * @return - result
 */

var updateContactQuery = WL.Server
		.createSQLStatement("UPDATE CONTACT SET NAME=?, TELEPHONE=?, MOBILE=?, EMAIL=?, CONTACT_IMAGE=? WHERE CONTACTID = ?");
function updateContact(CONTACTID, CONTACT_NAME, CONTACT_PHONE, CONTACT_MOBILE,
		CONTACT_MAIL, CONTACT_IMAGE) {
	var result = WL.Server.invokeSQLStatement({
		preparedStatement : updateContactQuery,
		parameters : [ CONTACT_NAME, CONTACT_PHONE, CONTACT_MOBILE,
				CONTACT_MAIL, CONTACT_IMAGE, CONTACTID ]
	});

	return result;
}

/*******************************************************************************
 * Implementation code for procedure - 'getContactDetails'
 * 
 * 
 * @return - contactDetailResult
 */

var contactDetailStatement = WL.Server
		.createSQLStatement("SELECT NAME, TELEPHONE, MOBILE, EMAIL, CONTACTID, USERID, CAST(CONTACT_IMAGE AS LONGVARCHAR) as CONTACT_IMAGE from CONTACT WHERE CONTACTID LIKE ?");
function getContactDetail(contactid) {
	var contactDetailResult = WL.Server.invokeSQLStatement({
		preparedStatement : contactDetailStatement,
		parameters : [ contactid ]
	});

	return contactDetailResult;
}

/*******************************************************************************
 * Implementation code for procedure - deleteContact'
 * 
 * 
 * @return - contactDelete
 */

var contactDeleteQuery = WL.Server
		.createSQLStatement("DELETE FROM CONTACT WHERE CONTACTID LIKE ?");
function deleteContact(contactid) {
	var contactDelete = WL.Server.invokeSQLStatement({
		preparedStatement : contactDeleteQuery,
		parameters : [ contactid ]
	});

	return contactDelete;
}

/*******************************************************************************
 * Implementation code for procedure - changeContPic'
 * 
 * 
 * @return - result
 */

var changeContPicQuery = WL.Server
		.createSQLStatement("UPDATE CONTACT SET CONTACT_IMAGE=? WHERE CONTACTID = ?");
function changeContPic(CONTACT_IMAGE, CONTACT_ID) {
	return result = WL.Server.invokeSQLStatement({
		preparedStatement : changeContPicQuery,
		parameters : [ CONTACT_IMAGE, CONTACT_ID ]
	});

}