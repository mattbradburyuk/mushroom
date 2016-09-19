pragma solidity ^0.4.1;

contract base_contract{

    uint base_value;

    function base_contract(){
        base_value = 100;
    }

    function get_base_value() constant returns (uint){
        return base_value;
    }
}

contract child_contract is base_contract {

    uint child_value;

    function child_contract(){
        child_value = 200;
    }

    function get_child_value() constant returns (uint){
        return child_value;
    }
}