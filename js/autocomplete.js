class autocomplete {

    constructor(element, minLetter = 3, filter = false, order = 'none', highlight = true) {
        this.input = document.getElementById(element);
        this.minLetter = minLetter;
        this.filter = filter;
        this.liClass = "autocomplete-li";
        this.data = [];
        this.order = order;
        this.highlight = highlight;
        this._init();
    }

    _init = () => {
        //retire l'autocompletion du navigateur
        this.input.setAttribute('autocomplete', 'off');

        //Creation du li et ajout d'une classe
        let li = document.createElement('li');
        li.className = this.liClass;
        //Réglage de la largeur du la liste par rapport a la taille de l'input
        li.style.width = getComputedStyle(this.input).width;

        //Evenement quand on écris dans l'input
        this._addInputEvent(this.input, li);
    };

    _addInputEvent = (input, li) => {
        input.addEventListener('input', () => {
            li.innerHTML = '';
            li.remove();
            if (input.value.length >= this.minLetter) {
                let data = this.filter === true ? this._dataFilter(this.data, input) : this.data;
                this._orderData(data);
                data.forEach((item) => {
                    let ul = document.createElement('ul');
                    ul.innerHTML = this._textRow(item);
                    this._addClickEventOnRow(ul, input);
                    li.append(ul);
                    input.after(li);
                });
                this._clickOutsideList(input, li);
            }
        });
    };

    _clickOutsideList = (input, li) => {
        document.addEventListener('click', (evt) => {
            if (!li.contains(evt.target)){
                li.remove();
            }
        });
    };

    _addClickEventOnRow = (element, input) => {
        element.addEventListener('click', function () {
            input.value = element.innerText;
            element.parentElement.remove();
        });
    };

    _dataFilter = (data, input) => {
        return data.filter(item => item.toUpperCase().indexOf(input.value.toUpperCase()) !== -1);
    };

    _orderData = (data) => {
        if (this.order === 'ASC') {
            return data.sort();
        } else if (this.order === 'DESC') {
            return data.sort().reverse();
        }

        return data;
    };

    _textRow = (text) => {
        var pattern = new RegExp(this.input.value, 'i');
        return this.highlight ? text.toLowerCase().replace(pattern,
            '<span>' + this.input.value.toLowerCase() + '</span>') : text.toLowerCase();
    };

    setData = (data) => {
        this.data = data;
    };

    setMinLetters = (minLetter) => {
        this.minLetter = minLetter;
    };

    setFilter = (filter) => {
        this.filter = filter;
    };

    setOrder = (order) => {
        this.order = order;
    };

    setHighLight = (highlight) => {
        this.highlight = highlight;
    }
}
