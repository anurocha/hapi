class RestructApi {
    transform( input ) {
        try {
            const data = JSON.parse( input );
            const flatedItems = this.#flatenItems( data );
            const topLevelItems = flatedItems.filter( el => el.parent_id === null );
            return this.#fillChildren( topLevelItems, flatedItems );
        }
        catch {
            return {'error': ' :( '};
        }
    }

    #flatenItems ( data ) {
        const flatedItems = new Array();
        for( let i in data ) {
            data[i].forEach( el => {
                flatedItems.push( el );
            });
        }
        return flatedItems;
    }

    #fillChildren ( items, flatedItems ) {
        items.forEach( el => {
            el.children = this.#buildChildren( el.id, flatedItems );
        });
        return items;
    }

    #buildChildren (parentId, items) {
        const children = new Array();
        items.forEach( el => {
            if( parentId === el.parent_id ){
                el.children = this.#buildChildren( el.id, items );
                children.push( el );
            }
        });
        return children;
    }
}

module.exports = RestructApi;
