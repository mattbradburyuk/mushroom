module.exports = {
    
    files_to_compile: ["example_child.sol","example_grandchild.sol" ],
    compiler_output_file: "example.json",
    compiler_output_file_to_deploy: "example.json",
    contracts_to_deploy: ["grandchild_contract"],
    deployment_record: "deployed_instances.json"
    
};