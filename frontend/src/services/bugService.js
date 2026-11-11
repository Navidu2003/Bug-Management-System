const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Handles HTTP response and parses JSON or throws formatted error.
 */
async function handleResponse(response) {
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status} Error`;

    if (data && typeof data === 'object') {
      if (data.message) {
        errorMessage = data.message;
      } else if (data.title) {
        errorMessage = data.title;
      } else if (data.errors) {
        // Validation errors dictionary
        const validationMessages = Object.entries(data.errors)
          .map(([field, errs]) => `${field}: ${Array.isArray(errs) ? errs.join(', ') : errs}`)
          .join('\n');
        errorMessage = validationMessages || errorMessage;
      }
    } else if (typeof data === 'string' && data.length > 0) {
      errorMessage = data;
    }

    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

/**
 * Bug API Service
 */
export const bugService = {
  /**
   * GET /api/bugs
   * Retrieves all reported bugs.
   */
  async getAllBugs() {
    const response = await fetch(`${API_BASE_URL}/bugs`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    return handleResponse(response);
  },

  /**
   * GET /api/bugs/{id}
   * Retrieves a single bug by its ID.
   */
  async getBugById(id) {
    const response = await fetch(`${API_BASE_URL}/bugs/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    return handleResponse(response);
  },

  /**
   * POST /api/bugs
   * Creates a new bug report.
   * Note: ReportDate is automatically assigned by the backend.
   */
  async createBug({ bugName, bugDescription, level }) {
    const response = await fetch(`${API_BASE_URL}/bugs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        bugName,
        bugDescription,
        level,
      }),
    });
    return handleResponse(response);
  },

  /**
   * PUT /api/bugs/{id}
   * Updates an existing bug's name, description, and severity level.
   */
  async updateBug(id, { bugName, bugDescription, level }) {
    const response = await fetch(`${API_BASE_URL}/bugs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        bugName,
        bugDescription,
        level,
      }),
    });
    return handleResponse(response);
  },

  /**
   * DELETE /api/bugs/{id}
   * Deletes a bug report by its ID.
   */
  async deleteBug(id) {
    const response = await fetch(`${API_BASE_URL}/bugs/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
    });
    return handleResponse(response);
  },
};

