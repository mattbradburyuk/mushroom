#Release notes


## v0.0.3

Functionality

**common_promises_helper**

common_promises_helper.js is copied into output/helper directory on mushroom_init. It gives a set of common functions wrapped in promises which can be used in user code, currently includes:

 * unlock_acc: prompts for password before unlocking the coinbase account
 * end_success/ end_error functions for the end of the promise chain to pick up success or failure


**rpc config moved**

The configuration for the rpc connection to a geth client has moved from the  hidden .mushroom_config.js, to the visible contract_config.js

**linux**

Now works on linux


Bug fixes:

* 21: helpers generator is trying to create a helper for a non deployed contract 
* 16: Fix dummy password
* 22: mushroom_init.sh doesnt' copy template files to the correct folder when using linux

Other 

* tester.js now detects rpc ip:port so anybody can run the tester.js file.