// userApi.js
const API_BASE_URL = 'http://localhost:3000/user';  // 你的后端服务地址

async function apiRequest(url, method, body = null) {
    const headers = {
        'Content-Type': 'application/json',
    };

    const options = {
        method: method,
        headers: headers,
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Request failed');
        }

        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// 创建用户
async function createUser(name, email, password,  access_level) {
    // alert('createUser');
    const user = { name, email, password,  access_level };
    const url = `${API_BASE_URL}/`;

    return apiRequest(url, 'POST', user);
}

// 用户登录
async function login(name, email, password) {
    const credentials = { name, email, password };
    const url = `${API_BASE_URL}/login`;

    return apiRequest(url, 'POST', credentials);
}

// 获取用户
async function getUserById(userId) {
    const url = `${API_BASE_URL}/${userId}`;
    return apiRequest(url, 'GET');
}

// 通过用户名获取用户
async function getUserByName(username) {
    const url = `${API_BASE_URL}/name/${username}`;
    return apiRequest(url, 'GET');
}

// 通过 email 获取用户
async function getUserByEmail(email) {
    const url = `${API_BASE_URL}/email/${email}`;
    return apiRequest(url, 'GET');
}

// 更新用户
async function updateUser(userId, name, email, password,  access_level) {
    const updatedUser = { name, email, password,  access_level };
    const url = `${API_BASE_URL}/update/${userId}`;
    return apiRequest(url, 'PUT', updatedUser);
}

// 删除用户
async function deleteUser(userId) {
    const url = `${API_BASE_URL}/delete/${userId}`;
    return apiRequest(url, 'DELETE');
}

export default {
    createUser,
    login,
    getUserById,
    getUserByName,
    getUserByEmail,
    updateUser,
    deleteUser
};
