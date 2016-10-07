/*
to add:
- mining on/off -> need to work out how to do toggle variable (in module? or need to add in main code(ugly))

- log passthough

*/


// ********** imports ****************

var Web3 = require('web3');
var jayson = require('jayson');
var jsonfile = require("jsonfile");



// ********* get the config files  ************

var root = process.cwd();  // assumes called from root of project

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
module.exports = {



    // ********* unlock account *********

    unlock_acc: function unlock_acc(pass_through)
    {
        console.log("\nunlock_acc called");
        return new Promise(function (resolve, reject) {

            var prompt = require('prompt');

            var schema = {
                properties: {
                    password: {
                        message: 'Please enter password for coinbase account',
                        required: true,
                        hidden: true
                    }
                }
            };

            prompt.message = '';
            prompt.start();

            prompt.get(schema, function (err, result) {

                console.log('Password input received...');

                web3.personal.unlockAccount(web3.eth.accounts[0], result.password, callback);  // unlock accounts

            });
            function callback(e, r) {
                if (e) {
                    reject("unlock_acc error");
                } else {
                    console.log(" --->account unlocked");
                    resolve(pass_through);
                }
            }
        });
    },


    // ********* log pass through *******************

    log_pass_through: function (args){

        return new Promise(function(resolve,reject){

            console.log("Pass_through", args);

            resolve(args)

        });
    },



    // *********end of promise chain markers **********

    end_success: function end_success(result) {
        console.log("\nEnd result: ---> ", result); // "Stuff worked!"
        // console.log("\n *********  end of script **********");
    },

    end_error: function end_error(err) {
        console.log("\nEnd error: ---> ", err); // Error: "It broke"
        // console.log("\n *********  end of script **********");
    }

};