import { useState } from 'react'
import './App.css'

interface Item {
  id: `${string}-${string}-${string}-${string}-${string}`
  timestamp: number
  text: string
}

const INITIAL_ITEMS : Item[] = [
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: 'videojuegos'
  },
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: 'tareas'
  },
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: 'libros'
  }
]
function App() {
  
  const [ items, setItems ] = useState( INITIAL_ITEMS )

  const handleSubmit = ( event: React.FormEvent<HTMLFormElement> ) => {

    event.preventDefault()

    const { elements } = event.currentTarget

    // estrategia 1
    // const input = elements.namedItem('item') as HTMLInputElement


    // estrategia 2
    const input = elements.namedItem('item')

    // JavaScript puro
    const isInput = input instanceof HTMLInputElement

    if( !isInput || input === null ) return

    if( input.value.length === 0 ) return

    const newItem: Item = {
      id: crypto.randomUUID(),
      text: input.value,
      timestamp: Date.now()
    }

    setItems([
      ...items,
      newItem
    ])

    input.value = ''

  }

  const handleDelete = ( id : Item["id"] ) => () => {

    setItems( items => items.filter( item => item.id !== id ) )

  }

  return (
    <main>
      <aside> 
        <h1>Mi prueba tecnica nivel Senior</h1>
        <h2>Añadir elementos</h2>
        <form action="" onClick={ handleSubmit }>
          <label>
            Elemento a introducir: 
            <input 
              type="text"
              required
              name='item'
              placeholder='Videojuegos'
            />
          </label>
          <button>Añadir elemento a la lista</button>
        </form>
      </aside>

      <section>
        
        <h2>Lista de elementos</h2>

          {
            items.length === 0 
            ?
            <p>No hay elementos</p>
            :
            (
              <ul>
              {items.map( item => (
              <li key={item.id}>
                { item.text }
                <button className='smallbutton' onClick={handleDelete(item.id)}>
                  Eliminar
                </button>
              </li>
            ))}
        </ul>
            )
          }

      </section>

    </main>
  )
}

export default App
