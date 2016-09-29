pragma solidity ^0.4.1;

contract Base_contract{

    uint base_value;

    function Base_contract(){
        base_value = 100;
    }

    function get_base_value() constant returns (uint){
        return base_value;
    }

    function set_base_value(uint val) {
        base_value = val;
    }
}


contract Child_contract is Base_contract {

    uint child_value;

    function Child_contract(){
        child_value = 200;
    }

    function get_child_value() constant returns (uint){
        return child_value;
    }

    function set_child_value(uint val) {
        child_value = val;
    }
}