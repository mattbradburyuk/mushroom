// note this script deliberately uses synchronous calls to run through like a script.

// *********** import requirements  ***********

var decomment = require('decomment');
var fs = require('fs');
var solc = require('solc');
var jsonfile = require("jsonfile");


console.log("solc version: ",solc.version(),"\n");

// ********* get the config files  ************

// note, as mushroom.js is in the root of the project the cwd() will always return the root so can use it to get to the .mushroom_config.js compiled_file

var root = process.cwd();

var mc_path = root + "/.mushroom_config.js"
var mushroom_config = require(mc_path);

var cc_path = root + mushroom_config.structure.contract_config_location + mushroom_config.structure.contract_config;
var contract_config = require(cc_path)



// *********** get files and make input  *********

console.log("Collapsing and Compiling contracts:")

var num_files = contract_config.files_to_compile.length;
// console.log("num_file: ", num_files);

var collapsed = [];
var solc_input = {};

for (i = 0; i < num_files; i++ ){
    
    var file_to_compile = contract_config.files_to_compile[i];
    var file_path = root + mushroom_config.structure.source_directory + file_to_compile;
    // console.log("compiled_file: ",i, ":",compiled_file);

    //check the compiled_file is a .sol
    if (check_sol(file_to_compile)==false) {
        console.log("error:", file_to_compile, " not .sol compiled_file");
        return;
    }
    collapsed[i] = collapse(file_path);
    solc_input[contract_config.files_to_compile[i]] = collapsed[i] ;
}

// console.log("\nsolc_input:", solc_input, "\n\n");



// ******** compile solc_input  **************



var output = solc.compile({sources: solc_input},1);

// console.log("output:", output);

for (var contractName in output.contracts)
    // console.log(contractName + ': ' + output.contracts[contractName].interface);
    console.log(' ---> ', contractName + ': Compiled')
// ********** write output to .json compiled_file ************

var com_path = root + mushroom_config.structure.compiler_output_directory + contract_config.compiler_output_file;
console.log("\nWriting compiled contracts to: ");
console.log(" ---> ", contract_config.compiler_output_file);
jsonfile.writeFileSync(com_path, output);



// ************* check .sol files ***********

function check_sol(file){
    if (file.slice(-4) == ".sol"){return true;} else{return false;};
}


// ************* Collapse .sol compiled_file *****************

function collapse(path){
    // console.log(" ---> collapsing: ", path);

    try {
        var data = fs.readFileSync(path);
    }
    catch(e){
        console.log(JSON.stringify(e))
        throw " ---> cannot read compiled_file";
    }

    var code = data.toString();
    var de_code = decomment(code);
    var de_returned = de_code.replace(/\n/g, " ");
    // console.log("de_return: ", de_returned);
    return de_returned;
}
