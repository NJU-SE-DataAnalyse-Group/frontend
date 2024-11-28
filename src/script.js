// 示例数据 (可以替换为真实的后端数据)
const papers = [
    {
        title: "深度学习在自然语言处理中的应用",
        abstract: "本文探讨了深度学习在自然语言处理中的最新进展。",
        year: "2022"
    },
    {
        title: "机器学习与大数据的未来趋势",
        abstract: "分析了大数据时代下机器学习的发展方向。",
        year: "2023"
    },
    {
        title: "数据隐私保护技术研究",
        abstract: "针对数据隐私问题，提出了一种新的加密算法。",
        year: "2021"
    }
];

// 处理搜索功能
function searchPapers() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // 清空之前的搜索结果

    const filteredPapers = papers.filter(paper => 
        paper.title.toLowerCase().includes(query) || 
        paper.abstract.toLowerCase().includes(query)
    );

    if (filteredPapers.length > 0) {
        filteredPapers.forEach(paper => {
            const paperDiv = document.createElement('div');
            paperDiv.classList.add('paper-item');
            paperDiv.innerHTML = `
                <h3>${paper.title}</h3>
                <p><strong>摘要：</strong> ${paper.abstract}</p>
                <p><strong>发表年份：</strong> ${paper.year}</p>
            `;
            resultsDiv.appendChild(paperDiv);
        });
    } else {
        resultsDiv.innerHTML = '<p>没有找到相关论文。</p>';
    }
}
