import fetchWithTimeout from "@gluons/react-native-fetch-with-timeout";

export default class fetchingData {

 /*  static paramsPost = {
    method: "POST",
    header: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(paramsPost)
  };

  static postData(ipUril, URI, _timeout) {
    return new Promise((resolve, reject) => {
      fetchWithTimeout(ipUril + URI, this.paramsPost, { timeout: _timeout })
        .then((rpta) => resolve(rpta))
        .catch((err) => {
          reject(err);
        });
    });
  } */

 static postDataPromise(ipUril, URI, params, _timeout) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    };

   

    return new Promise((resolve, reject) => {
        fetchWithTimeout(ipUril + URI, requestOptions, {timeout: _timeout}
        ).then( rpta =>
            resolve(rpta)      
        ).catch( (err) => {
            console.log(err);
            reject(err)}
        )
    })
}

/* static postDataPromise(ipUril, URI, params, _timeout) {
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: params
  };

  return new Promise((resolve, reject) => {
      fetchWithTimeout(ipUril + URI, requestOptions, {timeout: _timeout}
      ).then( rpta =>
          resolve(rpta)      
      ).catch( (err) => {
          console.log(err);
          reject(err)}
      )
  })
} */

 static params = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    Accept: "application/json",
  };
  

  static getDataPromise(ipUril, URI, _timeout) {
    return new Promise((resolve, reject) => {
      fetchWithTimeout(ipUril + URI, this.params, { timeout: _timeout })
        .then((rpta) => resolve(rpta))
        .catch((err) => {
          reject(err);
        });
    });
  }

  static getData(ipUril, URI, callback) {
    fetch(ipUril + URI, this.params).then((response) => {
      response.json().then((data) => {
        callback(data);
      });
    });
  }

  static getData2(URI, callback) {
    fetch(URI, this.params).then((response) => {
      response.json().then((data) => {
        callback(data);
      });
    });
  }

  static deleteData(ipUril, URI, callback) {
    fetch(ipUril + URI, this.params).then((response) => {
      callback(response);
    });
  }
}
