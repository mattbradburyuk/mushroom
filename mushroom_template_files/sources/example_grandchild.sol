pragma solidity ^0.4.1;

import "example_child.sol";

contract Grandchild_contract is Child_contract {

    uint grandchild_value;

    function Grandchild_contract(){
        grandchild_value = 300;
    }

    function get_grandchild_value() constant returns (uint){
        return grandchild_value;
    }

    function set_grandchild_value(uint val) {
        grandchild_value = val;
    }
}