const customerData = require('./customerData.json');
const colors = require('colors/safe');
const ConfigError = require('./config-error');
const clipboardy = require('clipboardy');
const config = require('./config.json');
const {waitForClipboardStartingWith} = require('./clipboard-utils');
const {
	retrieveAccessToken,
	createAccountAccessConsent,
	authoriseProgramatically,
	authoriseManually,
	getAccounts,
	getTransactions,
	getFsaRatings
} = require('./api');

extractAllData();

async function extractAllData(){
	await authoriseAndGetAccounts(process.argv[2] === 'manual');
	await getRatings();
	await getTransactionsAgg();
	await getTotalSpend();
	await getcategoryAvgSpend();
}


async function getTransactionsAgg() {
	try {
		var dl = require('datalib');
		var data = dl.csv('./transactions.csv');	
		console.log(dl.format.summary(data));
		var rollup = dl.groupby('CustomerNumber','Month','DebitCreditInd','Currency','category','rating')
					  .summarize({'Amt': ['sum']})
					  .execute(data);
					//console.log(rollup);
		//console.log(rollup[0].CustomerNumber.toString());
		var fs = require("fs");
		//fs.truncate("./transactionsAgg.csv", 0, function(){console.log('done')});
		fs.appendFileSync("./transactionsAgg.csv",'CustomerNumber,Month,DebitCreditInd,Currency,category,amt,rating');
		for (let k = 0; k < rollup.length; k++) {
			fs.appendFileSync("./transactionsAgg.csv","\r\n" + rollup[k].CustomerNumber.toString() + ',' + rollup[k].Month.toString() +',' + rollup[k].DebitCreditInd.toString() +',' + rollup[k].Currency.toString() +',' + rollup[k].category.toString() +',' + rollup[k].sum_Amt.toString() +',' + rollup[k].rating.toString());
		}		
		
	} catch (error) {
		console.log('Error while fetching ratings data' + error.message);
	}
	
}

async function getTotalSpend() {
	try {
		var dl = require('datalib');
		var data = dl.csv('./transactions.csv');	
		console.log(dl.format.summary(data));
		var rollup = dl.groupby('CustomerNumber','Month','DebitCreditInd','Currency','category','rating')
					  .summarize({'Amt': ['sum']})
					  .execute(data);
					
		var fs = require("fs");
		//fs.truncate("./transactionsAgg1.csv", 0, function(){console.log('done')});
		fs.appendFileSync("./transactionsAgg1.csv",'CustomerNumber,Month,DebitCreditInd,Currency,category,amt,rating');
		for (let k = 0; k < rollup.length; k++) {
			if(rollup[k].category.toString().trim() != 'Internal'){
				fs.appendFileSync("./transactionsAgg1.csv","\r\n" + rollup[k].CustomerNumber.toString() + ',' + rollup[k].Month.toString() +',' + rollup[k].DebitCreditInd.toString() +',' + rollup[k].Currency.toString() +',' + rollup[k].category.toString() +',' + rollup[k].sum_Amt.toString() +',' + rollup[k].rating.toString());
			}
		}
		
		var data1 = dl.csv('./transactionsAgg1.csv');
		var rollup1 = dl.groupby('CustomerNumber','Month','DebitCreditInd','Currency','rating')
					  .summarize({'amt': ['sum']})
					  .execute(data1);
					
		fs.appendFileSync("./totalspend.csv",'CustomerNumber,Month,DebitCreditInd,Currency,amt,rating');
		for (let k = 0; k < rollup1.length; k++) {
			fs.appendFileSync("./totalspend.csv","\r\n" + rollup1[k].CustomerNumber.toString() + ',' + rollup1[k].Month.toString() +',' + rollup1[k].DebitCreditInd.toString() +',' + rollup1[k].Currency.toString() + ',' +rollup1[k].sum_amt.toString() +',' + rollup1[k].rating.toString());
		}
		
	} catch (error) {
		console.log('Error while fetching ratings data' + error.message);
	}
	
}

async function getcategoryAvgSpend() {
	try {
		var dl = require('datalib');
		var data = dl.csv('./transactions.csv');	
		console.log(dl.format.summary(data).toString().split('DebitCreditInd')[0].split("\n")[3].split(":")[1].trim());
		var rollup = dl.groupby('category','Month','Currency','rating')
					  .summarize({'Amt': ['sum']})
					  .execute(data);
					
		var fs = require("fs");
		//fs.truncate("./categoryAvgSpend.csv", 0, function(){console.log('done')});
		fs.appendFileSync("./categoryAvgSpend.csv",'category,Month,Currency,amt,rating');
		for (let k = 0; k < rollup.length; k++) {
			if(rollup[k].category.toString().trim() != 'Internal'){
				fs.appendFileSync("./categoryAvgSpend.csv","\r\n" + rollup[k].category.toString() +',' + rollup[k].Month.toString() +',' + rollup[k].Currency.toString() +',' +  (rollup[k].sum_Amt/dl.format.summary(data).toString().split('DebitCreditInd')[0].split("\n")[3].split(":")[1].trim()).toString() +',' + rollup[k].rating.toString());
			}
		}
		
	} catch (error) {
		console.log('Error while fetching ratings data' + error.message);
	}
	
}

