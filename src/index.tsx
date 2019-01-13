import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Page } from './Components/Page'
import registerServiceWorker from './registerServiceWorker'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

ReactDOM.render(<Page />, document.getElementById('root') as HTMLElement)
registerServiceWorker()
