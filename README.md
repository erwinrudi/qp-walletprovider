# qp-walletprovider

> Library to connect with qoinpay extension

[![NPM](https://img.shields.io/npm/v/qp-walletprovider.svg)](https://www.npmjs.com/package/qp-walletprovider) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save qp-walletprovider
```

## Usage

```jsx
import React, { useEffect, useState } from 'react'

import Wallet from 'qp-walletprovider'

const App = () => {
  const [address, setAddress] = useState("")

  let wallet = new Wallet();

  const connectToWallet = () => {
    wallet.connect().then((res) => {
      setAddress(res)
    })
  }

  return (
    <React.Fragment>
      {address === "" ?
        (
          <button onClick={() => connectToWallet()}>
            Connect
          </button>
        ) : (
          <>
            Address : {address}
          </>
        )}

    </React.Fragment>
  )
}

export default App
```

## Function


## License

MIT © [erwinrudi](https://github.com/erwinrudi)
