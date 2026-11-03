import { useState } from 'react'

function useCart() {
  const [items, setItems] = useState(0)

  function addItem() {
    setItems((currentItems) => currentItems + 1)
  }

  return { items, addItem }
}

export default useCart
