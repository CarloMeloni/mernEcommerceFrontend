export const addItem = (item, next) => {
    let cart = [];

    if(typeof window !== 'undefined') {
        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart')); // TO CONVERT JSON FILES INTO OBJECT, JSON.stringify the opposite
        }

        cart.push({
            ...item,
            count: 1
        });

        //REMOVE DUPLICATES
        //BUILD AN ARRAY FORM NEW SET AND TURN IT BACK INTO ARRAY USING Array.from
        //SO THAT LATER WE CAN RE-MAP IT
        //NEW SET WILL ONLY ALLOW UNIQUE VALUES IN IT
        //SO PASS THE IDS  OF EACH OBJECT/PRODUCT
        //IF THE LOOP TRIES TO ADD THE SAME VALUE AGAIN, IT'LL GET IGNORED
        //...WITH THE ARRAY OF IDS WE GOT ON WHEN FIRST map() WAS USED
        //RUN map() ON IT AGAIN AND RETURN THE ACTUAL PRODUCT FROM THE CART
        cart = Array.from(new Set(cart.map((p) => (p._id)))).map(id => {
            return cart.find(p => p._id === id);
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        next();
    }
};

export const itemTotal = () => {
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart')).length;
        }
    }

    return 0;
}

export const getCart = () => {
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'));
        }
    }

    return [];
}

export const updateItem = (productId, count) => {
    let cart = [];
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.map((prod, idx) => {
            if(prod._id === productId) {
                cart[idx].count = count;
            }
        });

        localStorage.setItem('cart', JSON.stringify(cart));
    }    
};