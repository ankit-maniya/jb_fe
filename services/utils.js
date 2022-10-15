
export const handleResponseError = (response) => {
    let data;
  
    // if (
    //   response.headers["content-type"] &&
    //   response.headers["content-type"].indexOf("text/plain") > -1
    // ) {
    //   data = response.data;
    // } else {
    // }
    
    data = response.data;
  
    if (data === null) {
      return data;
    }
  
    if (!data || data.error) {
      throw Error(
        typeof data.error === "object"
          ? data.error.message || JSON.stringify(data.error)
          : data.error
      );
    }
  
    if (data && data.type === "error") {
      throw Error(data.message);
    }
  
    return data;
  };
  