
class ProductCard extends HTMLElement {
    constructor() {
        super();
        const template = document.getElementById('product-template').content;
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.cloneNode(true));
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'index.css');
        shadowRoot.appendChild(linkElem);
    }

    connectedCallback() {
        const shadowRoot = this.shadowRoot;
        shadowRoot.querySelector('.name').textContent = this.getAttribute('title');
        shadowRoot.querySelector('img').src = this.getAttribute('image');
        shadowRoot.querySelector('.price').textContent = `${this.getAttribute('currentPrice')}₮`;
        shadowRoot.querySelector('.priced').textContent = `${this.getAttribute('price')}₮`;
    }
}

customElements.define('product-card', ProductCard);

fetch('./products.json')
    .then(response => response.json())
    .then(data => {
        const productsContainer = document.getElementById('products-container');
        data.forEach(product => {
            const productCard = document.createElement('product-card');
            productCard.setAttribute('title', product.title);
            productCard.setAttribute('image', product.image);
            productCard.setAttribute('currentPrice', product.currentPrice);
            productCard.setAttribute('price', product.price);
            productsContainer.appendChild(productCard);
        });
    })
