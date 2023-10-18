export const SessionStorage = () => {
    let data = JSON.parse(sessionStorage.getItem("username") || "{}");
    return Object.values(data).length > 0 ? true : false;
  };