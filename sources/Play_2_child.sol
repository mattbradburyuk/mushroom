pragma solidity ^0.4.1;

import "Play_2_base.sol";

contract child_contract is base_contract {

    uint child_value;

    function child_contract(){
        child_value = 200;
    }

    function get_child_value() constant returns (uint){
        return child_value;
    }
}