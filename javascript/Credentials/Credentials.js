'use strict';

function credentials() {
    return new Promise((resolve, reject) => {
        $.ajax({
            method: 'GET',
            url: `../../apiKeys.json`
        }).then((response)=>{
            resolve(response);
        }, (error)=>{
            reject(error);
        });
    });
}


let Credentials = {
  credentials
};

module.exports = Credentials;