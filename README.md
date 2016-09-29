# Mushroom
My own crack at making something a bit like Truffle

Mushroom is a tool kit for working with Ethereum Solidity Smart contracts:

* Contract compilation supporting multi-contract, multi file compilation
* Contract deployer which will push the compiled contracts onto your blockchain
* Contract helper generation, which generate a node.js contract specific abstraction for easy interaction with your contract
 
 Note: I wrote this on a mac, I haven't tested it on any other platforms yet
 
## Reason for writing Mushroom (for context and as a caveat)

Original I was using truffle from Consensys for compiling, deploying and interacting with my Smart contracts. However, on some occasions I was having difficulty getting it working with Geth and I was spending more time trying to work out truffle than writing smart contracts. This wasn't a problem with truffle, which is excellent, it's that I wasn't experienced at Javascript and needed to improve my understanding of smart contract compilation, deployment and interaction.
  
 So I decided I would write my own version of truffle primarily as an excerise to improve my understanding of:
 * Javascript - Promises, Closures, inheritance, npm
 * Debugging node/javascript
 * Web3 API
 * Solidity/solc compliation process
 * Deploying and tracking contracts on ethereum
 * IDEA SDKs - Intellij and WebStorm
 
 So there's an implicit caveat: Mushroom appears to work as intended, but some of the techniques are relativly new to me so there's always the chance I've *****d something up.

The Positive side is that I have tried to make it a simple as possible, well commented with a logical structure and descriptive variable names. So for somebody wanting to pick it apart to work out how to do something like this it is probably relativly easy to follow. 
 
 
 ## Installing Mushroom
 
 Prerequisites: 
 * node/npm (developed using v6.4.0)
 * An Ethereum test node you can point to via its rpc interface at ip:port (don;t use the main net for getting started it would be very expensive), see below for options
 
 
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
 * A directory called 'mushroom_template_files': this is basically a template for each new Mushroom project. Don't change the files in here unless you wat the changes to be replicated across all future projects 
 * A script called mushroom_init.sh, this is the script you will use to start a new mushroom project
 
## Starting a new Mushroom project 
 
 To start a new Mushroom project: 
 
 1) Make sure you are in the mushroom directory
 2) Run the initialisation script
 ```
 mushroom $ sh mushroom_init.sh -r ../<new_project_name>
 ```
 Explanation:
 * sh --> run a bash script
 * mushroom_init.sh --> a script which copies over the mushroom template
 * -r --> specifies that the new_project path is relative to the mushroom directory
                    (can use -a instead to specify an absolute path)
 * ../ --> relative path to the new directory (moving back a directory so the new project isn't mixed up with the mushroom directory)
 * <new_project_name> --> the path and name to the new_project (this will be created by the script) 
 
 3) Change to the specified project directory,
  ```
  mushroom $ cd ../<new_project_name>
  ```
  
  You should see the standard project structure inside the directory
 
 
 ## Mushroom project structure
 
 
 
 *** to complete *****
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 ## Setting up an Ethereum node
 
You have a few options for setting up an ethereum node for testing/ development
 
 1) Use testRPC, see: https://github.com/ethereumjs/testrpc
 2) Use the morden test net: https://github.com/ethereum/wiki/wiki/Morden
 3) Install a local ethereum node and set it up as a private chain: https://souptacular.gitbooks.io/ethereum-tutorials-and-tips-by-hudson/content/private-chain.html
4) Use my easy set up/ tear down dockerised geths (which is what I use and is really cool for setting up Ethereum Networks from scratch in a few seconds): https://github.com/mattbradburyuk/ethereumplay