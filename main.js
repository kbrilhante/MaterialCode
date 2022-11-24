const divLista = document.getElementById("lista");

const paths = {
    'Advanced': './data/ADV.json',
}

var data;
var headers; 

// criar uma Fução para cada curriculo no futuro
getData(paths.Advanced);

async function getData(path) {
    const request = new Request(path);
    const response = await fetch(request)
    data = await response.json();
    headers = Object.keys(data);
    headers.forEach(header => {
        const obj = data[header];
        let id = header;
        id = id.replace(",", "");
        id = id.replace(" ", "");

        const headingID = "heading_" + id;
        const collapseID = "collapse_" + id;

        // criando o accordion item
        const accItem = document.createElement('div');
        accItem.className = "accordion-item";

        // criando o accordion header
        const accHeader = document.createElement('h2');
        accHeader.className = "accordion-header";
        accHeader.id = headingID;

        // criando o accordion button
        const accButton = document.createElement('button');
        accButton.className = "accordion-button collapsed";
        accButton.setAttribute('type', "button");
        accButton.setAttribute('data-bs-toggle', "collapse");
        accButton.setAttribute('data-bs-target', "#" + collapseID);
        accButton.setAttribute('aria-expanded', "true");
        accButton.setAttribute('aria-controls', collapseID);
        accButton.textContent = header;

        // criando o accordion collapse
        const accCollapse = document.createElement('div');
        accCollapse.id = collapseID;
        accCollapse.className = "accordion-collapse collapse";
        accCollapse.setAttribute('aria-labelledby', headingID);
        accCollapse.setAttribute('data-bs-parent', "#lista");

        // criando o accordion body
        const accBody = document.createElement('div');
        accBody.className = "accordion-body";

        divLista.appendChild(accItem);
        accItem.appendChild(accHeader);
        accHeader.appendChild(accButton);
        accItem.appendChild(accCollapse);
        accCollapse.appendChild(accBody);

        // Início do conteúdo do accordion
        const ul = document.createElement('ul');
        ul.className = "list-group list-group-flush";
        accBody.appendChild(ul);

        obj.forEach(item => {
            const atividade = item.Atividade;
            const link = item.Link;
            // console.log(atividade, link)
            // item da lista
            // const li = document.createElement('li');
            // li.className = "itemLista";
            // ul.appendChild(li);

            // Criando o link
            const a = document.createElement('a');
            a.className = "list-group-item list-group-item-action"
            a.innerHTML = atividade;
            a.href = link;

            // li.appendChild(a);
            ul.appendChild(a);

        });
    });
}