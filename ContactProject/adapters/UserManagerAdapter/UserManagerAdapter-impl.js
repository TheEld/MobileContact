/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/************************************************************************
 * Implementation code for procedure - 'addUser'
 *
 *
 * @return - result
 */
 
var addUserQuery = WL.Server.createSQLStatement("INSERT INTO USER(USERNAME, PASSWORD) VALUES (?, ?)");
function addUser(username, password) {
	return result = WL.Server.invokeSQLStatement({
		preparedStatement : addUserQuery,
		parameters : [username, password]
	});
}

/************************************************************************
 * Implementation code for procedure - 'loginUser'
 *
 *
 * @return - loginResult
 */

var loginStatement = WL.Server.createSQLStatement("SELECT ID from USER WHERE USERNAME LIKE ? AND PASSWORD LIKE ?");
function loginUser(username, password) {
	var loginResult = WL.Server.invokeSQLStatement({
		preparedStatement : loginStatement,
		parameters : [username, password]
	});
	
	if(loginResult.resultSet.length > 0) {
		loginResult.userid = loginResult.resultSet[0].ID;
		loginResult.existentUser = JSON.parse(true);
	} else {
		loginResult.userid = null;
		loginResult.existentUser = JSON.parse(false);
	}
	
	return loginResult;
}