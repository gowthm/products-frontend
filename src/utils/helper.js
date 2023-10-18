export const SessionStorage = () => {
    let data = JSON.parse(sessionStorage.getItem("fullstack-001") || "{}");
    return Object.values(data).length > 0 ? true : false;
  };