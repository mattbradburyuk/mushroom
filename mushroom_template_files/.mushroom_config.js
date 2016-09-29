module.exports = {
    rpc: {
        host: "192.168.99.100",
        port: 8541
    },
    structure: {
        source_directory: "/sources/",
        
        compiler: "multi_compiler.js",
        compiler_location: "/.mushroom/compilers/",
        compiler_output_directory: "/output/compiled/",
        
        deployer: "multi_deploy.js",
        deployer_location: "/.mushroom/deployers/",
        deployer_output_directory: "/output/deployed/",

        helper_generator: "helper_generator.js",
        helper_generator_location: "/.mushroom/helper_generator/",
        helper_output_directory: "/output/helpers/",
        
        contract_config: "contract_config.js",
        contract_config_location: "/config/"
        

    }

};

