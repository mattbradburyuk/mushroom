// note this script deliberately uses synchronous calls to run through like a script.

console.log("Compiler called...");

// *********** import requirements  ***********

var decomment = require('decomment');
var fs = require('fs');
var solc = require('solc');
var jsonfile = require("jsonfile");


// ********* get the config files  ************

// note, as mushroom.js is in the root of the project the cwd() will always return the root so can use it to get to the .mushroom_config.js file

var root = process.cwd();

var mc_path = root + "/.mushroom_config.js"
var mushroom_config = require(mc_path);

var cc_path = root + mushroom_config.structure.contract_config_location + mushroom_config.structure.contract_config;
var contract_config = require(cc_path)



// *********** get files and make input  *********

var num_files = contract_config.files_to_compile.length;
// console.log("num_file: ", num_files);

var collapsed = [];
var solc_input = {};

for (i = 0; i < num_files; i++ ){
    
    var file = contract_config.files_to_compile[i];
    var file_path = root + mushroom_config.structure.source_directory + file;
    // console.log("file_path: ",i, ":",file_path);

    //check the file is a .sol
    if (check_sol(file)==false) {
        console.log("error:", file, " not .sol file");
        return;
    }
    collapsed[i] = collapse(file_path);
    solc_input[contract_config.files_to_compile[i]] = collapsed[i] ;
}

// console.log("\nsolc_input:", solc_input, "\n\n");


// ******** compile solc_input  **************

console.log(" ---> compiling...");

var output = solc.compile({sources: solc_input},1);

// console.log("output:", output);

// for (var contractName in output.contracts)
//     console.log(contractName + ': ' + output.contracts[contractName].bytecode);

// ********** write output to .json file ************

var com_path = root + mushroom_config.structure.compiler_output_directory + contract_config.compiler_output_file;
console.log(" --> writing compiled contracts to: ", com_path);
jsonfile.writeFileSync(com_path, output);



console.log("\n *********  end of script **********");




// ************* check .sol files ***********

function check_sol(file){
    if (file.slice(-4) == ".sol"){return true;} else{return false;};
}


// ************* Collapse .sol file *****************

function collapse(path){
    console.log(" ---> collapsing: ", path);

    try {
        var data = fs.readFileSync(path);
    }
    catch(e){
        console.log(JSON.stringify(e))
        throw " ---> cannot read file";
    }

    var code = data.toString();
    var de_code = decomment(code);
    var de_returned = de_code.replace(/\n/g, " ");
    // console.log("de_return: ", de_returned);
    return de_returned;
}
