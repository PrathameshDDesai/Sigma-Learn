const btn = document.getElementById('searchBtn');
const countryInput = document.getElementById('country');
const stateInput = document.getElementById('state');
const list = document.getElementById('list');
const loader = document.getElementById('loader');
const errorDiv = document.getElementById('error');
const resultCount = document.getElementById('resultCount');

btn.addEventListener('click', async () => {
    const country = countryInput.value.trim();
    const state = stateInput.value.trim();
    
    if (!country) {
        errorDiv.innerText = 'Please enter a country name!';
        return;
    }

    errorDiv.innerText = '';
    list.innerHTML = '';
    resultCount.innerText = '';
    loader.style.display = 'block';

    try {
        let url = `http://universities.hipolabs.com/search?name=${country}`;
        if (state) {
            url += `&state-province=${state}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        loader.style.display = 'none';

        if (data.length === 0) {
            resultCount.innerText = 'No colleges found!';
            return;
        }

        resultCount.innerText = `Found ${data.length} colleges`;

        data.forEach(college => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="university-name">${college.name}</div>
                <div class="university-country">Country: ${college.country}</div>
                <a href="${college.web_pages[0]}" target="_blank">Visit Website</a>
            `;
            list.appendChild(li);
        });
    } catch (error) {
        loader.style.display = 'none';
        errorDiv.innerText = 'Error fetching data. Please try again.';
    }
});
