# Mushroom
My crack at making something a bit like Truffle...

Mushroom is a tool kit for working with Ethereum Solidity Smart contracts, it includes:

 * Contract compilation, supporting multi-contract, multi file compilation
 * Contract deployer, which will push the compiled contracts onto an Ethereum blockchain
 * Contract helper generator, which generate a node.js contract specific abstraction for easy interaction with your contract
 
 Note: I wrote this on a mac, I haven't tested it on any other platforms yet
 
 
## Reason for writing Mushroom (for context and as a caveat)

Original I was using truffle from Consensys for compiling, deploying and interacting with my Smart contracts. However, on some occasions I was having difficulty getting it working with Geth and I was spending more time trying to work out truffle than writing smart contracts. This wasn't a problem with truffle, which is excellent, it's that I wasn't experienced at Javascript and I needed to improve my understanding of smart contract compilation, deployment and interaction.
  
So I decided I would write my own version of truffle primarily as an excerise to improve my understanding of:
 * Javascript - Promises, Closures, inheritance, npm
 * Debugging node/javascript
 * Web3 API
 * Solidity/solc compliation process
 * Deploying and tracking contracts on ethereum
 * IDEA SDKs - Intellij and WebStorm
 
I intent Mushroom to be useful for working with Smart Contracts but also useful where the user wants to be able to dig in and understand the processes under the hood. 

To this end, I've tried to make mushroom as simple and self explanatory as possible:
 
 * Modular structure, the directory structure pretty much explains what the each part does
 * Well commented, I have tried to explain what each bit of code is doing
 * Descriptive function and variable names
  
Any feedback will be gratefully received, you can raise an issue on the Github repo: https://github.com/mattbradburyuk/mushroom/issues

 
#Using Mushroom
 
##Prerequisites

 * node/npm (developed using v6.4.0)
 * An Ethereum test node you can point to via its rpc interface at ip:port (don't use the main net for getting started it would be very expensive), see below for options
 
 
##Setting up an Ethereum node
 
You have a few options for setting up an ethereum node for testing/ development:
 
 1) Use testRPC, see: https://github.com/ethereumjs/testrpc
 
 2) Use the morden test net: https://github.com/ethereum/wiki/wiki/Morden
 
 3) Install a local ethereum node and set it up as a private chain: https://souptacular.gitbooks.io/ethereum-tutorials-and-tips-by-hudson/content/private-chain.html
 
 4) Use 'ethereumplay' my easy set up/ tear down dockerised geths (which is what I use and is really cool for setting up Ethereum Networks from scratch in a few seconds): https://github.com/mattbradburyuk/ethereumplay 
 
##Installing Mushroom

Here's the steps for installing Mushroom
 
 1) Change to the directory where you want to install Mushroom 
 
 2) Clone this repo:
 ```
 $ git clone https://github.com/mattbradburyuk/mushroom.git
 ```
 3) This should give you a folder called mushroom which you should change into
 ```
 $ cd mushroom
 ```
 4) Take a look in the mushroom folder, there is: 
 * A directory called 'mushroom_template_files': This is basically a template for each new Mushroom project. Don't change the files in here unless you want the changes to be replicated across all future projects 
 * A script called 'mushroom_init.sh': This is the script you will use to start a new mushroom project
 
##Starting a new Mushroom project 
 
To start a new Mushroom project: 
 
 1) Make sure you are in the mushroom directory
 
 2) Run the initialisation script
 
```
mushroom $ sh mushroom_init.sh -r ../new_project_name
```
 Explanation:
 * 'sh' --> run a bash script
 * 'mushroom_init.sh' --> a script which copies over the mushroom template
 * '-r' --> specifies that the new_project path is relative to the mushroom directory
                    (can use '-a' instead to specify an absolute path)
 * '../' --> relative path to the new directory (In this case moving back a directory so the new project isn't mixed up with the mushroom directory)
 * 'new_project_name' --> name of the new_project directory (this will be created by the script) 
 
The script will copy over a clean version of a mushroom project from the template in '/mushroom/mushroom_template_files'. Then run npm to install the dependencies. 

 
 3) Change to the specified project directory, eg
 
 ```
 mushroom $ cd ../new_project_name
 ``` 
 You should see the standard project structure inside the directory (see next section)

 4) Open .mushroom_config.js (its currently a hidden file so you have to use 'ls -a' to see it, bug raised to change that)
 
 
  ```
  module.exports = {
      rpc: {                           <----- this points to the geth client you want to interact with
          host: "192.168.99.100",
          port: 8541
      },
      ...
}
 ```
 5) Change host and port so it points to the Ethereum client (eg Geth) you want to interact with and save the file
 
 
##Mushroom project directory structure
 A Mushroom project has the following directories and files
 
