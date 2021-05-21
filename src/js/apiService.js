const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '21693934-b739dad2632fdbf7884e4d0a2';
const options = {
    headers: {
        Authorization: API_KEY,
    },
};

export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    fetchImage() {
        const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

        return fetch(url, options)
            .then(response => response.json())
            .then(({ images }) => {
                this.incrementPage();
                return images;
            });
    }

        incrementPage() {
            this.page += 1;
        }

        resetPage() {
            this.page = 1;
        }

        get query() {
            return this.searchQuery;
        }

        set query(newQuery) {
            this.searchQuery = newQuery;
        }
    }
