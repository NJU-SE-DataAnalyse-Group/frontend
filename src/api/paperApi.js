const API_BASE_URL = 'http://localhost:3000/paper';  

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

// 获取论文
async function getPaperById(paperId) {
    const url = `${API_BASE_URL}/${paperId}`;
    return apiRequest(url, 'GET');
}

// 根据标题获取论文
async function getPaperByTitle(title) {
    const url = `${API_BASE_URL}/?title=${encodeURIComponent(title)}`;
    return apiRequest(url, 'GET');
}

// 根据关键词搜索论文
async function searchPapersByKeyword(keyword) {
    const url = `${API_BASE_URL}/search?keyword=${encodeURIComponent(keyword)}`;
    return apiRequest(url, 'GET');
}

// 获取引用论文
async function getCiters(paperId) {
    const url = `${API_BASE_URL}/${paperId}/citers`;
    return apiRequest(url, 'GET');
}

// 获取被引论文
async function getCitees(paperId) {
    const url = `${API_BASE_URL}/${paperId}/citees`;
    return apiRequest(url, 'GET');
}

// 获取相似论文
async function getSimilar(paperId) {
    const url = `${API_BASE_URL}/${paperId}/similar`;
    return apiRequest(url, 'GET');
}

// 获取同一类别的论文
async function getSameCategory(category) {
    const url = `${API_BASE_URL}/category/${encodeURIComponent(category)}`;
    return apiRequest(url, 'GET');
}