async function getRatings() {
	try {
		var fs = require("fs");
		const Ratings = await getFsaRatings();
		console.log('ratings.....');
		fs.truncate("./ratings.csv", 0, function(){console.log('done')});
		for(let i=1 ; i < Ratings.split('BusinessName').length ; i++){
			console.log(Ratings.split('BusinessName')[i].split(',')[0].split('"')[2]);
			console.log(Ratings.split('BusinessName')[i].split('RatingValue')[1].split(',')[0].split('"')[2]);
			if(Ratings.split('BusinessName')[i].indexOf('PostCode') > -1){
				console.log(Ratings.split('BusinessName')[i].split('PostCode')[1].split(',')[0].split('"')[2]);
				fs.appendFileSync("./ratings.csv","\r\n" + Ratings.split('BusinessName')[i].split(',')[0].split('"')[2] + ',' + Ratings.split('BusinessName')[i].split('RatingValue')[1].split(',')[0].split('"')[2] +',' + Ratings.split('BusinessName')[i].split('PostCode')[1].split(',')[0].split('"')[2]);
			}
			else{
				console.log('NA');
				fs.appendFileSync("./ratings.csv","\r\n" + Ratings.split('BusinessName')[i].split(',')[0].split('"')[2] + ',' + Ratings.split('BusinessName')[i].split('RatingValue')[1].split(',')[0].split('"')[2] +',' + 'NA');
			}
		}
		
		
		
	} catch (error) {
		console.log('Error while fetching ratings data' + error.message);
	}
	
}


async function authoriseAndGetAccounts(manualAuthorisation = false) {
	try {
		
		mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
		//console.log('Customer Number : ' + customerData.Data.length);
		var fs = require("fs");
		
		var a = fs.readFileSync("./categoryMapping.csv");
	
		
		//fs.truncate("./transactions.csv", 0, function(){console.log('done')});
		
		fs.appendFileSync("./transactions.csv","CustomerNumber,DebitCreditInd,Month,Amt,Currency,TranInfo,category,rating");
		for (let k = 0; k < customerData.Data.length; k++) {
			console.log('Customer Number : ' + customerData.Data[k].customerinternalreference.customeridentificationnumber);
			
			console.log('Getting initial access token...');
			const accessToken = await retrieveAccessToken();

			console.log(`Access Token: ${format(accessToken)}. Creating consent...`);
			const consentId = await createAccountAccessConsent(accessToken);

			console.log(`Consent ID: ${format(consentId)}. Authorising...`);
		
		
			const authorisationCode = manualAuthorisation
				? await startManualAuthorisation(consentId)
				: await authoriseProgramatically(consentId,customerData.Data[k].customerinternalreference.customeridentificationnumber);

			console.log(`Authorisation code received: ${format(authorisationCode)}. Retrieving authorised access token...`);
			const authorisedAccessToken = await retrieveAccessToken(authorisationCode);

			console.log(`Access Token: ${format(authorisedAccessToken)}. Retrieving users accounts...`);
			const accounts = await getAccounts(authorisedAccessToken);

			console.log('Accounts:');
			//console.log(JSON.stringify(accounts, null, 4));
			//let jsonAccount  = JSON.parse(accounts);
			console.log(accounts[0].AccountId);
			
			console.log(`Access Token: ${format(authorisedAccessToken)}. Retrieving transactions...`);
			
			for (let i = 0; i < accounts.length; i++) {
				const trsansactions = await getTransactions(authorisedAccessToken,accounts[i].AccountId);

				console.log('trsansactions:');
				//console.log(JSON.stringify(trsansactions, null, 4));
				//var text = fs.readFileSync("./transactions.csv");
				for (let j = 0; j < trsansactions.length; j++) {
						//const dateInDataebase = new Date(text.split( "\n" )[text.split( "\n" ).length - 1].split(",")[2]);
						const dt = new Date(trsansactions[j].BookingDateTime);
						console.log('CustomerNumber:' + customerData.Data[k].customerinternalreference.customeridentificationnumber);
						console.log('CreditDebitIndicator:' + trsansactions[j].CreditDebitIndicator);
						console.log('BookingDateTime:' + trsansactions[j].BookingDateTime);
						console.log('Month' + mlist[dt.getMonth()]);
						console.log('Amount:' + trsansactions[j].Amount.Amount);
						console.log('Currency:' + trsansactions[j].Amount.Currency);
						console.log('TransactionInformation:' + trsansactions[j].TransactionInformation);
						var category;
						var rating;
						for(let l=0; l< a.toString().split("\r\n").length; l++){
							//categoryMapping.push(a.toString().split("\r\n")[l];
							if(a.toString().split("\r\n")[l].indexOf(trsansactions[j].TransactionInformation) > -1){
								category = a.toString().split("\r\n")[l].split(',')[1];
								if( a.toString().split("\r\n")[l].split(',')[2] >= 3){
									rating = 'Cat1';
								}
								else{
									rating = 'Cat2';
								}
								break;
							}
							else{
								category = 'NA'
								rating = 'NA'
							}
						}
						
                        fs.appendFileSync("./transactions.csv", "\r\n" + customerData.Data[k].customerinternalreference.customeridentificationnumber + ',' + trsansactions[j].CreditDebitIndicator + ',' + mlist[dt.getMonth()] + ',' + trsansactions[j].Amount.Amount + ',' + trsansactions[j].Amount.Currency + ',' + trsansactions[j].TransactionInformation + ',' + category + ',' + rating);
				}
				//console.log(trsansactions[0].CreditDebitIndicator);
			}
		}
		//getTransactionsAgg();
		
	} catch (error) {
		if (error instanceof ConfigError)
			console.log('Configuration error: ', error.message);
		else
			throw error;
	}
}

async function startManualAuthorisation(consentId) {
	return await authoriseManually(consentId, async userAuthorisationUrl => {
		await clipboardy.write(userAuthorisationUrl);

		console.log();
		console.log('Url for manual authorisation copied to clipboard, launch in a browser to proceed.');
		console.log('Once complete, copy the redirected URL to continue...');
		console.log();

		return await waitForClipboardStartingWith(`http://${config.teamDomain}/redirect`);
	});
}

function format(item) {
	return colors.magenta(item.length > 50
		? (item.substring(0, 50) + '…')
		: item);
}