// ******** imports ************

var jsonfile = require("jsonfile");
var Web3 = require('web3');


// ************ set up web3 ***************

const web3 = new Web3();
var url = sub_geth_host_port;
web3.setProvider(new web3.providers.HttpProvider(url));


