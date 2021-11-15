## JWT Flow

### STEP 1
  - Create a [certificate](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_key_and_cert.htm) for private key
  - Create a [connected app](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_connected_app.htm) in salesforce
  - NOTE: Instead of permission set, you can attach profiles as mentioned in the above connected app setup

### STEP 2
  - Create a node express app and host it.
  - Use npm libraries for generating the JWT
  - Supply JWT token with attributes to [jsforce](https://jsforce.github.io/document/) library to connect to salesforce.
  - NOTE: You also can use native REST end points.

### STEP 3
  - Test
    - https://sfdc-identity-flows.herokuapp.com/api/login/jwt
    - You will receive a instance URL and access token response
    - Follow Step 3 in username & password flow below
    - Reference [Connected App](https://help.salesforce.com/s/articleView?id=sf.connected_app_overview.htm&type=5) - You need a connected app to access salesforce resources

    - Code blocks below for JWT
`````
router.get('/jwt',  urlencodedParser, async (req, res, next) => {
    
const iss = process.env.CONSUMER_KEY
    const sub = process.env.USERNAME
    const aud = process.env.LOGIN_URL
    const key = process.env.PRIVATE_KEY
    try{
        const token = await getToken({
            iss: iss,
            sub: sub,
            aud: aud,
            privateKey: key.replace(/\\n/g, '\n')
        })

        const {conn} = await initJWT(token)
        if(conn.accessToken) {
            console.log(conn.accessToken)
            res.json({"instanceUrl": conn.instanceUrl, "accessToken": conn.accessToken})
        }else {
            console.log('Error', 'Did not receive any access token')
            res.json({"Error": "JWT : Error logging in"})
        }

    }catch(e) {
        console.log(e)
        res.json({"error": e})
    }

})
``````

````angular2html
function initJWT(token) {
    const conn = new jsforce.Connection()

    return new Promise((resolve, reject) => {
        conn.initialize({
            instanceUrl: token.instance_url,
            accessToken: token.access_token
        })
        if(conn){
            resolve({conn})
        }else {
            reject({"Err": "Error connecting to server via JWT"})
        }
    })
}
````

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
- NOTE: Replace the instanceUrl and accessToken with the value received from the previous step

```
FIND {${searchParam}} IN ALL FIELDS RETURNING Account
```

- URL
```
http://sfdc-identity-flows.herokuapp.com/api/accounts/find?instanceUrl=https://your-instance-url.my.salesforce.com&accessToken=your-access-token&searchParam=123456
```



![Image](https://www.enterprisetimes.co.uk/wp-content/uploads/2017/10/Appy.jpg)