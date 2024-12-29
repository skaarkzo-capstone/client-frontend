const API_BASE_URL = "http://localhost:8000/api/main";

export const API_ENDPOINTS = {
  POST_COMPANY_SEARCH: `${API_BASE_URL}/complete-evaluation`,
  FETCH_COMPANY_DATA: `${API_BASE_URL}/evaluated-companies`,
  TOGGLE_COMPLIANCE: `${API_BASE_URL}/company/compliance`,
};
