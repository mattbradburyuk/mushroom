pragma solidity ^0.4.1;

import "Play_2_child.sol";

contract grandchild_contract is child_contract {

    uint grandchild_value;

    function grandchild_contract(){
        grandchild_value = 300;
    }

    function get_grandchild_value() constant returns (uint){
        return grandchild_value;
    }
}