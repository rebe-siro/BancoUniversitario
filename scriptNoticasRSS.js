

const rssParser = new RSSParser();
const UNSPLASH_ACCESS_KEY = 'uANzuIv1eJ8jITX29bKThBzUIfjgqSqFkpZ385dX5a4'; // Key the la API No robar

async function fetchUnsplashImage(query) {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_ACCESS_KEY}`);
        const data = await response.json();
        return data.urls.small; // Retorna la URL de la imagen pequeña
    } catch (error) {
        console.error('Error fetching image from Unsplash:', error);
        return 'GRAFICO3/default-news.jpg'; // Retorna una imagen por defecto en caso de error
    }
}

async function fetchRSS() {
    try {
        const proxyUrl = 'https://api.allorigins.win/get?url=';
        const container = document.querySelector('.noticias-externas ul');

        // Arreglo de las RSS, si le quieren añadir más, solo tienen que agregar el nombre y la URL
        const rssFeeds = [
            { name: "BBC", url: "https://feeds.bbci.co.uk/news/world/rss.xml" },
            { name: "CNN", url: "http://rss.cnn.com/rss/edition_world.rss" },
        ];

        for (const feedSource of rssFeeds) {
            const response = await fetch(`${proxyUrl}${encodeURIComponent(feedSource.url)}`);
            const data = await response.json();
            const feed = await rssParser.parseString(data.contents);

            for (const item of feed.items.slice(0, 3)) {
                const article = document.createElement('li');
                article.classList.add('noticias-item');

                // Obtenemos la imagen de Unsplash usando el título del artículo y el nombre de la fuente
                const imageUrl = await fetchUnsplashImage(`${item.title} ${feedSource.name}`);

                article.innerHTML = `
                    <img src="${imageUrl}" alt="${item.title}" class="noticias-image">
                    <div class="noticias-content">
                        <a href="${item.link}" target="_blank">
                            <h3>${item.title}</h3>
                        </a>
                        <p>${item.contentSnippet || 'No description available.'}</p>
                        <span class="source">Source: ${feedSource.name}</span>
                    </div>
                `;
                container.appendChild(article);
            }
        }
    } catch (error) {
        console.error('Error fetching RSS feeds:', error);
    }
}

fetchRSS();