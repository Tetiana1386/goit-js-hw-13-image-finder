import cardMarkup from '../templates/card.hbs';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import ApiService from './apiService';
import { onGalleryClick } from './light-box';
import LoadMoreBtn from './load-more-btn';


const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
};

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});

const apiService = new ApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
refs.gallery.addEventListener('click', onGalleryClick);

function onSearch(event) {
    event.preventDefault();

    clearGalleryContainer();
    apiService.query = event.currentTarget.elements.query.value;

    if (apiService.query === '') {
        loadMoreBtn.disable();
        return noResults();
    }

    loadMoreBtn.show();
    apiService.resetPage();
    fetchImage();
}

function fetchImage() {
    loadMoreBtn.disable();
    return apiService.fetchImage().then(images => {
        renderMarkup(images);

        scrollPage();
        loadMoreBtn.enable();

        //if (cards.length === 0) {
            //loadMoreBtn.hide();
            //noMatchesFound();
        //}
    });
}

function onLoadMore() {
    fetchCards();
}

function renderMarkup(hits) {
    refs.gallery.insertAdjacentHTML('beforeend', cardMarkup(hits));
}

function clearGalleryContainer() {
    refs.gallery.innerHTML = '';
}

function noResults() {
    error({
        text: 'Please enter something!',
        delay: 2000,
    });
}

//function noMatchesFound() {
    //error({
        //text: 'No matches found. Please enter another query!',
        //delay: 2500,
    //});
//}

function scrollPage() {
    try {
        setTimeout(() => {
            window.scrollTo({
                top: document.body.scrollHeight,
                left: 0,
                behavior: 'smooth',
            });
        }, 1000);
    } catch (error) {
        console.log(error);
    }
}