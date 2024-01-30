import { create } from 'zustand'

const useCart = create(
    (set, get) => ({
        cart: [],
        product: {},
        openModal: false,
        setOpenModal: () => {
            set((state) => {
                return {
                    ...state,
                    openModal: !state.openModal
                }
            })
        },
        setProduct: (params) => {
            const { newProduct } = params
            set((state) => {
                return {
                    ...state,
                    product: newProduct
                }
            })

        },
        addItemToCart: (params) => {
            const { newItem } = params;
            const existingItemIndex = get().cart.findIndex(item => item.price_id === newItem.price_id);
      
            if (existingItemIndex !== -1) {
              // If the item already exists in the cart, update its quantity
              set((state) => {
                const updatedCart = state.cart.map((item, index) => {
                  if (index === existingItemIndex) {
                    return {
                      ...item,
                      quantity: item.quantity + newItem.quantity
                    };
                  } else {
                    return item;
                  }
                });
                return {
                  ...state,
                  cart: updatedCart
                };
              });
            } else {
              // If the item is not in the cart, add it
              set((state) => {
                const newCart = [...state.cart, newItem];
                return {
                  ...state,
                  cart: newCart
                };
              });
            }
          },
        removeItemFromCart: (params) => {
            const { itemIndex } = params
            set((state) => {
                const newCart = state.cart.filter((element, elementIndex) => {
                    return elementIndex !== itemIndex
                })
                return {
                    ...state,
                    cart: newCart
                }
            })
        },
        updateCartItemQuantity: (params) => {
            const { itemIndex, newQuantity } = params;
      
            if (newQuantity >= 1) {
              set((state) => {
                const updatedCart = state.cart.map((item, index) => {
                  if (index === itemIndex) {
                    return {
                      ...item,
                      quantity: newQuantity
                    };
                  } else {
                    return item;
                  }
                });
                return {
                  ...state,
                  cart: updatedCart
                };
              });
            }
          },      
        emptyCart: () => {
            set((state) => {
                const newCart = []
                return {
                    ...state,
                    cart: newCart
                }
            })
        }
    })
)

export default useCart;