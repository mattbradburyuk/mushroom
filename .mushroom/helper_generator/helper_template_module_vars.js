// ******** module variables (closed over when module required - I think) ************

var abi = JSON.parse('sub_abi');
var address = 'sub_address';
var contract = web3.eth.contract(abi).at(address);

function Contract(){

}

Contract.get_abi = function(){
    return abi
}

Contract.get_address = function(){

    return address
}

Contract.get_contract = function(){
    return contract
}


