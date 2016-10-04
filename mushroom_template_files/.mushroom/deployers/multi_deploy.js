// deploys compiled contracts


// ********** imports ****************

var Web3 = require('web3');
var jayson = require('jayson');
var jsonfile = require("jsonfile");



// ********* get the config files  ************

var root = process.cwd();

var mc_path = root + "/.mushroom_config.js";
var mushroom_config = require(mc_path);

var cc_path = root + mushroom_config.structure.contract_config_location + mushroom_config.structure.contract_config;
var contract_config = require(cc_path);



// *********** set up web3 and rpc ****************

const web3  = new Web3();
var url = 'http://'+contract_config.rpc.host+':'+ contract_config.rpc.port;
web3.setProvider(new web3.providers.HttpProvider(url));
var rpc_client = jayson.client.http(url);

// check connection objects
// console.log(web3._requestManager.provider.host);
// console.log(rpc_client.options.host)



// ********** execute Promise chain ***************

var switch_on_mining;

read_in_json()
    .then(unlock_acc)
    .then(toggle_mining_on)
    .then(deploy_contracts)
    .then(toggle_mining_off)
    .then(write_json_to_file)
    .then(end_success,end_error);



// // ********** define promises ******************

function read_in_json(){
    console.log("Reading in compiled contracts");
    return new Promise(function(resolve,reject){

        var file = contract_config.compiler_output_file_to_deploy;
        var file_path = root + mushroom_config.structure.compiler_output_directory + file
        
        console.log(" ---> Reading in json from compiled compiled_file:", file);
        
        jsonfile.readFile(file_path, callback);

        function callback(e,json) {
            if (e) {
                reject("error reading json");
            } else {
                console.log(" ---> json read in");
                resolve(json);
            }
        }
    });
}

function unlock_acc(pass_through){
    console.log("\nUnlocking coinbase account");
    return new Promise(function (resolve,reject){

        web3.personal.unlockAccount(web3.eth.accounts[0], 'mattspass', callback);  // unlock accounts

        function callback(e,r) {
            if (e) {
                reject("unlock_acc error");
            } else {
                console.log(" ---> account unlocked");
                resolve(pass_through);
            }
        }
    });
}


function deploy_contracts(json){

    console.log("\nDeploying contracts");

    return new Promise(function(resolve,reject){

        // console.log("json: ", json);

        var contracts_to_deploy = contract_config.contracts_to_deploy;

        // console.log("contracts_to_deploy: ", contracts_to_deploy);

        //  check all contracts have json before deploying any

        for (var i in contracts_to_deploy){

            var name = contracts_to_deploy[i];
            if (name in json.contracts){
                console.log(" ---> found compiled contract for ",  name);
            }else{
                var err =  name + " not in compiled_output_file_to_deploy"
                console.log(" --->" , err);
                reject(err)
            }
        }

        // set up promises to deploy each contract

        var proms = [];
        var names = [];

        for (var i in contracts_to_deploy) {

            var contract_json = json.contracts[contracts_to_deploy[i]];
            names[i] = contracts_to_deploy[i];
            proms[i] = deploy_contract(contract_json);
        }

        Promise.all(proms).then(collect_json_returns).then(resolve,reject);


        // collects return values from Promise.all and creates json to be written to the deployed compiled_file

        function collect_json_returns(return_arr){

            var jsons = [];
            for (var i in names){
                jsons[i] = { name:names[i], details: return_arr[i]}
            }

            var json_to_file = {contracts: jsons};
            resolve(json_to_file)
        }
    });
}



function deploy_contract(contract_json){
    // console.log("\ndeploy_contract called");
    return new Promise(function(resolve,reject) {

        var iface = JSON.parse(contract_json.interface);    // interface needs to be in JSON not a string
        // console.log("interface: ", iface);

        var bc = contract_json.bytecode;
        // console.log("bytecode: ", bc);

        var contract_obj = web3.eth.contract(iface);

        contract_obj.new(
            {
                from: web3.eth.accounts[0],
                data: bc,
                gas: 3000000
            }, callback_x)

        function callback_x(e,contract) {
            if (e) {
                console.log("contract_obj.new error");
                reject(e);
            } else {

                if (typeof contract.address != 'undefined') {
                    console.log(' ---> Contract mined');
                    console.log('      ---> address:' + contract.address)
                    console.log('      ---> transactionHash: ' + contract.transactionHash)
                    var json = {"address": contract.address, "tx_hash": contract.transactionHash};
                    resolve(json);
                }
            }
        }
        });
}

function write_json_to_file(json_to_file){
    console.log("\nWriting deployed details to file: ");
    return new Promise(function (resolve,reject){

        var dep_path = root + mushroom_config.structure.deployer_output_directory + contract_config.deployment_record;

        console.log(" --->", contract_config.deployment_record);

        jsonfile.writeFile(dep_path, json_to_file, callback);

        function callback(e,r) {
            if (e) {
                reject(e);
            } else {
                console.log(" ---> written to file\n");
                resolve("success !!!");
            }
        }
    });
}


// ********* toggling mining **********

function toggle_mining_on(pass_through){
    console.log("\nSwitch on mining");
    return new Promise(function (resolve, reject){

        if (web3.eth.mining) {
            console.log(" ---> Already mining")
            switch_on_mining = false;
            resolve(pass_through);
        }else{
            switch_on_mining = true
            rpc_client.request('miner_start', [], callback);
        }

        function callback(e,r) {
            if (e) {
                reject("toggle_mining_on error");
            } else {
                console.log(" ---> mining switched on")
                resolve(pass_through);
            }
        }
    });
}

function toggle_mining_off(pass_through){
    console.log("\nSwitching mining off");
    return new Promise(function (resolve, reject){

        if(switch_on_mining){

            rpc_client.request('miner_stop', [], callback);
        }else{
            console.log(" --> leave mining as was");
            resolve(pass_through);
        }

        function callback(e,r) {
            if (e) {
                reject("toggle_mining_on error");
            } else {
                console.log(" ---> Switching off mining")
                resolve(pass_through);
            }
        }
    });
}


// ********* pass_through logger **********

function pass_though(val) {
    console.log("\npass_through called");
    console.log(" ---> val:  ",val);
    return val
}


// *********end of promise chain markers **********

function end_success(result) {
    console.log("\nEnd result: ---> ",result); // "Stuff worked!"
    // console.log("\n *********  end of script **********");
}
function end_error(err) {
    console.log("\nEnd error: ---> ",err); // Error: "It broke"
    // console.log("\n *********  end of script **********");
}



