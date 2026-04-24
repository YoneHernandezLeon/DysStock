import { Menubar } from 'primereact/menubar'
import type { MenuItem } from 'primereact/menuitem'
import './App.css'
import { PrimeReactProvider } from 'primereact/api'
import 'primeicons/primeicons.css'
import '../node_modules/primeflex/primeflex.css'

function App() {

  const items: MenuItem[] = [
    {
      label: 'Salida',
      icon: 'pi pi-file-export',
      items: [
        {
          label: 'Nueva salida',
        },
        {
          label: 'Ver salidas'
        }
      ]
    },
    {
      label: 'Almacen',
      icon: 'pi pi-warehouse',
      items: [
        {
          label: 'Repuestos/Mod.'
        },
        {
          label: 'Alta rep.'
        },
        {
          label: 'Ubicaciones'
        },
        {
          label: 'Técnicos'
        }
      ]
    },
    {
      label: 'Listados',
      icon: 'pi pi-file-pdf',
      items: [
        {
          label: 'Por referencia'
        },
        {
          label: 'Por ubicación'
        },
        {
          label: 'Por stock'
        }
      ]
    },
    {
      label: 'Mantenimiento',
      icon: 'pi pi-wrench',
      items: [
        {
          label: 'Almacenes',
        },
        {
          label: 'Entrada proveedores'
        }
      ]
    },
    {
      label: 'Copias de seguridad',
      icon: 'pi pi-clock',
      items: [
        {
          label: 'Crear',
        },
        {
          label: 'Restaurar'
        }
      ]
    }
  ]

  return (
    <PrimeReactProvider>
      <div className="w-full h-full bg-blue-300">
        <Menubar model={items} className='text-sm h-3rem w-5 mx-auto justify-content-center' />
      </div>
    </PrimeReactProvider>
  )
}

export default App
