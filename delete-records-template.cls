// Query with more fields to review
List<Approval_Request__c> recordsToDelete = [
    SELECT Id, Name, CreatedDate, CreatedBy.Name, LastModifiedDate
    FROM Approval_Request__c
    //Add filter criteria as needed
    ORDER BY CreatedDate DESC
    LIMIT 100 //start small for testing before mass deleting. 
];

// Display summary
System.debug('=== RECORDS TO DELETE ===');
System.debug('Total Count: ' + recordsToDelete.size());
System.debug('========================');


// UNCOMMENT WHEN READY TO DELETE:
// delete recordsToDelete;
// System.debug('DELETED ' + recordsToDelete.size() + ' records successfully');