**sources**
 
 This is where you put your solidity .sol files which you want to compile
 
**output**
 
 All generated output from mushroom is written to one of the folders in the 'output' directory:
 
 * /compiled: holds the compiled output from the solc compiler
 * /deployed: holds a file containing information about deployed contracts (address and tx_receipt for deployment tranasction)
 * /helpers: holds the files which provide contract abstractions for each deployed contract
 
**config**
 
Contains contract_config.js, this is a json file which allows the you to specify what should be compiled, deployed and what the output files should be called.
 
 ```
 module.exports = {
     
     files_to_compile: ["example_child.sol","example_grandchild.sol" ],
     compiler_output_file: "compiled.json",
     compiler_output_file_to_deploy: "compiled.json",
     contracts_to_deploy: ["Base_contract","Child_contract"],
     deployment_record: "deployed_instances.json"
     
 };
 ```

 
**.mushroom**
 
This is the functionality of Mushroom, take a look if you want to understand whats under the hood.
 
 
**mushroom.js**
 
This is the main .js file which the you run to invoke a given function (see Mushroom commands below)
 
**.mushroom_config.js**
 
This file holds the configuration for mushroom
 
 ```
 module.exports = {
     rpc: {                           <----- this points to the geth client you want to interact with
         host: "192.168.99.100",
         port: 8541
     },
     structure: {                     <----- this tells Mushroom where to expect files to be in its structure
         source_directory: "/sources/",
         
         compiler: "multi_compiler.js",
         compiler_location: "/.mushroom/compilers/",
         compiler_output_directory: "/output/compiled/",
         
         deployer: "multi_deploy.js",
         deployer_location: "/.mushroom/deployers/",
         deployer_output_directory: "/output/deployed/",
 
         helper_generator: "helper_generator.js",
         helper_generator_location: "/.mushroom/helper_generator/",
         helper_output_directory: "/output/helpers/",
         
         contract_config: "contract_config.js",
         contract_config_location: "/config/"
     }
 };
 ```
 
 

 
##Mushroom commands
 
All commands should be run from the project root and take the form:
 ```
 project_root $ node mushroom.js command
 ```
 
 Explanation: 
 * 'node' -> Mushroom is written in node, you run it as a .js file through the node interpreter
 * 'mushroom.js' -> the .js file which interprets the commands and fires the appropriate functionality
 * 'command' -> the command you want to run
 
 
The commands are as follows: 
 
**compile**
 
 Compiles and links contracts contained with in one or many .sol files
 
  ```
  project_root $ node mushroom.js compile
  ```
 
 1) Looks up the files to compile in contract.config (1)
 
  ```
  module.exports = {
      
      files_to_compile: ["example_child.sol","example_grandchild.sol" ],    <----- 1
      compiler_output_file: "compiled.json",                                <----- 2
      compiler_output_file_to_deploy: "compiled.json",
      contracts_to_deploy: ["Base_contract","Child_contract"],
      deployment_record: "deployed_instances.json"
      
  };
  ```
 
 2) Read the files in, compresses them to remove comments and carriage returns
 
 3) Compiles all the contracts contained in the .sol files into one json output
 
 4) Writes the output to the file specified at (2) in the '/output/compiled' directory
 
 This output file contains lots of usfuls data about each of the compiled contracts and the compilation process including 
  * bytecode
  * function hashes
  * gas estimates
  * interface (abi)
  * opcodes
  * source files list
  * formal verification output (not sure about this bit)
 
 
**deploy**
 
 Deploys compiled contracts to Ethereum
 
  ```
  project_root $ node mushroom.js deploy
  ```
 
 1) Looks up the name of the file containing the contracts to deploy in contract.config (3)
 
  ```
  module.exports = {
      
      files_to_compile: ["example_child.sol","example_grandchild.sol" ],    
      compiler_output_file: "compiled.json",                                
      compiler_output_file_to_deploy: "compiled.json",                      <----- 3
      contracts_to_deploy: ["Base_contract","Child_contract"],              <----- 4
      deployment_record: "deployed_instances.json"                          <----- 5
      
  };
  ```
 2) Looks up which contracts to deploy from the file (4)
 
 3) Switches on mining if not on already and unlocks the coinbase account 
 
 (****** currently this is set to my dummy password 'mattspass', this needs fixing so works with a non dummy password - bug raised *******)
 
 4) Deploys the contracts
 
 5) Switches mining off if it wasn't on previously
 
 6) Writes out the details of the deployed contracts to a json file specified in (5)  
 ```
 {"contracts":
  [{"name":"Base_contract",
    "details":{
      "address":"0x989b2117a78e344905f22ae4a285c3c5e412fa20",
      "tx_hash":"0xab4fd58ffd297c207c0b8bcd977ee5d18919823a7a1791dcf23001767fbcd083"}
   },
   {"name":"Child_contract",
   "details":{
      "address":"0xdb9eb57ca186291dd51aa741ec5a4ae02b2f04fd",
      "tx_hash":"0xf7c7457be83de7f5ecd7e9177a79577c4885528324e8ecd8232a5f87faf1fc08"}
   }
 ]}
 ```
 
 Note, this file gets completely overwritten with each deploy
 
