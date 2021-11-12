## Username & Password Login Flow

### STEP 1: 
- #### Login

NOTE: You will need username, password + token to login 
 - *Example*: 
 - > username=foo@acme.com 
 - > password+token=secret-pwd12345
 - > loginUrl=https://login.salesforce.com OR https://test.salesforce.com (whichever is applicable)

 - Build the below URL as per the params above and invoke in a browser
```
https://sfdc-identity-flows.herokuapp.com/api/login?username=foo@acme.com&password=secret-pwd12345&loginUrl=https://login.salesforce.com
```

### STEP 2: 
- #### Save the access token and instance url

From the above step you will get the following JSON output 

- Success
  ```
  {"instanceUrl":"https://your-instance-url.my.salesforce.com","accessToken":"your-access-token"}
  ```
  - Error
  ```
  {"Error": "Error logging in"}
  ```


### STEP 3:
- #### Invoke the below URL to search a SOSL query returning Accounts

```
FIND {${searchParam}} IN ALL FIELDS RETURNING Account
```

- URL
```
http://sfdc-identity-flows.herokuapp.com/api/accounts/find?instanceUrl=https://your-instance-url.my.salesforce.com&accessToken=your-access-token&searchParam=123456
```



![Image](https://www.enterprisetimes.co.uk/wp-content/uploads/2017/10/Appy.jpg)