module.exports = {

    rpc: {
        host: "192.168.99.100",
        port: 8541
    },

    files_to_compile: ["example_child.sol","example_grandchild.sol" ],
    compiler_output_file: "compiled.json",
    compiler_output_file_to_deploy: "compiled.json",
    contracts_to_deploy: ["Base_contract","Child_contract"],
    deployment_record: "deployed_instances.json"
    
};