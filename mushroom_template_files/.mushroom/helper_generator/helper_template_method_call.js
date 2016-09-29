// ********* sub_method - Call **********

Contract.sub_method = function (args) {

    console.log("\nsub_method called")
    console.log(sub_log_args)

    return new Promise(function (resolve, reject) {

        contract.sub_method.call(sub_args, callback);

        function callback(e,response) {
            if (e) {
                reject(e);
            } else {
                console.log(" ---> sub_method response: ", response)
                resolve(response)
            }
        }
    });
};