**helpers**
 
 Generates helper files which provide a contract abstraction for easy interaction with each deployed contract
 
   ```
   project_root $ node mushroom.js helpers
   ```
 
 The problems:
 
 * Node is single threaded. To make API calls to Ethereum can take many seconds, this will lock the thread if done synchronously so it has to be done asynchronously using call backs. Call back are a pain and get very messy when nested into a 'do this' --then--> 'do this' --then--> 'do this' etc... pattern
 * When sending a transaction in to Ethereum the call back only tells you when the transaction is received, often you want to know when its mined before you take the next action
 * You need to know information (abi, address etc...) about the deployed contract to interact with it, this info will change with different deployments
 
Helpers address these problems by providing a (auto generated) contract abstraction
  
To include helper in your project:
  
  ```
  var helper_file = '/your/path/to/file/Your_contract_helper.js'
  var Your_contract = require(helper_file)
  ```
  
The contract abstraction: 
  
 1) Provides access to deploy contract information
 
 ```
 Your_contract.abi      -----> returns the contract abi
 
 Your_contract.address  -----> returns the contract deployed address
 
 your_contract.contract -----> returns the web3 object which can be used to interact with the contract
 
 ```
 2) Wraps interactions to the contract in a Promise.
  
  These promises can be chained together to form what behaves like a chain of synchronous functions, for example:
 ```
 toggle_mining_on()
     .then(unlock_acc)                      <----- other functions you might write
     .then(set_args_call)
     .then(Your_contract.get_child_value)   <----- contract interactions
     .then(set_args_tx)
     .then(Your_contract.set_child_value)   <----- contract interactions
     .then(set_args_call)
     .then(Your_contract.get_child_value)   <----- contract interactions
     .then(toggle_mining_off)
     .then(end_success,end_error);
 
 
 ``` 
 
 3) Provides a function on the contract object for each of the Smart Contract functions (except fallback).
 
 For example, from the bundled example solidity file: 
 
 ```
 pragma solidity ^0.4.1;
 
 contract Base_contract{
 
     uint base_value;
 
     function Base_contract(){      
         base_value = 100;
     }
 
     function get_base_value() constant returns (uint){         <---- generates Your_contract.get_base_value() 
         return base_value;
     }
 
     function set_base_value(uint val) {                        <---- generates Your_contract.set_base_value()  
         base_value = val;
     }
 }
 
 contract Child_contract is Base_contract {
 
     uint child_value;
 
     function Child_contract(){
         child_value = 200;
     }
 
     function get_child_value() constant returns (uint){        <----- generates Your_contract.get_child_value()
         return child_value;
     }
 
     function set_child_value(uint val) {                       <----- generates Your_contract.set_child_value()
         child_value = val;
     }
 }
 ```
 
 Note, because of inheritance, the contract abstraction of Child_contract will also have the functions for Base_contract
 
 4) Distinguishes between constant and non-constant functions. 
 
 * Mushroom will detect if the Solidity method is constant or not, 
 * For constant functions (ie ones that don't change the Ethereum state) a 'call' will be used to interact with Ethereum, 
 * For non-constant functions a 'transaction' is used which requires gas to power the state change
 


5) Waits until the transaction is mined.
 
For non-constant functions the call to the function will only complete once the transaction has been mined
 
 6) Varies the number of arguments expected

For calls the format is  *********** check this is true, can calls receive input variables ***********

```
your_contract.constant_function([<.sol function arg 1>,...., <.sol function arg n>, {transaction object}])

```
 
 For transactions the format is  
 
 ```
 your_contract.non-constant_function([<.sol function arg 1>,...., <.sol function arg n>, {transaction object}])
 
 ```
 
 Note, there is no callback required, this is handled in the promise wrapper
 
 
##Example .sol files

The Mushroom project template has two example .sol files: 
* example_child.sol
* example_grandchild.sol

(These demonstrate Smart Contract inheritance both within one file and across two files)

You can run the compile, deploy and helpers commands (see above) on these files to see them in action straight away

Also, to test out the heplers you can run: 
```
new_project $ node ./.mushroom/helper_generator/tester.js

```
This will run a quick interaction test using the contract abstraction, which reads in a value, increments it by 1 then reads it again.
  
 