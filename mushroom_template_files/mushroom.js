#!/usr/local/bin node

// ********* imports **************

var config = require("./.mushroom_config.js");


// ******** Welcome message ***********

var mushroom_str =
    '    ____________   \n' +
    '   /            \\  \n' +
    '  /   Mushroom   \\ \n' +
    ' (________________)\n' +
    '        |   |    \n' +
    '        |   |    \n' +
    '        |___|    a less good version of truffle :-) .... \n'

console.log(mushroom_str);



// ************* read in commandline command ***************

var command = process.argv[2]

switch(command){
    case 'compile':
        var compiler = process.cwd() + config.structure.compiler_location + config.structure.compiler;
        console.log("Calling compiler...  \n");
        require(compiler);
        break;

    case 'deploy':
        var deployer = process.cwd() + config.structure.deployer_location + config.structure.deployer;
        console.log("Calling deployer...  \n");
        require(deployer);
        break;

    case 'helpers':
        var helper_generator = process.cwd() + config.structure.helper_generator_location + config.structure.helper_generator;
        console.log("Calling helper_generator.js ...\n");
        require(helper_generator);
        break;
    
    default:
        console.log("Command not recognised");
        console.log("Correct usage: TBD");
}
    

