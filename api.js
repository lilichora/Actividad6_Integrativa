class ExternalApiComponent extends HTMLElement {
    connectedCallback() {
        this.getDataFromApi();
    }

    getDataFromApi() {
        const apiUrl = 'https://jsonplaceholder.typicode.com/photos';

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                return response.json();
            })
            .then(data => this.displayData(data))
            .catch(error => console.error(error));
    }

    displayData(data) {
        // Lógica para mostrar los datos en el componente (puede ser una tabla, lista, etc.)
        const container = document.createElement('div');

        // Crear tabla y encabezados
        const table = document.createElement('table');
        table.style.borderCollapse = 'collapse'; // Establecer el colapso de bordes
        table.style.width = '100%';

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const headers = ['ID', 'Title', 'URL']; // Puedes agregar más encabezados según tus necesidades

        headers.forEach(headerText => {
            const header = document.createElement('th');
            header.textContent = headerText;
            header.style.border = '1px solid #dddddd'; // Establecer bordes
            header.style.padding = '8px';
            headerRow.appendChild(header);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Agregar filas de datos
        const tbody = document.createElement('tbody');
        data.forEach(item => {
            const row = document.createElement('tr');
            const cellId = document.createElement('td');
            const cellTitle = document.createElement('td');
            const cellUrl = document.createElement('td');

            cellId.textContent = item.id;
            cellTitle.textContent = item.title;
            cellUrl.textContent = item.url;

            [cellId, cellTitle, cellUrl].forEach(cell => {
                cell.style.border = '1px solid #dddddd'; // Establecer bordes
                cell.style.padding = '8px';
                row.appendChild(cell);
            });

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        container.appendChild(table);

        this.appendChild(container);
    }
}

customElements.define('external-api-component', ExternalApiComponent);
