// ******** imports ************

var jsonfile = require("jsonfile");
var Web3 = require('web3');
var jayson = require('jayson');


// ********* get the config files  ************

// note, as mushroom.js is in the root of the project the cwd() will always return the root so can use it to get to the .mushroom_config.js compiled_file

var root = process.cwd();

var mc_path = root + "/.mushroom_config.js"
var mushroom_config = require(mc_path);

var cc_path = root + mushroom_config.structure.contract_config_location + mushroom_config.structure.contract_config;
var contract_config = require(cc_path)


// ************ set up web3 and RPC client ***************

const web3  = new Web3();
var url = 'http://'+contract_config.rpc.host+':'+ contract_config.rpc.port;
web3.setProvider(new web3.providers.HttpProvider(url));
var rpc_client = jayson.client.http(url);


// ************ import helpers to test ******************


// var helper_file = '../../output/helpers/Base_contract_helper.js'
var helper_file = '../../output/helpers/Child_contract_helper.js'



var myContract = require(helper_file)

// test module level vars:
// console.log("myContract.get_abi: ", myContract.get_abi())
// console.log("myContract.get_contract: ", myContract.get_contract());


// ************** pass args to tx/calls ***************

var set_args_call = function () {
    return new Promise(function (resolve, reject) {
        var args = [{from: web3.eth.coinbase}];
        resolve(args)
    });
}

var set_args_tx = function (val) {
    return new Promise(function (resolve, reject) {

        var args = [val.plus(1),{from: web3.eth.coinbase}]; // increment stored value by 1
        resolve(args)
    });
}



// ************** test promise chain ***************

var switch_on_mining;

toggle_mining_on()
    .then(unlock_acc)
    .then(set_args_call)
    .then(myContract.get_child_value)
    .then(set_args_tx)
    .then(myContract.set_child_value)
    .then(set_args_call)
    .then(myContract.get_child_value)
    .then(toggle_mining_off)
    .then(end_success,end_error);




// ************** define promises **************

// ********* log pass_through *************

function log_func(pass_through){

    return new Promise ( function (resolve,reject){
        console.log("log_func called, pass_through: ", pass_through );
        resolve(pass_through)
    });
}


// ********** wait promise *****************

function wait_2000(pass_through){
    return new Promise(function (resolve,reject){
        console.log("pause.....")
        setTimeout(proceed,2000)

        function proceed() {

            console.log("proceeding.....");
            resolve(pass_through);
        }
    });
}

// ********* toggling mining **********

function toggle_mining_on(pass_through){
    console.log("\ntoggle_mining_on called");
    return new Promise(function (resolve, reject){

        if (web3.eth.mining) {
            console.log(" ---> Already mining\n")
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
                console.log(" ---> mining switched on\n")
                resolve(pass_through);
            }
        }
    });
}

function toggle_mining_off(pass_through){
    console.log("\ntoggle_mining_off called");
    return new Promise(function (resolve, reject){

        if(switch_on_mining){

            rpc_client.request('miner_stop', [], callback);
        }else{
            console.log(" --> leave mining as was\n");
            resolve(pass_through);
        }

        function callback(e,r) {
            if (e) {
                reject("toggle_mining_on error");
            } else {
                console.log(" ---> Switching off mining\n")
                resolve(pass_through);
            }
        }
    });
}

// ********* unlock account *********

function unlock_acc(pass_through){
    console.log("\nunlock_acc called");
    return new Promise(function (resolve,reject){

        web3.personal.unlockAccount(web3.eth.accounts[0],'mattspass', callback);  // unlock accounts

        function callback(e,r) {
            if (e) {
                reject("unlock_acc error");
            } else {
                console.log(" --->account unlocked");
                resolve(pass_through);
            }
        }
    });
}

// *********end of promise chain markers **********

function end_success(result) {
    console.log("\nEnd result: ---> ",result); // "Stuff worked!"
    console.log("\n *********  end of script **********");
}
function end_error(err) {
    console.log("\nEnd error: ---> ",err); // Error: "It broke"
    console.log("\n *********  end of script **********");
}
