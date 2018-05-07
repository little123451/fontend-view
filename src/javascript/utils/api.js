import $ from 'jquery';

const api = {
    'test': '/index'
};

let send = (url, method, data) => {
    let deferred = $.Deferred();
    let link = url;
    let base_url = '/api';

    let obj = {
        url: base_url + link,
        type: method,
        data: data,
        dataType: 'json',
        success:(res) =>{ deferred.resolve(res)},
        error: (res) =>{ deferred.reject(res)}
    };

    if (method == 'POST') {
        $.extend(obj,{
            contentType:'application/json',
            processData: false,
            data: JSON.stringify(data)
        })
    }

    $.ajax(obj);

    return deferred.promise();
};

module.exports = {

    test(){
        let url = api.test;
        let method = 'GET';
        let data = {
            hello: 'world'
        }
        return send(url, method, data);
    }

}