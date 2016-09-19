contract Greeter {

    event Greeter_event(address indexed _from, string message);

    string greeting;
    address owner;


    function Greeter(string _greeting) public {
        greeting = _greeting;
        owner = msg.sender;
    }

    /* main function */
    function greet() returns (string) {
        Greeter_event(msg.sender, "Greeter has fired");
        return greeting;
    }

    function kill() { if (msg.sender == owner) suicide(owner); }

}