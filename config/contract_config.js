module.exports = {
    
    files_to_compile: ["Play_2_base.sol","Play_2_child.sol","Play_2_grandchild.sol" ],
    compiler_output_file: "Play.json",
    compiler_output_file_to_deploy: "Play.json",
    contracts_to_deploy: ["grandchild_contract"],
    deployment_record: "deployed_instances.json"
    
};