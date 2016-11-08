var config = {
	username: "kith",
	password: "angular2.0",
	token: "dw9ziewyeardxswcy7driw4ci",
	realm: "ais",
	databaseId: "bkqdhycdy",
	tables: {
		customers: {
			dbid: "bkqdhyceg",
			rid: 3,
			name: 6
		},

		activities: {
			dbid: "bkqdhycek",
			rid: 3,
			type: 7,
			notes: 14
		}
	}
};

var database = new Base(config);

function runAll() {
	var ticket = database.getOneTimeTicket();
	console.log("TICKET: " + ticket);

	var ticket = database.authenticate(ticket, 1);
	console.log("AUTH TICKET: " + ticket);

	var dbid = database.findDbByName("BaseJS Testing");
	console.log("FindDBByName: " + dbid);

	var dbInfo = database.getDbInfo();
	console.log(dbInfo);

	var grantedDbs = database.grantedDbs();
	console.log(grantedDbs);

	var dtmInfo = database.getAppDtmInfo();
	console.log(dtmInfo);

	var variable = database.setDBVar("test", "hello world");
	console.log("SET VAR: " + variable);
	var variableValue = database.getDBVar("test");
	console.log("GET VAR: " + variableValue);

	var pageId = database.uploadPage(null, "test.txt", "asdfadsf");
	console.log("UPLOAD PAGE: " + pageId);

	var htmlPage = database.getDbPage(pageId);
	console.log(htmlPage);

	var success = database.deletePage(pageId);
	console.log("DELETE PAGE: " + success);

	var genAddRecordForm = database.teachers.genAddRecordForm({"8": "test"});
	console.log(genAddRecordForm);

	//Get User Info
	var response = database.getUserInfo("zsiglin@advantagequickbase.com");
	console.log("USER INFO: " + response["id"]);

	//Get User Roles
	var response = database.getUserRoles();
	console.log(response);

	var response = database.changeUserRole("58755660.cwj9", "12", "11");
	console.log(response);

	//Add Record
	var newRecordHash = { firstName: "Mike&Ike", lastName: "Johnson" }
	var rid = database.teachers.addRecord(newRecordHash);
	console.log("ADD RECORD: " + rid);

	var newRecordHash = { 8: "Mike", 9: "Johnson"}
	var rid2 = database.teachers.addRecord(newRecordHash);

	var numberOfRecords = database.teachers.getNumRecords();
	console.log(numberOfRecords);

	var editRecordHash = { firstName: "Stephan", lastName: "Smith" }
	var response = database.teachers.editRecord("3924", editRecordHash);
	console.log("EDIT RECORD: " + response);

	var response = database.teachers.changeRecordOwner("3924", "zsiglin@advantagequickbase.com");
	console.log("CHANGE RECORD OWNER: " + response);

	var response = database.teachers.copyMasterDetail({destrid: "0", sourcerid: "3924", copyfid: "8"});
	console.log("COPY RECORDS: " + response);

	var response = database.teachers.getRecordInfo("3924");
	console.log("GetRecordInfo:")
	console.log(response);


	var queries = [
		{ firstName: "SAND" },
		{ firstName: { XEX: "Kit" } },
		{ firstName: "NORTH", lastName: "Hensel" },
		{ or: [{ firstName: "Kit" }, { lastName: "Hensel" }] },
		{ or: [{ firstName: { XEX: "Kit"} }, { lastName: "Hensel" }] },
		{ or: [{ firstName: { CT: "Kit"} }, { lastName: "Hensel" }, { firstName: { CT: "Jack" } }] },
		{ firstName: "Kit", or: [{ lastName: "Hensel" }] },
		{ firstName: "Kit", or: [{ lastName: "Hensel" }], rid: 3 },
		{ firstName: { in: ["Kit", "Jack"]}},
		{ rid: { GT: "1", LT: "10" }}
	];

	queries.forEach(function(query){
		database.teachers.doQuery(query, {}, function(response){
			console.log(response);
		});
	});

	database.teachers.getTableFields(function(response){
		console.log(response);
	});

	var response = database.teachers.find("3924");
	console.log("FIND: " + response);

	var dbTables = data.getTables(function(response){ console.log(response); });

	var qid = "1"
	var response = database.teachers.doQuery(qid, { clist: ["rid"]})
	console.log("QUERY 2: " + response);

	var response = database.teachers.all();
	console.log(response);

	var response = database.teachers.getRids({ rid: "3924" })
	console.log("FIND RIDS: " + response);

	var response = database.teachers.first({ rid: { XEX: "" } }, { clist: "rid"});
	console.log("FIRST: " + response);

	var response = database.teachers.last({ rid: { XEX: "" } }, { clist: "rid"});
	console.log("LAST: " + response);

	//DoQueryCount
	var query = { rid: { XEX: "" } }
	var response = database.teachers.doQueryCount(query)
	console.log("DO QUERY COUNT: " + response);

	var dateCreated = BaseHelpers.dateToString(response[0]["1"]);
	var dateModified = BaseHelpers.dateTimeToString(response[0]["2"]);
	var totalHours = BaseHelpers.durationToString(response[0]["14"]);
	var timeOfDay = BaseHelpers.timeOfDayToString(response[0]["15"]);

	console.log("DATE CREATED: " + dateCreated);
	console.log("DATE MODIFIED: " + dateModified);
	console.log("TOTAL HOURS: " + totalHours);
	console.log("TIME OF DAY: " + timeOfDay);

	var response = database.teachers.deleteRecord("3924");
	console.log("DELETE: " + response);

	var csvArray = [
		{ firstName: 'Mike"s', lastName: "John>s&o<n" },
		{ firstName: "Step,hani'e", lastName: "Wallace" },
		{ firstName: "Jackson", lastName: "Williams" },
		{ firstName: "Martin", lastName: "Douglas" }
	]
	var response = database.teachers.importFromCSV(csvArray);
	console.log("IMPORT: " + response);

	//Delete Mass Records
	var query = { rid: { XEX: "" } };
	var response = database.teachers.purgeRecords(query);
	console.log("PURGE: " + response);

	//Get Table Fields
	var response = database.teachers.getTableFields();
	console.log(response);
}