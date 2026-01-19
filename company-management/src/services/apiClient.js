export const BASE_URL = "https://orgx-apis.azurewebsites.net";

const apiRequest = async (url, method = "GET", data = null, form = false) => {
  const authToken = localStorage.getItem("token");
  const tenantCode = localStorage.getItem("tenant_code");
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      tenant_code: tenantCode,
      Authorization: `Bearer ${authToken}`,
    },
  };

  if (data) {
    if (form) {
      delete options.headers["Content-Type"];
      options.body = data;
    } else {
      options.body = JSON.stringify(data);
    }
  }

  try {
    const response = await fetch(`${BASE_URL}${url}`, options);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized access, please login again.");
      }
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } else {
      const responseData = await response.text();
      console.log(responseData);
      return responseData;
    }
  } catch (error) {
    if (error.message.includes("Failed to fetch")) {
      throw new Error("Network error: Failed to reach the server.");
    }
    throw error;
  }
};

export default apiRequest;
